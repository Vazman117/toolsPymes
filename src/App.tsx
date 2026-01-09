import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SimuladorFiscal from './pages/Simulador';
import FijacionPrecios from './pages/fijacionPrecios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador-fiscal" element={<SimuladorFiscal />} />
        <Route path="/fijacion-precios" element={<FijacionPrecios />} />
      </Routes>
    </Router>
  );
}

export default App;
