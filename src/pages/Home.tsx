import { Link } from 'react-router-dom';
import './styles/home.css';

function Home() {
  return (
    <main className="home-container">
      <header className="home-header">
        <img 
          src="/images/favicon_io (1)/android-chrome-192x192.png"
          alt="Herramientas para Pymes"
          className="home-logo"
        />
        <h1>Herramientas para Pymes</h1>
      </header>

      <div className="tools-grid">
        <Link to="/simulador-fiscal" className="tool-card">
          <img 
            src="/images/simuladorFiscal.png"
            alt="Simulador Fiscal"
            className="tool-icon"
          />
          <span>Simulador Fiscal</span>
        </Link>

        {/* Futuras herramientas */}
        {/* 
        <Link to="/otra-herramienta" className="tool-card">
          <img src="/images/otra.png" />
          <span>Otra herramienta</span>
        </Link>
        */}
      </div>
    </main>
  );
}

export default Home;
