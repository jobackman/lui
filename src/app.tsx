import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from '@/pages/home-page';
import { AddonDetailPage } from '@/pages/addon-detail-page';
import { CommandBar } from '@/components/command-bar';
import './index.css';

export function App() {
  const location = useLocation();

  return (
    <>
      <CommandBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/a/:id" element={<AddonDetailPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
