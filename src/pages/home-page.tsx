import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { Tag } from '@/components/ui/tag';
import { loadAllExports } from '@/lib/loadExports';
import { category } from '@/types/exports';

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
    if (!searchQuery.trim()) {
      // No search query - show all addons
      return allAddons;
    }

    const query = searchQuery.toLowerCase();

    // Filter addons where the export name OR any tag matches the search query
    return allAddons.filter((addon) => {
      const nameMatches = addon.export.name.toLowerCase().includes(query);
      const tagMatches = addon.export.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false;

      return nameMatches || tagMatches;
    });
  }, [allAddons, searchQuery]);

  // Sort filtered addons to show core addons before misc addons
  const sortedAndFilteredAddons = useMemo(() => {
    return [...filteredAddons].sort((a, b) => {
      // Category is the first tag in the tags array
      const aCategory = a.export.tags?.[0];
      const bCategory = b.export.tags?.[0];

      // Core addons come first
      if (aCategory === category.core && bCategory !== category.core) {
        return -1;
      }
      if (aCategory !== category.core && bCategory === category.core) {
        return 1;
      }

      // If both are the same category (or both missing), maintain original order
      return 0;
    });
  }, [filteredAddons]);

  const totalExports = sortedAndFilteredAddons.length;

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-20">
        <Hero />

        <div className="py-8 px-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {/* Category filter chips */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link to={`/?q=${category.core}`}>
              <Tag>Core</Tag>
            </Link>
            <Link to={`/?q=${category.misc}`}>
              <Tag>Misc</Tag>
            </Link>
          </div>
        </div>

        <div className="container mx-auto w-full md:min-w-3xl px-4 sm:px-6 md:px-8 pb-12">
          {totalExports === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? <p>No exports found matching "{searchQuery}"</p> : <p>No exports available</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              <AnimatePresence mode="popLayout">
                {sortedAndFilteredAddons.map((addon, index) => {
                  // Create bento-style asymmetric layout with varying column spans
                  // Pattern: 2-col, 1-col, 1-col repeats (creates visual variety)
                  // Only apply at lg breakpoint (3 columns) to prevent layout issues
                  const spanPattern = index % 3;
                  const colSpan = spanPattern === 0 ? 'lg:col-span-2' : 'lg:col-span-1';

                  return (
                    <motion.div
                      key={addon.id}
                      className={colSpan}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
                      }}
                    >
                      <Link to={`/a/${addon.id}`} className="block h-full">
                        <ExportCard export={addon.export} addonId={addon.id} />
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
