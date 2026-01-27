import { useState, useMemo } from "react";
import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search-bar";
import { AddonTabs } from "@/components/addon-tabs";
import { ExportCard } from "@/components/export-card";
import { loadAllExports } from "@/lib/loadExports";
import "./index.css";

export function App() {
  const allAddons = loadAllExports();
  
  const [activeTab, setActiveTab] = useState(allAddons[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = allAddons.map(addon => ({
    id: addon.id,
    name: addon.name,
  }));

  const activeAddon = allAddons.find(addon => addon.id === activeTab);

  const filteredExports = useMemo(() => {
    if (!activeAddon) return [];
    
    if (!searchQuery.trim()) {
      return activeAddon.exports;
    }

    const query = searchQuery.toLowerCase();
    return activeAddon.exports.filter(exp => 
      exp.name.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    );
  }, [activeAddon, searchQuery]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="py-8 px-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <AddonTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto p-8">
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {filteredExports.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? (
                <p>No exports found matching "{searchQuery}"</p>
              ) : (
                <p>No exports available</p>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExports.map((exp, index) => (
                <ExportCard key={`${exp.name}-${index}`} export={exp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
