# math-utils

> A ready-made sample repo for evaluating [barf-ts](https://github.com/vx-daniel/barf-ts) — an AI issue orchestration CLI.

## What this is

`barf-test-project` is a pre-loaded TypeScript math utility library containing 14 issues across the full barf lifecycle (`NEW`, `INTERVIEWING`, `PLANNED`, `IN_PROGRESS`, `STUCK`, `SPLIT`, `COMPLETED`). It exists so you can run barf against a realistic backlog without setting one up yourself. Clone it, point barf at it, and watch it plan and build.

## Quick Start

**Prerequisites:** [barf-ts](https://github.com/vx-daniel/barf-ts) and [bun](https://bun.sh) installed.

```sh
# 1. Clone
git clone https://github.com/vx-daniel/barf-test-project
cd barf-test-project

# 2. View the backlog
barf status

# 3. Plan the next NEW issue
barf plan

# 4. Implement it
barf build

# 5. Verify
bun test

# Reset to a clean slate (undoes all barf-generated changes)
npm run reset-local
```

## Project Structure

```
barf-test-project/
├── issues/               # 14 issue files, each a markdown spec
├── plans/                # Plan files for PLANNED issues
├── src/
│   └── index.ts          # The math library being built out issue-by-issue
├── tests/
│   ├── arithmetic.test.ts
│   ├── statistics.test.ts
│   └── factorial.test.ts
└── .barfrc               # barf config (models, dirs, test command)
```

## Issue Backlog

| # | Title | State | Special |
|---|-------|-------|---------|
| 001 | Basic arithmetic (add/subtract/multiply/divide) | `COMPLETED` | |
| 002 | Mean and median | `COMPLETED` | |
| 003 | Mode calculation | `PLANNED` | has plan file |
| 004 | Factorial and fibonacci | `IN_PROGRESS` | factorial done |
| 005 | isPrime checker | `NEW` | |
| 006 | GCD and LCM | `STUCK` | perf reqs undefined |
| 007 | Temperature conversions | `INTERVIEWING` | |
| 008 | Unit conversion suite | `NEW` | `force_split=true` |
| 009 | Statistical analysis suite | `SPLIT` | children: 009-1, 009-2 |
| 009-1 | Standard deviation | `PLANNED` | parent: 009 |
| 009-2 | Variance calculation | `NEW` | parent: 009 |
| 010 | Number formatting | `NEW` | `force_split=true` |
| 011 | Rounding utilities | `PLANNED` | |
| 012 | Range and clamp | `NEW` | |

## GitHub Mode

barf can read and update issues directly from a GitHub repository instead of local files.

**Prerequisites**

- `gh auth login` completed with repo write access
- Repo admin access (needed for `gh issue delete`)

**Setup**

```sh
# 1. Set your repo in .barfrc.github
vi .barfrc.github

# 2. Activate GitHub mode
npm run use-github

# 3. Seed GitHub with all local issues (also serves as a full reset)
npm run reset-github

# 4. Use barf as normal — it now reads/writes GitHub issues
barf status
barf plan
barf build

# 5. Switch back to local file mode at any time
npm run use-local
barf status
```

## Configuration

`.barfrc` at the repo root:

```ini
ISSUES_DIR=issues            # Where barf reads issue files from
PLAN_DIR=plans               # Where barf writes generated plan files
PLAN_MODEL=claude-opus-4-6   # Model used by `barf plan`
BUILD_MODEL=claude-sonnet-4-6 # Model used by `barf build`
CONTEXT_USAGE_PERCENT=75     # Max % of model context to use per call
TEST_COMMAND=bun test        # Command barf runs to verify builds
```

## The Library

`src/index.ts` is a pure TypeScript math utility module. It starts with basic arithmetic, statistics, and factorial already implemented; each issue adds one or more functions. The library itself is just a vehicle — the point is the backlog, not the math functions.
