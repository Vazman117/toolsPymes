import { useState } from 'react';
import type { SimulatorInput, Regime, ContributorType } from '../types/simulador';
import { calculateTaxes } from '../logic/calculator';
import type { SimulatorResult } from '../types/simulador';
import Results from './Results';

function SimulatorForm() {
  const [contributorType, setContributorType] = useState<ContributorType>('PF');
  const [regime, setRegime] = useState<Regime>('RESICO');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [appliesIVA, setAppliesIVA] = useState<boolean>(true);
  const [deductibleExpenses, setDeductibleExpenses] = useState<number>(0);

  const [result, setResult] = useState<SimulatorResult | null>(null);

  function handleCalculate() {
    const input: SimulatorInput = {
      contributorType,
      regime,
      monthlyIncome,
      appliesIVA,
      deductibleExpenses,
    };

    const calculation = calculateTaxes(input);
    setResult(calculation);
  }

return (
    <div className="container1">
      <div className="grid-layout">
        {/* Columna izquierda - Formulario */}
        <section>
          <h2>Datos del simulador</h2>

          {/* Tipo de contribuyente */}
          <label>
            Tipo de contribuyente
            <select
              value={contributorType}
              onChange={(e) => {
                const value = e.target.value as ContributorType;
                setContributorType(value);

                if (value === 'PF') {
                  setRegime('RESICO');
                } else {
                  setRegime('PM_GENERAL');
                }
              }}
            >
              <option value="PF">Persona Física</option>
              <option value="PM">Persona Moral</option>
            </select>
          </label>

          {/* Régimen */}
          <label>
            Régimen fiscal
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value as Regime)}
            >
              {contributorType === 'PF' && (
                <>
                  <option value="RESICO">RESICO</option>
                  <option value="ACT_EMP">Actividad Empresarial</option>
                </>
              )}

              {contributorType === 'PM' && (
                <option value="PM_GENERAL">Régimen General</option>
              )}
            </select>
          </label>

          {/* Ingresos */}
          <label>
            Ingresos mensuales (antes de impuestos)
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            />
          </label>

          {/* IVA */}
          <label>
            ¿Cobras IVA?
            <select
              value={appliesIVA ? 'yes' : 'no'}
              onChange={(e) => setAppliesIVA(e.target.value === 'yes')}
            >
              <option value="yes">Sí (16%)</option>
              <option value="no">No</option>
            </select>
          </label>

          {/* Gastos */}
          <label>
            Gastos deducibles del mes
            <input
              type="number"
              value={deductibleExpenses}
              onChange={(e) => setDeductibleExpenses(Number(e.target.value))}
            />
          </label>

          <button onClick={handleCalculate}>
            Calcular estimación
          </button>
        </section>

        {/* Columna derecha - Resultados */}
        <section>
          <h2>Resultados</h2>
          {result ? (
            <Results result={result} />
          ) : (
            <p style={{ color: '#999', textAlign: 'center', marginTop: '40px' }}>
              Completa el formulario y presiona "Calcular estimación"
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default SimulatorForm;
