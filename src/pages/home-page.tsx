import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { loadAllExports } from '@/lib/loadExports';

export function HomePage() {
  const allAddons = loadAllExports();
  const [searchQuery, setSearchQuery] = useState('');

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

  const totalExports = filteredAddons.length;

  return (
    <div className="min-h-screen relative">
      <BackgroundRippleEffect cellSize={48} />

      <div className="relative z-20">
        <Hero />

        <div className="py-8 px-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="container mx-auto w-full md:min-w-3xl px-8 pb-12">
          {totalExports === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? <p>No exports found matching "{searchQuery}"</p> : <p>No exports available</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {filteredAddons.map((addon, index) => {
                // Create bento-style asymmetric layout with varying column spans
                // Pattern: 2-col, 1-col, 1-col repeats (creates visual variety)
                const spanPattern = index % 3;
                const colSpan = spanPattern === 0 ? 'md:col-span-2' : 'md:col-span-1';

                return (
                  <div key={addon.id} className={colSpan}>
                    <Link to={`/a/${addon.id}`} className="block h-full">
                      <ExportCard export={addon.export} addonId={addon.id} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
