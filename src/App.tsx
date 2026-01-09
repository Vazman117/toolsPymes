import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SimuladorFiscal from './pages/Simulador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador-fiscal" element={<SimuladorFiscal />} />
      </Routes>
    </Router>
  );
}

export default App;
