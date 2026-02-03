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
- Removed tags from front page cards. Cleaned up ExportCard component, removed Tag import+display. Tags still visible on AddonDetailPage, search/filter by tags still functional. Build+tests pass.
- Fixed CommandBar tag search. Changed addon.tags→addon.export.tags in CommandItem value prop. Also fixed addon.description→addon.export.description. Created comprehensive test suite (command-bar.test.tsx) w/ 6 tests verifying tag searchability, value construction, specific addon examples. All 33 tests pass. Build succeeds.
- Redesigned SearchBar w/ rounded-full styling. Increased height to h-12, rounded-full border-radius, larger search icon (h-5 w-5), adjusted padding (pl-12 pr-20). Glass effect already applied via existing Input component. Maintains accessibility (ARIA labels, focus states). Build+tests pass.
- Refactored button classes using class-variance-authority. Installed cva package. Created glassButtonVariants in utils.ts w/ 3 glass variants (card, carousel, action) following shadcn pattern. Used named variant prop "glass" instead of "variant" to avoid conflicts. Refactored ExportCard+AddonDetailPage to use glass variants w/ cn utility. Cleaner, maintainable, composable. Build+tests pass.
- Added entry/exit animations to cards and detail page. Installed framer-motion. Wrapped cards in motion.div w/ staggered fade-in+slide-up animation (100ms delay per card). Added AnimatePresence for exit animations w/ layout mode. Detail page has layered animations: back button (fade+slide-left), main card (fade+slide-up), setup instructions (delayed fade+slide-up). Framer Motion auto-respects prefers-reduced-motion. Build+tests pass.
- Added route transition animations. Wrapped Routes in AnimatePresence w/ mode='wait' in app.tsx, used location.pathname as key. Both HomePage and AddonDetailPage wrapped in motion.div w/ fade transitions (300ms duration). Added scroll position reset on mount via useEffect in both pages. Exit animation completes before entry begins. Transitions work w/ browser back/forward, CommandBar navigation. Framer Motion auto-respects prefers-reduced-motion. Build+tests pass.
- Fixed BackgroundRippleEffect persisting across routes. Moved component from individual pages to App.tsx so it renders once at app level. Prevents unmount/remount during route transitions. Background now stable during navigation. Build+tests pass.
- Fixed invisible SearchBar icon. Changed text-muted-foreground→text-foreground/80, added drop-shadow-sm. Icon now visible against light glass bg w/ gradient behind. WCAG contrast improved. Build+tests pass.
- Changed background ripple positioning from fixed→absolute for scrolling. Updated grid dimensions to use document.scrollHeight instead of viewport height. Added ResizeObserver for dynamic content. Wrapped App in relative positioned div. Background now scrolls naturally w/ page content. Build+tests pass.

