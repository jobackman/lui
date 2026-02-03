import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from '@/pages/home-page';
import { AddonDetailPage } from '@/pages/addon-detail-page';
import { CommandBar } from '@/components/command-bar';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import './index.css';

export function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <BackgroundRippleEffect cellSize={48} />
      <CommandBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/a/:id" element={<AddonDetailPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
