import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutBase from './layouts/LayoutBase.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';

import Home from './pages/Home.tsx';
import Sobre from './pages/Sobre.tsx';
import Integrantes from './pages/Integrantes.tsx';

function App()
{
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
