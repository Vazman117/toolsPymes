export type ContributorType = 'PF' | 'PM';

export type Regime =
  | 'RESICO'
  | 'ACT_EMP'
  | 'PM_GENERAL';

export interface SimulatorInput {
  contributorType: ContributorType;
  regime: Regime;
  monthlyIncome: number;
  appliesIVA: boolean;
  deductibleExpenses: number;
}

export interface SimulatorResult {
  income: number;
  iva: number;
  isrRange: [number, number];
  totalToSetAsideRange: [number, number];
  remainingRange: [number, number];
}
