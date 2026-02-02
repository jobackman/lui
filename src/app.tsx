import { useState, useMemo } from 'react';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { loadAllExports } from '@/lib/loadExports';
import './index.css';

export function App() {
  const allAddons = loadAllExports();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter addons based on search query (searches export name)
  const filteredAddons = useMemo(() => {
    if (!searchQuery.trim()) {
      // No search query - show all addons
      return allAddons;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter addons where the export name matches the search query
    return allAddons.filter((addon) => 
      addon.export.name.toLowerCase().includes(query)
    );
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
              {searchQuery ? (
                <p>No exports found matching "{searchQuery}"</p>
              ) : (
                <p>No exports available</p>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {filteredAddons.map((addon) => (
                <section key={addon.id} className="space-y-4">
                  {/* Section Header with Glassmorphism */}
                  <div className="glass-subtle rounded-lg px-6 py-4 border border-white/10">
                    <h2 className="text-2xl font-bold tracking-tight">{addon.name}</h2>
                  </div>

                  {/* Export Card */}
                  <ExportCard export={addon.export} />
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
