import SimulatorForm from './assets/components/SimulatorForm';
import Disclaimer from './assets/components/disclaimer';
import './Header.css';

function Header() {
  return (
    <header className="fiscal-header">
      <div className="fiscal-header-wrapper">
        {/* Logo Izquierdo - Tu Empresa */}
        <div className="fiscal-logo-container">
          <img 
            src="/images/favicon_io (1)/android-chrome-192x192.png" 
            alt="Herramientas para Pymes" 
            className="fiscal-logo fiscal-logo-color"
          />
        </div>

        {/* Título Central */}
        <div className="fiscal-title-wrapper">
          <h1>Simulador Fiscal SAT</h1>
        </div>

        {/* Logo Derecho - Herramienta */}
        <div className="fiscal-logo-container">
          <img 
            src="/images/simuladorFiscal.png" 
            alt="Simulador Fiscal" 
            className="fiscal-logo fiscal-logo-white"
          />
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <SimulatorForm />
        <Disclaimer />
      </main>
    </>
  );
}

export default App;