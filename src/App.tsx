import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutBase from './layouts/LayoutBase.tsx';
import LayoutAplicacao from './layouts/LayoutAplicacao.tsx';

import ScrollToTop from './components/common/ScrollToTop.tsx';

import Home from './pages/Home.tsx';
import Sobre from './pages/Sobre.tsx';
import Integrantes from './pages/Integrantes.tsx';
import IntegranteDetalhes from './pages/IntegranteDetalhes.tsx';
import Faq from './pages/Faq.tsx';
import Contato from './pages/Contato.tsx';
import Ia from './pages/Ia.tsx';
import Aplicacao from './pages/Aplicacao.tsx';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                {/* Site */}
                <Route element={<LayoutBase />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/integrantes" element={<Integrantes />} />
                    <Route path="/integrantes/:slug" element={<IntegranteDetalhes />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/ia" element={<Ia />} />
                    <Route path="/*" element={<Home />} />
                </Route>

                {/* Aplicação */}
                <Route path="/aplicacao" element={<LayoutAplicacao />}>
                  <Route index element={<Aplicacao />} />
                  <Route path="ia" element={<Aplicacao />} />
                  <Route path="armazenamentos" element={<Aplicacao />} />
                  <Route path="perfil" element={<Aplicacao />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;