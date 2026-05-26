# Skill Patch: aisee-reflect

_Date: 2026-05-26_

## Issue

The Phase 1 example command uses `find ..`, which can scan sibling projects and large `node_modules` trees. In this repo it returned unrelated files from a neighboring project before finding current project rules.

## Proposed Change

Prefer current-repository scoped file discovery before scanning parent directories.

## Before

```bash
find .. -name AGENTS.md -o -name CLAUDE.md -o -name README.md 2>/dev/null | head -20
find docs/reflect -maxdepth 3 -type f 2>/dev/null | sort | tail -20
```

## After

```bash
rg --files \
  -g 'AGENTS.md' \
  -g 'CLAUDE.md' \
  -g 'README.md' \
  -g '.memory/*.md' \
  -g '.memory/**/*.md' \
  | sort

find docs/reflect -maxdepth 3 -type f 2>/dev/null | sort | tail -20
```

If `rg` is unavailable, use `find .` instead of `find ..`, and exclude dependency directories:

```bash
find . \
  -path './node_modules' -prune -o \
  -path './.git' -prune -o \
  \\( -name AGENTS.md -o -name CLAUDE.md -o -name README.md \\) \
  -print
```

## Edge Cases Addressed

- Adjacent repositories under the same parent directory.
- Large dependency folders.
- Reflect reports accidentally mixing another project’s context.

## Verification

Run the updated command in a workspace that has sibling projects and confirm only current repo files are returned.
