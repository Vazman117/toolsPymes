import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import './styles/equilibrio.css';

interface Servicio {
  precio: number;
  costo: number;
  cantidad: number;
}

export default function PuntoEquilibrio() {
  const [gastosFijos, setGastosFijos] = useState<number>(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const [servicios, setServicios] = useState<Servicio[]>([
    { precio: 0, costo: 0, cantidad: 0 },
    { precio: 0, costo: 0, cantidad: 0 },
    { precio: 0, costo: 0, cantidad: 0 },
    { precio: 0, costo: 0, cantidad: 0 },
    { precio: 0, costo: 0, cantidad: 0 },
  ]);

  const resultados = useMemo(() => {
    const serviciosValidos = servicios
      .map((s, index) => {
        const margenUnitario = s.precio - s.costo;
        return {
          ...s,
          index,
          margenUnitario,
          margenMensual: margenUnitario * s.cantidad,
        };
      })
      .filter(s => s.margenUnitario > 0 && s.cantidad > 0);

    if (serviciosValidos.length === 0 || gastosFijos <= 0) return null;

    const margenTotalActual = serviciosValidos.reduce(
      (acc, s) => acc + s.margenMensual,
      0
    );

    if (margenTotalActual <= 0) return null;

    const factorEquilibrio = gastosFijos / margenTotalActual;

    const desglose = serviciosValidos
      .map(s => ({
        servicio: `Servicio ${String.fromCharCode(65 + s.index)}`,
        ventasActuales: s.cantidad,
        ventasEquilibrio: Math.ceil(s.cantidad * factorEquilibrio),
        margenUnitario: s.margenUnitario,
      }))
      .sort((a, b) => b.ventasEquilibrio - a.ventasEquilibrio);

    return {
      desglose,
      porcentajeActual: Math.round(
        (margenTotalActual / gastosFijos) * 100
      ),
    };
  }, [gastosFijos, servicios]);

  const updateServicio = (
    index: number,
    field: keyof Servicio,
    value: number
  ) => {
    const copia = [...servicios];
    copia[index][field] = value;
    setServicios(copia);
    setMostrarResultados(false);
  };

  const resultadosSeguros = mostrarResultados ? resultados : null;

  return (
    <div className="equilibrio-container">
      {/* HEADER — SE RESPETA TAL CUAL */}
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
            <h1>Punto de Equilibrio</h1>
          </div>

          <div className="fiscal-logo-container">
            <img 
              src="/images/equilibrio.png" 
              alt="Cálculo de Precios" 
              className="fiscal-logo fiscal-logo-white"
            />
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL: INPUTS Y RESULTADOS */}
      <div className="equilibrio-content">
        
        {/* LADO IZQUIERDO: INPUTS */}
        <div className="equilibrio-inputs">
          <div className="input-section">
            <label className="input-label">Gastos fijos mensuales</label>
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={gastosFijos || ''}
                onChange={e => {
                  setGastosFijos(Number(e.target.value));
                  setMostrarResultados(false);
                }}
                className="input-field"
              />
            </div>
          </div>

          <div className="servicios-section">
            <h3 className="section-title">Servicios más vendidos</h3>
            <p className="section-subtitle">Máximo 5 servicios</p>

            <div className="servicios-grid-header">
              <span></span>
              <span>Precio</span>
              <span>Costo</span>
              <span>Ventas/mes</span>
            </div>

            {servicios.map((_, i) => (
              <div className="servicio-input-row" key={i}>
                <div className="servicio-number">{String.fromCharCode(65 + i)}</div>
                <input
                  type="number"
                  placeholder="$"
                  onChange={e =>
                    updateServicio(i, "precio", Number(e.target.value))
                  }
                  className="servicio-input"
                />
                <input
                  type="number"
                  placeholder="$"
                  onChange={e =>
                    updateServicio(i, "costo", Number(e.target.value))
                  }
                  className="servicio-input"
                />
                <input
                  type="number"
                  placeholder="0"
                  onChange={e =>
                    updateServicio(i, "cantidad", Number(e.target.value))
                  }
                  className="servicio-input"
                />
              </div>
            ))}

            <div className="calcular-section">
              <button
                className="calcular-button"
                onClick={() => setMostrarResultados(true)}
                disabled={!resultados}
              >
                Calcular punto de equilibrio
              </button>
            </div>

          </div>
        </div>

        {/* LADO DERECHO: RESULTADOS */}
        <div className="equilibrio-resultados">
          {!resultadosSeguros ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p className="empty-text">
                Ingresa tus datos en el panel izquierdo para visualizar el punto de equilibrio de tu operación
              </p>
            </div>
          ) : (
            <>
              {/* GRÁFICA PRINCIPAL: PUNTO DE EQUILIBRIO */}
              <div className="resultado-section">                
                <div className="equilibrio-bar-container">
                  <div className="equilibrio-percentage">
                    <span className="percentage-value">{resultadosSeguros.porcentajeActual}%</span>
                    <span className="percentage-label">Porcentaje actual que genera tu empresa</span>
                  </div>

                  <p className="bar-description">
                    {resultadosSeguros.porcentajeActual < 100 
                      ? `Necesitas aumentar ${(100 - resultadosSeguros.porcentajeActual).toFixed(0)}% más para alcanzar el punto de equilibrio`
                      : `Has superado el punto de equilibrio en un ${(resultadosSeguros.porcentajeActual - 100).toFixed(0)}%`
                    }
                  </p>

                  <div className="bar-wrapper">
                    <div className="bar-track">
                      <div 
                        className="bar-fill"
                        style={{
                          width: `${Math.min((resultadosSeguros.porcentajeActual / 200) * 100, 100)}%`
                        }}
                      />
                      <div className="equilibrio-line">
                        <div className="equilibrio-marker-dot"></div>
                        <span className="equilibrio-label">Punto de Equilibrio</span>
                      </div>
                    </div>
                    
                    <div className="bar-labels">
                      <span>0%</span>
                      <span>100%</span>
                      <span>200%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESGLOSE POR SERVICIO */}
            <div className="resultado-section">
              <div className="servicios-bars-vertical">
                {resultadosSeguros.desglose.map((s, i) => {
                  const progreso = s.ventasActuales / s.ventasEquilibrio;
                  const barHeight = Math.min(progreso * 100, 100);
          
                  return (
                    <div className="servicio-bar-column" key={i}>
                      <div className="bar-value-label">{s.ventasEquilibrio}</div>
                      <div className="servicio-bar-vertical-track">
                        <div 
                          className="servicio-bar-vertical-fill"
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>
                      <div className="servicio-label-bottom">
                        <span className="servicio-letter">{s.servicio.replace("Servicio ", "")}</span>
                      </div>
                      <div className="servicio-mini-details">
                        <div>Ventas actuales: {s.ventasActuales}</div>
                        <div>Margen unitario: ${s.margenUnitario}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
