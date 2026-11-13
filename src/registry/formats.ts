export type ValueKind =
  | 'power'
  | 'energy'
  | 'voltage'
  | 'current'
  | 'frequency'
  | 'temperature'
  | 'percent'
  | 'capacity'
  | 'text'
  | 'binary';

export interface ValueFormat {
  readonly isNumeric: boolean;
  readonly decimals: number;
  unit(sourceUnit: string | undefined): string;
  scale(sourceUnit: string | undefined): number;
}

const POWER_SCALES: Readonly<Record<string, number>> = { W: 0.001, kW: 1, MW: 1000 };
const ENERGY_SCALES: Readonly<Record<string, number>> = { Wh: 0.001, kWh: 1, MWh: 1000 };

function scaled(
  unit: string,
  decimals: number,
  scales: Readonly<Record<string, number>>,
  defaultUnit: string,
): ValueFormat {
  return {
    isNumeric: true,
    decimals,
    unit: () => unit,
    scale: (sourceUnit) => scales[sourceUnit ?? defaultUnit] ?? scales[defaultUnit] ?? 1,
  };
}

function fixed(unit: string, decimals: number): ValueFormat {
  return {
    isNumeric: true,
    decimals,
    unit: () => unit,
    scale: () => 1,
  };
}

function native(defaultUnit: string, decimals: number): ValueFormat {
  return {
    isNumeric: true,
    decimals,
    unit: (sourceUnit) => sourceUnit ?? defaultUnit,
    scale: () => 1,
  };
}

const TEXT_FORMAT: ValueFormat = {
  isNumeric: false,
  decimals: 0,
  unit: () => '',
  scale: () => 1,
};

export const VALUE_FORMATS: Readonly<Record<ValueKind, ValueFormat>> = {
  power: scaled('kW', 2, POWER_SCALES, 'W'),
  energy: scaled('kWh', 1, ENERGY_SCALES, 'kWh'),
  voltage: fixed('V', 1),
  current: fixed('A', 1),
  frequency: fixed('Hz', 2),
  temperature: native('°C', 1),
  percent: fixed('%', 0),
  capacity: fixed('Ah', 0),
  text: TEXT_FORMAT,
  binary: TEXT_FORMAT,
};
