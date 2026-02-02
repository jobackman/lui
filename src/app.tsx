import { useState, useMemo } from 'react';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { loadAllExports } from '@/lib/loadExports';
import type { AddonExport } from '@/types/exports';
import './index.css';

export function App() {
  const allAddons = loadAllExports();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter all exports globally across all addon categories
  const filteredAddonGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      // No search query - show all addons with all their exports
      return allAddons;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter each addon's exports, only include addons that have matching exports
    return allAddons
      .map((addon) => ({
        ...addon,
        exports: addon.exports.filter((exp) => exp.name.toLowerCase().includes(query)),
      }))
      .filter((addon) => addon.exports.length > 0);
  }, [allAddons, searchQuery]);

  const totalExports = filteredAddonGroups.reduce((sum, addon) => sum + addon.exports.length, 0);

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
              {searchQuery ? (
                <p>No exports found matching "{searchQuery}"</p>
              ) : (
                <p>No exports available</p>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {filteredAddonGroups.map((addon) => (
                <section key={addon.id} className="space-y-4">
                  {/* Section Header with Glassmorphism */}
                  <div className="glass-subtle rounded-lg px-6 py-4 border border-white/10">
                    <h2 className="text-2xl font-bold tracking-tight">{addon.name}</h2>
                  </div>

                  {/* Export Cards Grid */}
                  <div className="grid gap-4">
                    {addon.exports.map((exp, index) => (
                      <ExportCard key={`${addon.id}-${exp.name}-${index}`} export={exp} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
