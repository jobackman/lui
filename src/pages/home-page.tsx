import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { FeaturedAddon } from '@/components/featured-addon';
import { loadAllExports } from '@/lib/loadExports';
import { category } from '@/types/exports';
import type { Addon } from '@/types/exports';

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
                key={addon.id}
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
                <Link to={`/a/${addon.id}`} className="block h-full">
                  <ExportCard export={addon.export} addonId={addon.id} />
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
  const allAddons = loadAllExports();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize search query from URL param
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync URL search params to search query state (when URL changes via Link)
  useEffect(() => {
    const currentParam = searchParams.get('q') || '';
    if (searchQuery !== currentParam) {
      setSearchQuery(currentParam);
    }
  }, [searchParams]);

  // Sync search query state to URL (when typing in search bar)
  useEffect(() => {
    const currentParam = searchParams.get('q') || '';
    if (searchQuery !== currentParam) {
      if (searchQuery) {
        setSearchParams({ q: searchQuery });
      } else {
        setSearchParams({});
      }
    }
  }, [searchQuery]);

  // Filter addons based on search query (searches export name and tags)
  const filteredAddons = useMemo(() => {
    if (!searchQuery.trim()) return allAddons;

    const query = searchQuery.toLowerCase();
    return allAddons.filter((addon) => {
      const nameMatches = addon.export.name.toLowerCase().includes(query);
      const tagMatches = addon.export.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;
      return nameMatches || tagMatches;
    });
  }, [allAddons, searchQuery]);

  // Sort within categories by newest lastUpdated
  const sortByDate = (list: Addon[]) =>
    [...list].sort((a, b) => {
      const aDate = a.export.lastUpdated ? new Date(a.export.lastUpdated).getTime() : 0;
      const bDate = b.export.lastUpdated ? new Date(b.export.lastUpdated).getTime() : 0;
      return bDate - aDate;
    });

  // Split into core and misc groups
  const coreAddons = useMemo(
    () => sortByDate(filteredAddons.filter((a) => a.export.tags?.[0] === category.core)),
    [filteredAddons],
  );
  const miscAddons = useMemo(
    () => sortByDate(filteredAddons.filter((a) => a.export.tags?.[0] !== category.core)),
    [filteredAddons],
  );

  const isSearching = searchQuery.trim().length > 0;
  const totalExports = filteredAddons.length;

  // Find the newest addon overall (by lastUpdated) for the featured spotlight
  const newestAddon = useMemo(() => {
    const sorted = sortByDate(allAddons);
    return sorted[0] ?? null;
  }, [allAddons]);

  // Remove the featured addon from the grid sections (only when not searching)
  const coreAddonsFiltered = useMemo(
    () => (newestAddon ? coreAddons.filter((a) => a.id !== newestAddon.id) : coreAddons),
    [coreAddons, newestAddon],
  );
  const miscAddonsFiltered = useMemo(
    () => (newestAddon ? miscAddons.filter((a) => a.id !== newestAddon.id) : miscAddons),
    [miscAddons, newestAddon],
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
          <div className="mt-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {totalExports === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {searchQuery ? (
                <p>No addons matching &ldquo;{searchQuery}&rdquo;</p>
              ) : (
                <p>No addons available</p>
              )}
            </div>
          ) : isSearching ? (
            /* When searching, show flat results without grouping */
            <AddonGrid addons={sortByDate(filteredAddons)} label="Results" />
          ) : (
            /* Default: featured spotlight + grouped sections */
            <div className="space-y-10">
              {newestAddon && <FeaturedAddon addon={newestAddon} />}
              <AddonGrid addons={coreAddonsFiltered} label="Core" delay={0.15} />
              <AddonGrid addons={miscAddonsFiltered} label="Misc" delay={0.25} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
