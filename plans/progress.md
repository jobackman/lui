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
- Added idle ripple animations. 4s idle threshold, 3s randomized intervals. Ripples spawn at random positions. Detects user activity (mousemove/click/touch/scroll/keydown) to reset timer. Respects prefers-reduced-motion. Configurable via props (idleThreshold/idleRippleInterval/enableIdleRipples). Works across all routes. Build+tests pass.
- Fixed timestamp/carousel overlap on small cards. Moved timestamp from bottom to top-left w/ glass-subtle bg. Carousel dots stay bottom-center. Clear separation prevents overlap on md:col-span-1 cards. Build+tests pass.
- Removed redundant keyboard shortcut text from SearchBar. Deleted "Press ⌘+K for quick search" helper text below input. Kbd badges already visible inside search bar. Cleaner UI. Build+tests pass.
- Made ExportCard action buttons appear only on hover. Added opacity-0/group-hover:opacity-100/focus-within:opacity-100 w/ 200ms transition. Touch devices always show buttons via [@media(hover:none)]:opacity-100. Respects prefers-reduced-motion. Cleaner card UI at rest. Build+tests pass.
- Removed bottom gradient from ExportCard. Changed to-black/90→to-transparent. Timestamp now at top, bottom gradient unnecessary. More image visible, carousel dots still clear. Build+tests pass.
- Fixed glass effect on ExportCard action buttons. Modified Button component className merge order: cn(buttonVariants({variant,size}),className) instead of cn(buttonVariants({variant,size,className})). Allows glassButtonVariants to properly override Button variant styles. Buttons now display frosted glass (backdrop-blur, semi-transparent bg, glass-strong border). Build+tests pass.
- Removed light mode+theme toggle. Simplified ThemeProvider to dark-only, removed Theme type/setTheme/localStorage logic. Deleted ThemeToggle from Hero. Updated theme-init.ts to only set dark class. Simplified theme-context tests. ThemeProvider now just ensures dark class on mount. Build+tests pass (32 tests).
- Migrated addon data from JSON to TypeScript. Converted all 8 files (platynator, details, weakauras-guide, sensei-resource-bar, waypoint-ui, baganator, blizzhudtweaks, cooldown-manager) to .ts w/ template literals. exportString+setupInstructions now use backticks for multi-line, no escaping needed. Updated loadExports.ts glob pattern from *.json→*.ts. All files export const+default. Removed old JSON files. Build+tests pass (32 tests).
- Integrated glass effects into Button component core. Added backdrop-blur-md to base classes. Updated all variants: default→glass-strong w/ white text, ghost→glass w/ white text, outline→glass w/ border, secondary→glass w/ white text, destructive→glass-strong w/ red bg, link→backdrop-blur-none. Removed glassButtonVariants+GlassButtonVariants type from utils.ts. Updated ExportCard+AddonDetailPage to use standard Button variants (default/ghost) instead of glassButtonVariants. CopyButton automatically gets glass effects via default/secondary variants. Tests pass (32). PRD complete.
- Fixed responsive layout breakpoints. Grid now uses grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3. Bento pattern (2-col spans) only applies at lg: breakpoint (lg:col-span-2 instead of md:col-span-2) preventing layout issues at md/sm. Container padding responsive: px-4 sm:px-6 md:px-8. Proper layout at all breakpoints (320px, 640px, 768px, 1024px). No overflow, proper spacing. Build+tests pass (32).
- Fixed #root width constraint. Removed grid place-items-center from body (was centering+shrink-wrapping #root to 347px). Body now full-width w/ min-w-[320px]. Added #root w-full min-h-screen. Grid container now properly expands to viewport width at all breakpoints. Build+tests pass (32).
- Automated timestamp updates. Created scripts/update-timestamps.ts detecting exportString changes via git diff, updating lastUpdated to ISO 8601. Pre-commit hook at .git/hooks/pre-commit auto-runs script. Manual scripts: bun run update-timestamps (staged files) / update-timestamps:all (all files). Only updates when exportString modified, ignores other fields. Scripts/README.md w/ docs. Tested: exportString change triggers update, description change doesn't. Build+tests pass (32).
- Replaced import.meta.glob w/ direct imports for Bun compatibility. Removed conditional Vite/test env logic. Added direct imports for all 9 addon files (blizzhudtweaks, cooldown-manager, cooldown-manager-centered, details, edit-mode, healthbar-color, platynator, sensei-resource-bar, waypoint-ui). Created addons array. Simplified loadAllExports() to return array directly. Updated tests: 9 addons (was 8), blizzhudtweaks test (has externalUrl), platynator tags (threat not pvp), details tags (dmg/raid/meter not ui). Build+tests pass (32).
- Fixed carousel aspect ratio support. Removed aspect-video constraint, changed object-cover→object-contain. Container now has minHeight:300px maxHeight:600px aspectRatio:16/9 via inline style. Images preserve full visibility w/o cropping. Letterbox/pillarbox filled by bg-black/20. Controls+dots remain positioned. Updated tests: 14 addons (was 9), sensei-resource-bar test (replaces blizzhudtweaks). Build+tests pass (32).
- Added modal gallery for full-res image viewing. Click carousel image opens Dialog modal w/ full-res display. Hover shows Maximize2 icon overlay w/ glass effect. Modal has prev/next buttons, indicator dots, image counter (X/Y), loading states. Keyboard nav: arrows→navigate, ESC→close modal (doesn't conflict w/ page-level ESC→home). Modal state (isModalOpen, modalImageIndex, isImageLoading) syncs w/ carousel. stopPropagation on carousel controls prevents modal trigger. Glass effects throughout. Build+tests pass (32). PRD complete.
- Made modal gallery glassy. Replaced bg-black/95 full-screen overlay w/ glass-strong backdrop-blur-xl. Changed max-w-[95vw] h-[95vh]→max-w-5xl max-h-[85vh] for reasonable dimensions. Added rounded-lg to modal images matching app design. Modal now consistent w/ glass aesthetic. Build+tests pass (32).
- Removed modal content bg. Changed glass-strong backdrop-blur-xl→bg-transparent on DialogContent. Dialog's native backdrop blur sufficient. Cleaner, simpler modal. Build+tests pass (32).
- Removed backdrop-blur-[2px] from modal trigger hover overlay. Kept bg-black/20 for hover indication. Maximize2 icon overlay now cleaner w/ glass-strong button. Build+tests pass (32). PRD complete.
- Removed image counter from modal gallery. Deleted counter component (was lines 392-395). Cleaner modal w/ only controls, dots, image. DialogContent already bg-transparent, Dialog overlay has bg-black/80 backdrop-blur-sm. Build+tests pass (32).
- Implemented dynamic modal gallery sizing. Changed max-w-5xl→max-w-[95vw], max-h-[85vh]→max-h-[95vh]. Reduced padding p-16→p-4 sm:p-8 to maximize image display area. Modal now uses 95% of viewport, allowing larger images (landscape/portrait/square) to display properly. Navigation controls+dots remain positioned. Build+tests pass (32).
- Created reusable CarouselIndicators component. Extracted duplicate indicator dot logic from ExportCard+AddonDetailPage (3 locations). New carousel-indicators.tsx w/ props: totalImages, currentIndex, onIndexChange, stopPropagation. Glass-subtle styling, accessible ARIA labels, touch-friendly tap targets (44x44px min), motion-reduce support. Replaced all 3 implementations. Cleaner, maintainable, DRY. Build+tests pass (32).
- Simplified CarouselIndicators. Removed size prop (always use larger md variant). Replaced conditional string concatenation w/ cn utility for cleaner conditional classes. Build+tests pass (32).
- Migrated glass effects to atomic Tailwind utilities. Replaced .glass/.glass-strong/.glass-subtle classes w/ atomic utilities: bg-glass, backdrop-blur-glass, border-glass, transition-glass (+ -strong/-subtle variants). Updated all components: Button, Card, Input, Dialog, Tag, CarouselIndicators, AddonDetailPage, ThemeToggle, AddonTabs. CSS now uses @layer utilities in globals.css. Better composability w/ cn(), proper override behavior. Fallback for browsers w/o backdrop-filter. Build+tests pass (32). PRD complete.
- Converted tags+categories to TypeScript constants. Created tag object (90+ constants: ui, nameplates, mythic, dmg, etc.) + category object (core/misc) in src/types/exports.ts using 'as const'. Exported TagType + AddonCategoryType derived types. Updated AddonExport.tags→TagType[], added optional category field to AddonCategory. Migrated all 15 addon files (platynator, details, baganator, edit-mode, waypoint-ui, sensei-resource-bar, cooldown-manager, blizz-hud-tweaks, cooldown-manager-centered, healthbar-color, warpdeplete, plumber, frogskis-cursor-trail, dialogue-ui, account-wide-interface-settings) to import { tag, category } + use constants instead of string literals. Assigned category.core to 4 addons (platynator, details, sensei-resource-bar, cooldown-manager, cooldown-manager-centered), category.misc to rest. Updated AGENTS.md w/ constant usage pattern + full tag reference. Fixed test expecting 14 addons→15. Build+tests pass (32).
- Fixed timestamp script to detect ANY field changes (not just exportString). Replaced exportString-specific logic w/ normalizeContent() that compares entire file excluding lastUpdated field. Added --all flag (force update all files) + --force file1.ts file2.ts (update specific files). Script now detects changes to description, images, tags, downloadUrl, setupInstructions, etc. Tested w/ baganator.ts (no exportString) - successfully detected description change + updated timestamp. New files auto-get current timestamp. lastUpdated-only changes don't trigger updates (prevents loops). Build+tests pass (32).

---

## 2026-02-04 - Archive Completed Tasks

**Archived:** 11 completed tasks to `/plans/archive/archived-2026-02-04.json`

**Status:**
- Completed: 11 tasks
- Cancelled: 0 tasks

**Archived Items:**
1. Bug Fix: Responsive layout fix (bento grid below 768px)
2. Feature: Automate timestamp updates for export strings
3. Feature: Modal gallery for full-resolution images
4. Refactoring: Replace import.meta.glob with direct imports (Bun compatibility)
5. Feature: Support different aspect ratios in carousel
6. UI Enhancement: Glassy modal background
7. UI Enhancement: Remove hover blur from modal trigger
8. UI Enhancement: Dynamic modal sizing
9. UI Enhancement: Remove modal container background and counter
10. Refactoring: Create reusable CarouselIndicators component
11. Refactoring: Migrate glass effects to atomic Tailwind utilities

PRD now empty - all tasks completed and archived.
