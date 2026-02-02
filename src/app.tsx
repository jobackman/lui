import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home-page';
import { AddonDetailPage } from '@/pages/addon-detail-page';
import './index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/a/:id" element={<AddonDetailPage />} />
    </Routes>
  );
}

export default App;
