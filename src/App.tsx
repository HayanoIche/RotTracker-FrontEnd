import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutBase from './layouts/LayoutBase.tsx';
import ScrollToTop from './components/common/ScrollToTop.tsx';

import Home from './pages/Home.tsx';

function App()
{
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
