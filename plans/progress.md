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
- Implemented complete tags system. Added tags field to AddonExport interface. Added tags to all 8 addon JSONs (platynator, details, weakauras-guide, sensei-resource-bar, waypoint-ui, baganator, blizzhudtweaks, cooldown-manager). Created Tag component with glass styling. Display tags on ExportCard (collapsed view) and AddonDetailPage. Enhanced search to filter by name OR tags (case-insensitive, partial match). Build+tests pass.
- Implemented global command bar. Installed cmdk+@radix-ui/react-dialog. Created shadcn Dialog+Command components w/ glass styling. Built CommandBar component w/ Cmd/Ctrl+K shortcut, prevents trigger in input fields, searches addon names+tags, shows Home nav item, integrates w/ react-router. Mounted in App for global access. Build+tests pass.
- Added keyboard shortcut indicator to SearchBar. Shows platform-appropriate hint (⌘K on Mac, Ctrl+K on Windows/Linux) as kbd elements in search input. Added Search icon. Helper text below bar. Hidden on mobile. Build+tests pass.
- Enhanced CopyButton w/ icon+text support. Added Copy/Check lucide icons, children prop, showIcon prop. Detail page now shows "Copy Export String" w/ icon instead of just "Copy". Copied state shows check icon. Fixed text visibility by adding text-foreground class. Build+tests pass.

