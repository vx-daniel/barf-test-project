# barf-test-project

> A ready-made sample repo for evaluating [barf-ts](https://github.com/vx-daniel/barf-ts) — an AI issue orchestration CLI.

## What this is

`barf-test-project` is a pre-loaded TypeScript string utility library containing 23 issues across the full barf lifecycle (`NEW`, `PLANNED`, `IN_PROGRESS`, `STUCK`, `SPLIT`). It exists so you can run barf against a realistic backlog without setting one up yourself. Clone it, point barf at it, and watch it plan and build.

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
npm run reset
```

## Project Structure

```
barf-test-project/
├── issues/               # 23 issue files (001–023), each a markdown spec
├── plans/                # Auto-generated plan files created by `barf plan`
├── src/
│   └── index.ts          # The string library being built out issue-by-issue
├── tests/
│   └── index.test.ts     # Test suite (run with `bun test`)
└── .barfrc               # barf config (models, dirs, test command)
```

## Issue Backlog

| # | Title | State |
|---|-------|-------|
| 001 | Add capitalize and titleCase functions | `NEW` |
| 002 | Add slugify function | `PLANNED` |
| 003 | Add wordCount and charCount functions | `IN_PROGRESS` |
| 004 | Add repeat function | `NEW` |
| 005 | Add reverse function | `NEW` |
| 006 | Add isPalindrome function | `NEW` |
| 007 | Add ltrim and rtrim functions | `NEW` |
| 008 | Add truncate function | `NEW` |
| 009 | Add camelCase function | `PLANNED` |
| 010 | Add snakeCase function | `PLANNED` |
| 011 | Add kebabCase function | `PLANNED` |
| 012 | Add countOccurrences function | `PLANNED` |
| 013 | Add padStart and padEnd utility functions | `PLANNED` |
| 014 | Add parseCSV function | `STUCK` |
| 015 | Add template string interpolation function | `STUCK` |
| 016 | Add levenshteinDistance function | `STUCK` |
| 017 | Add stringDiff function | `STUCK` |
| 018 | Add tokenize function | `STUCK` |
| 019 | Add string transformation utilities | `SPLIT` |
| 020 | Add string inspection utilities | `SPLIT` |
| 021 | Add string shortening and padding utilities | `SPLIT` |
| 022 | Add case conversion suite | `SPLIT` |
| 023 | Add string analysis tools | `SPLIT` |

## Configuration

`.barfrc` at the repo root:

```ini
ISSUES_DIR=issues          # Where barf reads issue files from
PLAN_DIR=plans             # Where barf writes generated plan files
PLAN_MODEL=claude-opus-4-6 # Model used by `barf plan`
BUILD_MODEL=claude-sonnet-4-6 # Model used by `barf build`
CONTEXT_USAGE_PERCENT=75   # Max % of model context to use per call
TEST_COMMAND=bun test       # Command barf runs to verify builds
```

## The Library

`src/index.ts` is a pure TypeScript string utility module. It starts with `reverse` and `truncate` already implemented; each issue adds one or more functions. The library itself is just a vehicle — the point is the backlog, not the string functions.
