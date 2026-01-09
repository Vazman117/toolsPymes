import SimulatorForm from '../assets/components/SimulatorForm';
import Disclaimer from '../assets/components/disclaimer';
import '../Header.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="fiscal-header">
      <div className="fiscal-header-wrapper">
        <Link to="/" className="fiscal-logo-container">
          <img 
            src="/images/favicon_io (1)/android-chrome-192x192.png" 
            alt="Herramientas para Pymes" 
            className="fiscal-logo fiscal-logo-color"
          />
        </Link>

        <div className="fiscal-title-wrapper">
          <h1>Simulador Fiscal</h1>
        </div>

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

function SimuladorFiscal() {
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

export default SimuladorFiscal;
