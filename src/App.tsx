import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutBase from './layouts/LayoutBase.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';

import Home from './pages/Home.tsx';
import Sobre from './pages/Sobre.tsx';
import Integrantes from './pages/Integrantes.tsx';
import IntegranteDetalhes from './pages/IntegranteDetalhes';
import Faq from './pages/Faq.tsx';
import Contato from './pages/Contato.tsx';

function App()
{
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:slug" element={<IntegranteDetalhes />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
