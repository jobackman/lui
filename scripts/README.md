# Timestamp automation

`scripts/update-timestamps.ts` runs via the Husky pre-commit hook or manually. Git and Bun are required.

## Default: staged configurations only

```bash
bun run update-timestamps
```

- Finds added/changed staged `.ts` files recursively under `data/exports/`.
- Reads the Git index, not unstaged working-tree content.
- Updates `lastUpdated` when configuration content changes compared with HEAD, ignoring timestamp-only differences.
- Skips shared addon definitions/catalog files without timestamps and deleted files.
- Updates the index without staging unrelated working-tree changes.
- For partially staged files, mirrors only the timestamp into the working tree if its original timestamp matches the staged one. An independently edited working-tree timestamp is left alone.
- Recognizes unchanged configurations moved from the original single-export files into `data/exports/retail/`, preserving historical timestamps during this migration.

Example:

```bash
git add data/exports/forever/example.ts
git commit -m "Publish confirmed Forever configuration"
```

Changing Forever does not bump the corresponding Retail configuration's timestamp.

## Forced updates

```bash
bun run update-timestamps:all
bun run update-timestamps --force retail/details.ts forever/example.ts
```

`--all` recursively discovers configuration files. `--force` accepts paths relative to `data/exports/` or full `data/exports/...` paths, with optional `.ts` suffixes.

Forced updates intentionally stage the resulting configurations. They refuse files with both staged changes and additional unstaged changes, rather than accidentally staging unrelated edits. Stage the intended full contents first, or unstage the changes, before forcing a partially staged file. If only unstaged changes exist, a forced command intentionally stages them along with the new timestamp.

Shared definitions without timestamps are never updated. A forced command in a Git repository can stage a new previously untracked configuration.

## Tests

```bash
bun test scripts/update-timestamps.test.ts
```

Tests use isolated temporary Git repositories and cover nested discovery, independent edition updates, timestamp-only changes, partial staging, migration preservation, and new/forced configurations.
