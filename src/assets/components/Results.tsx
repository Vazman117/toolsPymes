import type { SimulatorResult } from '../types/simulador';
import '../styles/resultados.css';

interface Props {
  result: SimulatorResult;
}

function formatCurrency(value: number) {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  });
}

function Results({ result }: Props) {
  const {
    income,
    iva,
    isrRange,
    totalToSetAsideRange,
    remainingRange,
  } = result;

  return (
    <section className='cuadro-resultados'>
      <div className='resultados-div'>
        <strong>Ingresos mensuales</strong>
        <p>{formatCurrency(income)}</p>
        <small>Dinero que entra a tu negocio.</small>
      </div>

      {iva > 0 && (
        <div className='resultados-div'>
          <strong>IVA estimado</strong>
          <p>{formatCurrency(iva)}</p>
          <small>
            Este dinero no es tuyo. Solo lo cobras para entregarlo al SAT.
          </small>
        </div>
      )}

      <div className='resultados-div'>
        <strong>ISR estimado</strong>
        <p>
          Entre {formatCurrency(isrRange[0])} y{' '}
          {formatCurrency(isrRange[1])}
        </p>
        <small>
          Estimación basada en reglas generales del SAT según tu régimen.
        </small>
      </div>

      <div className='resultados-div'>
        <strong>Total recomendado a separar (incluyendo el IVA)</strong>
        <p>
          Entre {formatCurrency(totalToSetAsideRange[0])} y{' '}
          {formatCurrency(totalToSetAsideRange[1])}
        </p>
        <small>
          Monto recomendado para evitar sorpresas fiscales.
        </small>
      </div>

      <div className='resultados-div'>
        <strong>Dinero restante aproximado</strong>
        <p>
          Entre {formatCurrency(remainingRange[0])} y{' '}
          {formatCurrency(remainingRange[1])}
        </p>
        <small>
          Monto aproximado que podrías considerar disponible.
        </small>
      </div>
    </section>
  );
}

export default Results;
