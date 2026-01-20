import { useState } from "react";
import '../Header.css';
import './styles/precios.css';
import { Link } from "react-router-dom";

/* =========================
   Tipos
========================= */

type CostosInput = {
  costosFijosMensuales: number;
  costoVariableUnitario: number;
  volumenObjetivoMensual: number;
};

type MargenInput = {
  margenObjetivo: number;
};

type MercadoInput = {
  precioMin?: number;
  precioProm?: number;
  precioMax?: number;
};

/* =========================
   Pasos
========================= */

const PASO = {
  DEFINICION: 1,
  RESULTADO: 2,
} as const;

type Paso = typeof PASO[keyof typeof PASO];

/* =========================
   Componente
========================= */

export default function FijacionPrecios() {
  const [paso, setPaso] = useState<Paso>(PASO.DEFINICION);

  const [costos, setCostos] = useState<CostosInput>({
    costosFijosMensuales: 0,
    costoVariableUnitario: 0,
    volumenObjetivoMensual: 0,
  });

  const [margen, setMargen] = useState<MargenInput>({
    margenObjetivo: 30,
  });

  const [mercado, setMercado] = useState<MercadoInput>({});

  /* =========================
     MODELO FINANCIERO
     (NO TOCAR)
  ========================= */

  const precioMinimoBase =
    costos.volumenObjetivoMensual > 0
      ? costos.costosFijosMensuales / costos.volumenObjetivoMensual +
        costos.costoVariableUnitario
      : 0;

  const precioConMargen =
    margen.margenObjetivo > 0
      ? precioMinimoBase / (1 - margen.margenObjetivo / 100)
      : 0;

  const utilidadPorUnidad = precioConMargen - precioMinimoBase;

  const utilidadMensual =
    utilidadPorUnidad * costos.volumenObjetivoMensual;

  const puntoEquilibrio =
    precioConMargen > costos.costoVariableUnitario
      ? costos.costosFijosMensuales /
        (precioConMargen - costos.costoVariableUnitario)
      : 0;

  const hayMercado =
    mercado.precioMin || mercado.precioProm || mercado.precioMax;

  /* =========================
     Render
  ========================= */

  return (
    <main className="fijacion-precios-container">
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
          <h1>Cálculo de Precios</h1>
        </div>

        <div className="fiscal-logo-container">
          <img 
            src="/images/calculoPrecios.png" 
            alt="Cálculo de Precios" 
            className="fiscal-logo fiscal-logo-white"
          />
        </div>
      </div>
    </header>

      {/* =====================
          PASO 1: DEFINICIÓN
      ====================== */}
      {paso === PASO.DEFINICION && (
        <section className="definicion-grid">
          {/* -------- Costos -------- */}
          <div className="card">
            <h2>1. Análisis de costos</h2>

            <label>
              Gastos fijos mensuales
              <input
                type="number"
                value={costos.costosFijosMensuales}
                onChange={(e) =>
                  setCostos({
                    ...costos,
                    costosFijosMensuales: Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Costo variable por servicio
              <input
                type="number"
                value={costos.costoVariableUnitario}
                onChange={(e) =>
                  setCostos({
                    ...costos,
                    costoVariableUnitario: Number(e.target.value),
                  })
                }
              />
            </label>
          </div>

          {/* -------- Objetivo -------- */}
          <div className="card">
            <h2>2. Objetivo de ventas</h2>

            <label>
              Servicios que deseas vender al mes
              <input
                type="number"
                value={costos.volumenObjetivoMensual}
                onChange={(e) =>
                  setCostos({
                    ...costos,
                    volumenObjetivoMensual: Number(e.target.value),
                  })
                }
              />
            </label>

            <p className="hint">
              Este número representa una meta, no ventas históricas.
            </p>
          </div>

          {/* -------- Margen -------- */}
          <div className="card">
            <h2>3. Margen objetivo</h2>

            <label>
              Margen deseado (%)
              <input
                type="number"
                value={margen.margenObjetivo}
                onChange={(e) =>
                  setMargen({
                    margenObjetivo: Number(e.target.value),
                  })
                }
              />
            </label>

            <ul className="preview">
              <li>
                Precio mínimo estructural:{" "}
                <strong>${precioMinimoBase.toFixed(2)}</strong>
              </li>
              <li>
                Precio recomendado:{" "}
                <strong>${precioConMargen.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* -------- Mercado -------- */}
          <div className="card">
            <h2>4. Referencia de mercado (opcional)</h2>

            <label>
              Precio mínimo observado
              <input
                type="number"
                value={mercado.precioMin ?? ""}
                onChange={(e) =>
                  setMercado({
                    ...mercado,
                    precioMin:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Precio promedio observado
              <input
                type="number"
                value={mercado.precioProm ?? ""}
                onChange={(e) =>
                  setMercado({
                    ...mercado,
                    precioProm:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Precio máximo observado
              <input
                type="number"
                value={mercado.precioMax ?? ""}
                onChange={(e) =>
                  setMercado({
                    ...mercado,
                    precioMax:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  })
                }
              />
            </label>
          </div>

          <div className="acciones">
            <button
              disabled={
                costos.costosFijosMensuales <= 0 ||
                costos.volumenObjetivoMensual <= 0
              }
              onClick={() => setPaso(PASO.RESULTADO)}
            >
              Calcular resultado
            </button>
          </div>
        </section>
      )}

      {/* =====================
          PASO 2: RESULTADO
      ====================== */}
      {paso === PASO.RESULTADO && (
        <section className="resultado">
          <ul className="resultado-metrica">
            <li>
              <span>Precio mínimo estructural</span>
              <strong>${precioMinimoBase.toFixed(2)}</strong>
            </li>

            <li>
              <span>Precio recomendado</span>
              <strong>${precioConMargen.toFixed(2)}</strong>
            </li>

            <li>
              <span>Utilidad mensual estimada</span>
              <strong>${utilidadMensual.toFixed(2)}</strong>
            </li>

            <li>
              <span>Punto de equilibrio</span>
              <strong>
                {Math.ceil(puntoEquilibrio)} servicios
              </strong>
            </li>
          </ul>

          <div className="explicacion">
            <p>
              No deberías vender este servicio por debajo de{" "}
              <strong>${precioMinimoBase.toFixed(2)}</strong>, ya que
              ese es el precio mínimo necesario para cubrir tus costos
              fijos y variables.
            </p>

            <p>
              Si lo vendes a{" "}
              <strong>${precioConMargen.toFixed(2)}</strong>, cubrirás
              tus costos fijos al vender aproximadamente{" "}
              <strong>
                {Math.ceil(puntoEquilibrio)} servicios
              </strong>
              . A partir de ahí, cada servicio adicional genera utilidad
              real para tu negocio.
            </p>

            {hayMercado && (
              <p>
                La comparación de mercado se basa únicamente en los
                precios que ingresaste como referencia.
              </p>
            )}
          </div>

          <button
            onClick={() => {
              setPaso(PASO.DEFINICION);
              setCostos({
                costosFijosMensuales: 0,
                costoVariableUnitario: 0,
                volumenObjetivoMensual: 0,
              });
              setMargen({ margenObjetivo: 30 });
              setMercado({});
            }}
          >
            Volver a calcular
          </button>
        </section>
      )}
    </main>
  );
}
