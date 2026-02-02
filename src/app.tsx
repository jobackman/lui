import { useState, useMemo } from 'react';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { AddonTabs } from '@/components/addon-tabs';
import { ExportCard } from '@/components/export-card';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { loadAllExports } from '@/lib/loadExports';
import './index.css';

export function App() {
  const allAddons = loadAllExports();

  const [activeTab, setActiveTab] = useState(allAddons[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = allAddons.map((addon) => ({
    id: addon.id,
    name: addon.name,
  }));

  const activeAddon = allAddons.find((addon) => addon.id === activeTab);

  const filteredExports = useMemo(() => {
    if (!activeAddon) return [];

    if (!searchQuery.trim()) {
      return activeAddon.exports;
    }

    const query = searchQuery.toLowerCase();
    return activeAddon.exports.filter((exp) => exp.name.toLowerCase().includes(query));
  }, [activeAddon, searchQuery]);

  return (
    <div className="min-h-screen relative">
      <BackgroundRippleEffect cellSize={48} />
      
      <div className="relative z-20">
        <Hero />

        <div className="py-8 px-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <AddonTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="container mx-auto w-full md:min-w-3xl p-8">
          <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
            {filteredExports.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? <p>No exports found matching "{searchQuery}"</p> : <p>No exports available</p>}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredExports.map((exp, index) => (
                  <ExportCard key={`${exp.name}-${index}`} export={exp} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
