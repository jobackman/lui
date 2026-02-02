# Progress Log

## Archive

Previous progress entries have been moved to `/plans/archive/progress-2026-01-28.md`

---

## Current Development

Work continues on the remaining features in prd.json.

- Added 5 new addon JSON files: sensei-resource-bar, waypoint-ui, baganator, blizzhudtweaks, cooldown-manager. Mix of exportString/externalUrl types. All with images, setup instructions, metadata. Build+tests pass.
- Automated addon imports in loadExports.ts using import.meta.glob. Vite glob imports auto-detect all JSON files in data/exports/. Fallback for Bun tests. All 8 addons load. Build+tests pass.
- Reverted nuqs URL state mgmt approach - didn't work as expected. Need alternative solution for full-width expanded cards.
