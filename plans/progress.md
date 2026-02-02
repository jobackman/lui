# Progress Log

## Archive

Previous progress entries have been moved to `/plans/archive/progress-2026-01-28.md`

---

## Current Development

Work continues on the remaining features in prd.json.

- Added 5 new addon JSON files: sensei-resource-bar, waypoint-ui, baganator, blizzhudtweaks, cooldown-manager. Mix of exportString/externalUrl types. All with images, setup instructions, metadata. Build+tests pass.
- Automated addon imports in loadExports.ts using import.meta.glob. Vite glob imports auto-detect all JSON files in data/exports/. Fallback for Bun tests. All 8 addons load. Build+tests pass.
- Reverted nuqs URL state mgmt approach - didn't work as expected. Need alternative solution for full-width expanded cards.
- Added timestamp to collapsed card view. Shows "Updated X ago" below addon name. Uses formatRelativeTime util, white/80 opacity, drop shadow. Build+tests pass.
- Added routing infrastructure. Installed react-router-dom, wrapped App in BrowserRouter, created Routes for '/' (home) and '/a/:id' (addon detail). Invalid addon IDs redirect to home. Placeholder detail page implemented. Build+tests pass.
- Converted home page to navigable bento grid. Removed expandedCardId state, wrapped cards in Link to /a/:id. ExportCard now collapsed-only, no expansion logic. Buttons still visible on hover. Auto-cycling images work. Bento grid layout maintained. Build+tests pass.
- Implemented full addon detail page. Back nav, title/desc, timestamp, image carousel w/ prev/next arrows+dots, action buttons (copy/download/external), setup instructions in glass panel, keyboard nav (Escape→home, Arrow keys→carousel), SEO title updates, responsive layout. Build+tests pass.

