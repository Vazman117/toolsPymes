import type { SimulatorInput } from '../types/simulador';

export function calculateTaxes(input: SimulatorInput) {
  const { monthlyIncome, appliesIVA, regime } = input;

  // IVA (si aplica)
  const iva = appliesIVA ? monthlyIncome * 0.16 : 0;

  // ISR estimado por rangos
  let isrMin = 0;
  let isrMax = 0;

  switch (regime) {
    case 'RESICO':
      isrMin = monthlyIncome * 0.01;
      isrMax = monthlyIncome * 0.025;
      break;

    case 'ACT_EMP':
      isrMin = monthlyIncome * 0.20;
      isrMax = monthlyIncome * 0.30;
      break;

    case 'PM_GENERAL':
      isrMin = monthlyIncome * 0.25;
      isrMax = monthlyIncome * 0.30;
      break;
  }

  return {
    income: monthlyIncome,
    iva,
    isrRange: [isrMin, isrMax] as [number, number],
    totalToSetAsideRange: [
      iva + isrMin,
      iva + isrMax,
    ] as [number, number],
    remainingRange: [
      monthlyIncome - (iva + isrMax),
      monthlyIncome - (iva + isrMin),
    ] as [number, number],
  };
}
