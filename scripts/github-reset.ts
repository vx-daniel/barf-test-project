#!/usr/bin/env bun
/**
 * github-reset.ts
 *
 * Deletes all barf-labeled GitHub issues on the configured repo, then
 * re-creates them from the local issues/ directory. Useful for seeding a
 * fresh GitHub repo or resetting after barf has mutated issue states.
 *
 * Usage: bun run scripts/github-reset.ts
 * Requires: GITHUB_REPO set in .barfrc.github, `gh` CLI authenticated.
 */

import { execFileSync } from "child_process";
import { readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ROOT = resolve(import.meta.dir, "..");

function parseConfig(filePath: string): Record<string, string> {
  const cfg: Record<string, string> = {};
  const lines = readFileSync(filePath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    cfg[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return cfg;
}

const config = parseConfig(join(ROOT, ".barfrc.github"));
const GITHUB_REPO = config["GITHUB_REPO"];

if (!GITHUB_REPO || GITHUB_REPO === "<owner/repo>") {
  console.error("Error: set GITHUB_REPO in .barfrc.github before running this script.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

const LABELS: Record<string, { color: string; description: string }> = {
  "barf:new": { color: "0075ca", description: "barf issue state: new" },
  "barf:planned": { color: "e4e669", description: "barf issue state: planned" },
  "barf:in-progress": { color: "fbca04", description: "barf issue state: in-progress" },
  "barf:stuck": { color: "d93f0b", description: "barf issue state: stuck" },
  "barf:split": { color: "c5def5", description: "barf issue state: split" },
  "barf:completed": { color: "0e8a16", description: "barf issue state: completed" },
  "barf:locked": { color: "b60205", description: "barf issue state: locked" },
};

const STATE_TO_LABEL: Record<string, string> = {
  NEW: "barf:new",
  PLANNED: "barf:planned",
  IN_PROGRESS: "barf:in-progress",
  STUCK: "barf:stuck",
  SPLIT: "barf:split",
  COMPLETED: "barf:completed",
  LOCKED: "barf:locked",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function gh(...args: string[]): string {
  return execFileSync("gh", args, { encoding: "utf8" });
}

function ensureLabels(): void {
  console.log("Ensuring barf labels exist on repo...");
  for (const [name, meta] of Object.entries(LABELS)) {
    gh(
      "label", "create", name,
      "--repo", GITHUB_REPO,
      "--color", meta.color,
      "--description", meta.description,
      "--force",
    );
  }
  console.log("Labels ready.");
}

// ---------------------------------------------------------------------------
// Issue parsing
// ---------------------------------------------------------------------------

interface LocalIssue {
  id: string;
  title: string;
  state: string;
  body: string;
}

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const lines = content.split("\n");
  if (lines[0].trim() !== "---") return { meta: {}, body: content };

  const meta: Record<string, string> = {};
  let i = 1;
  while (i < lines.length && lines[i].trim() !== "---") {
    const eq = lines[i].indexOf("=");
    if (eq !== -1) {
      meta[lines[i].slice(0, eq).trim()] = lines[i].slice(eq + 1).trim();
    }
    i++;
  }
  // skip closing ---
  const body = lines.slice(i + 1).join("\n").trim();
  return { meta, body };
}

function loadIssues(): LocalIssue[] {
  const issuesDir = join(ROOT, "issues");
  const files = readdirSync(issuesDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files.map((file) => {
    const content = readFileSync(join(issuesDir, file), "utf8");
    const { meta, body } = parseFrontmatter(content);
    return {
      id: meta["id"] ?? file.replace(".md", ""),
      title: meta["title"] ?? file,
      state: meta["state"] ?? "NEW",
      body,
    };
  });
}

// ---------------------------------------------------------------------------
// Delete existing barf issues
// ---------------------------------------------------------------------------

function deleteBarfIssues(): void {
  console.log("Fetching existing barf-labeled issues...");

  const labelFilter = Object.keys(LABELS).join(",");
  const raw = gh(
    "issue", "list",
    "--repo", GITHUB_REPO,
    "--label", labelFilter,
    "--state", "all",
    "--limit", "200",
    "--json", "number",
  );

  const issues: { number: number }[] = JSON.parse(raw);
  if (issues.length === 0) {
    console.log("No existing barf issues to delete.");
    return;
  }

  console.log(`Deleting ${issues.length} issue(s)...`);
  for (const { number } of issues) {
    gh("issue", "delete", String(number), "--repo", GITHUB_REPO, "--yes");
    process.stdout.write(`  Deleted #${number}\n`);
  }
}

// ---------------------------------------------------------------------------
// Create issues from local files
// ---------------------------------------------------------------------------

function createIssues(issues: LocalIssue[]): void {
  console.log(`Creating ${issues.length} issue(s) from local files...`);
  for (const issue of issues) {
    const label = STATE_TO_LABEL[issue.state];
    if (!label) {
      console.warn(`  Skipping ${issue.id}: unknown state "${issue.state}"`);
      continue;
    }
    gh(
      "issue", "create",
      "--repo", GITHUB_REPO,
      "--title", issue.title,
      "--body", issue.body,
      "--label", label,
    );
    process.stdout.write(`  Created: [${issue.state}] ${issue.title}\n`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\nbarf github-reset → ${GITHUB_REPO}\n`);
ensureLabels();
deleteBarfIssues();
const issues = loadIssues();
createIssues(issues);
console.log("\nDone.");
