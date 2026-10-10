import { useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { FeaturedAddon } from '@/components/featured-addon';
import { loadAllExports, filterAddons, sortAddonsByDate, getFeaturedAddon } from '@/lib/loadExports';
import { useEdition } from '@/contexts/edition-context';
import { EditionSwitcher } from '@/components/edition-switcher';
import { editionLabels, editionUrl, updateSearchParameter } from '@/lib/game-edition';
import { category } from '@/types/exports';
import type { ResolvedAddon as Addon } from '@/types/exports';

/**
 * Compute the column span for each item in a 6-column grid (lg).
 * Regular rows: 3 items x 2-col each. Last row distributes remaining
 * items evenly across the full 6 columns so there's never dead space.
 */
function getColSpans(count: number): number[] {
  if (count === 0) return [];
  const remainder = count % 3;
  const fullRows = Math.floor(count / 3);
  const spans: number[] = new Array(fullRows * 3).fill(2); // 2-col each in full rows

  if (remainder === 1) {
    spans.push(6); // single trailing item spans full width
  } else if (remainder === 2) {
    spans.push(3, 3); // two trailing items split evenly
  }

  return spans;
}

function AddonGrid({ addons, label, delay = 0 }: { addons: Addon[]; label: string; delay?: number }) {
  if (addons.length === 0) return null;

  const colSpans = getColSpans(addons.length);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50 shrink-0">
          {label}
        </h2>
        <div className="h-px flex-1 bg-foreground/8" />
        <span className="text-xs tabular-nums text-foreground/30">{addons.length}</span>
      </div>

      {/* Adaptive grid: 6-col on lg so last-row items stretch to fill */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {addons.map((addon, index) => {
            const span = colSpans[index] ?? 2;
            return (
              <motion.div
                key={`${addon.edition}:${addon.id}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.35,
                  delay: delay + index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  span === 6
                    ? 'lg:col-span-6'
                    : span === 3
                      ? 'lg:col-span-3'
                      : 'lg:col-span-2'
                }
              >
                <Link to={editionUrl(`/a/${addon.id}`, addon.edition)} className="block h-full">
                  <ExportCard export={addon.configuration} addonId={addon.id} />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export function HomePage() {
  const { gameEdition } = useEdition();
  const allAddons = useMemo(() => loadAllExports(gameEdition), [gameEdition]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const setSearchQuery = (query: string): void => {
    setSearchParams((current) => updateSearchParameter(current, 'q', query), { replace: true });
  };

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredAddons = useMemo(() => filterAddons(allAddons, searchQuery), [allAddons, searchQuery]);
  const sortByDate = sortAddonsByDate;

  // Split into core, misc, and retired groups
  const coreAddons = useMemo(
    () => sortByDate(filteredAddons.filter((a) => a.configuration.tags?.[0] === category.core)),
    [filteredAddons],
  );
  const miscAddons = useMemo(
    () => sortByDate(filteredAddons.filter((a) => !a.configuration.tags || a.configuration.tags[0] === category.misc)),
    [filteredAddons],
  );
  const retiredAddons = useMemo(
    () => sortByDate(filteredAddons.filter((a) => a.configuration.tags?.[0] === category.retired)),
    [filteredAddons],
  );

  const isSearching = searchQuery.trim().length > 0;
  const totalExports = filteredAddons.length;

  // Find the newest addon overall (by lastUpdated) for the featured spotlight
  // Exclude retired addons from being featured
  const newestAddon = useMemo(() => getFeaturedAddon(allAddons) ?? null, [allAddons]);

  // Remove the featured addon from the grid sections (only when not searching)
  const coreAddonsFiltered = useMemo(
    () => (newestAddon ? coreAddons.filter((a) => a.id !== newestAddon.id) : coreAddons),
    [coreAddons, newestAddon],
  );
  const miscAddonsFiltered = useMemo(
    () => (newestAddon ? miscAddons.filter((a) => a.id !== newestAddon.id) : miscAddons),
    [miscAddons, newestAddon],
  );
  const retiredAddonsFiltered = useMemo(
    () => (newestAddon ? retiredAddons.filter((a) => a.id !== newestAddon.id) : retiredAddons),
    [retiredAddons, newestAddon],
  );

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-20">
        {/* Compact header: hero + search integrated */}
        <div className="pt-8 pb-6 px-4">
          <Hero />
          <div className="mt-5 flex justify-center">
            <EditionSwitcher />
          </div>
          <div className="mt-5">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Content area */}
        <div key={gameEdition} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {totalExports === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {searchQuery ? (
                <p>No {editionLabels[gameEdition]} addons matching &ldquo;{searchQuery}&rdquo;</p>
              ) : (
                <>
                  <p className="text-lg font-medium text-foreground/75">No addons published for {editionLabels[gameEdition]} yet.</p>
                  <p className="mt-2 text-sm">Confirmed-compatible addons and configurations will appear here as they are added.</p>
                </>
              )}
            </div>
          ) : isSearching ? (
            /* When searching, show flat results without grouping */
            <AddonGrid addons={sortByDate(filteredAddons)} label="Results" />
          ) : (
            /* Default: featured spotlight + grouped sections */
            <div className="space-y-10">
              {newestAddon && <FeaturedAddon key={`${gameEdition}:${newestAddon.id}`} addon={newestAddon} />}
              <AddonGrid addons={coreAddonsFiltered} label="Core" delay={0.15} />
              <AddonGrid addons={miscAddonsFiltered} label="Misc" delay={0.25} />
              {retiredAddonsFiltered.length > 0 && (
                <div className="opacity-60">
                  <AddonGrid addons={retiredAddonsFiltered} label="Retired" delay={0.35} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
