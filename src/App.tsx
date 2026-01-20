import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SimuladorFiscal from './pages/Simulador';
import FijacionPrecios from './pages/fijacionPrecios';
import PuntoEquilibrio from './pages/equilibrio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador-fiscal" element={<SimuladorFiscal />} />
        <Route path="/cálculo-de-precios" element={<FijacionPrecios />} />
        <Route path="/punto-de-equilibrio" element={<PuntoEquilibrio />} />
      </Routes>
    </Router>
  );
}

export default App;
