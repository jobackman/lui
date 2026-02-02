import { useState, useMemo } from 'react';
import { Routes, Route, useParams, Navigate, Link } from 'react-router-dom';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import { ExportCard } from '@/components/export-card';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { loadAllExports, getAddonById } from '@/lib/loadExports';
import './index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/a/:id" element={<AddonDetailPage />} />
    </Routes>
  );
}

function HomePage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {filteredAddons.map((addon, index) => {
                // Create bento-style asymmetric layout with varying column spans
                // Pattern: 2-col, 1-col, 1-col repeats (creates visual variety)
                const spanPattern = index % 3;
                const colSpan = spanPattern === 0 ? 'md:col-span-2' : 'md:col-span-1';
                
                return (
                  <div key={addon.id} className={colSpan}>
                    <Link to={`/a/${addon.id}`} className="block h-full">
                      <ExportCard 
                        export={addon.export}
                        addonId={addon.id}
                      />
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

function AddonDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // Handle invalid addon IDs
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const addon = getAddonById(id);
  
  // 404 handling - redirect to home for invalid addon IDs
  if (!addon) {
    return <Navigate to="/" replace />;
  }

  // Placeholder detail page (will be fully implemented in next feature)
  return (
    <div className="min-h-screen relative">
      <BackgroundRippleEffect cellSize={48} />
      
      <div className="relative z-20">
        <div className="container mx-auto w-full px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">{addon.export.name}</h1>
          <p className="text-muted-foreground mb-8">{addon.export.description}</p>
          <p className="text-sm text-muted-foreground">
            Addon detail page (placeholder - full implementation in next feature)
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
