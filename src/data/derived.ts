import {
  DEFAULT_LOW_SOC,
  DEFAULT_SHUTDOWN_SOC,
  GRID_VOLTAGE_MAX,
  GRID_VOLTAGE_MIN,
  IDLE_POWER_KW,
  PHASES,
  PV_STRINGS,
} from '../const';
import type { SensorKey } from '../registry/sensors';
import { valueOf, type Reading, type Readings } from './readings';
import { sumReadings } from './totals';

export type Phase = (typeof PHASES)[number];
export type PvString = (typeof PV_STRINGS)[number];
export type BatteryFlow = 'charging' | 'discharging' | 'idle';
export type GridFlow = 'import' | 'export' | 'idle';
export type SocLevel = 'normal' | 'low' | 'critical';

export interface PhaseReading {
  readonly phase: Phase;
  readonly powerKey: SensorKey;
  readonly power: Reading;
  readonly voltage?: Reading;
}

export interface SocThresholds {
  readonly low: number;
  readonly shutdown: number;
  readonly hasLow: boolean;
  readonly hasShutdown: boolean;
}

export interface BatteryEta {
  readonly kind: 'full' | 'empty';
  readonly minutes: number;
}

const FULL_SOC = 100;
const MINUTES_PER_HOUR = 60;
const WH_PER_KWH = 1000;

export function pvStringKeys(index: PvString): {
  readonly power: SensorKey;
  readonly voltage: SensorKey;
  readonly current: SensorKey;
} {
  return {
    power: `pv${index}_power`,
    voltage: `pv${index}_voltage`,
    current: `pv${index}_current`,
  };
}

export function pvPowerReading(readings: Readings): Reading | undefined {
  if (readings.pv_power) {
    return readings.pv_power;
  }

  const strings = PV_STRINGS.map((index) => readings[pvStringKeys(index).power]).filter(
    (reading): reading is Reading => reading !== undefined,
  );

  return sumReadings(strings);
}

export function pvSourceEntityIds(readings: Readings): string[] {
  if (readings.pv_power) {
    return [readings.pv_power.entityId];
  }

  return PV_STRINGS.map((index) => readings[pvStringKeys(index).power])
    .filter((reading): reading is Reading => reading !== undefined)
    .map((reading) => reading.entityId);
}

export function gridPowerKey(readings: Readings): 'grid_power' | 'grid_ct_power' | undefined {
  if (readings.grid_power) {
    return 'grid_power';
  }

  return readings.grid_ct_power ? 'grid_ct_power' : undefined;
}

function collectPhases(
  readings: Readings,
  keys: (phase: Phase) => { readonly power: SensorKey; readonly voltage: SensorKey },
): PhaseReading[] {
  const phases: PhaseReading[] = [];

  for (const phase of PHASES) {
    const { power: powerKey, voltage: voltageKey } = keys(phase);
    const power = readings[powerKey];

    if (!power) {
      continue;
    }

    phases.push({ phase, powerKey, power, voltage: readings[voltageKey] });
  }

  return phases;
}

export function gridPhases(readings: Readings): PhaseReading[] {
  return collectPhases(readings, (phase) => ({
    power: `grid_l${phase}_power`,
    voltage: `grid_l${phase}_voltage`,
  }));
}

export function loadPhases(readings: Readings): PhaseReading[] {
  return collectPhases(readings, (phase) => ({
    power: `load_l${phase}_power`,
    voltage: `load_l${phase}_voltage`,
  }));
}

export function gridVoltages(readings: Readings): Reading[] {
  return PHASES.map((phase) => readings[`grid_l${phase}_voltage` as const]).filter(
    (reading): reading is Reading => reading !== undefined,
  );
}

export function isVoltageOutOfRange(voltage: number | undefined): boolean {
  if (voltage === undefined) {
    return false;
  }

  return voltage < GRID_VOLTAGE_MIN || voltage > GRID_VOLTAGE_MAX;
}

export function batteryFlow(power: number | undefined): BatteryFlow | undefined {
  if (power === undefined) {
    return undefined;
  }

  if (Math.abs(power) < IDLE_POWER_KW) {
    return 'idle';
  }

  return power < 0 ? 'charging' : 'discharging';
}

export function gridFlow(power: number | undefined): GridFlow | undefined {
  if (power === undefined) {
    return undefined;
  }

  if (Math.abs(power) < IDLE_POWER_KW) {
    return 'idle';
  }

  return power > 0 ? 'import' : 'export';
}

export function socThresholds(readings: Readings): SocThresholds {
  const low = valueOf(readings.battery_low_capacity);
  const shutdown = valueOf(readings.battery_shutdown_capacity);

  return {
    low: low ?? DEFAULT_LOW_SOC,
    shutdown: shutdown ?? DEFAULT_SHUTDOWN_SOC,
    hasLow: low !== undefined,
    hasShutdown: shutdown !== undefined,
  };
}

export function socLevel(soc: number | undefined, thresholds: SocThresholds): SocLevel {
  if (soc === undefined) {
    return 'normal';
  }

  if (soc < thresholds.shutdown) {
    return 'critical';
  }

  return soc < thresholds.low ? 'low' : 'normal';
}

export function batteryEta(readings: Readings, thresholds: SocThresholds): BatteryEta | undefined {
  const soc = valueOf(readings.battery_soc);
  const power = valueOf(readings.battery_power);
  const voltage = valueOf(readings.battery_voltage);
  const capacity = valueOf(readings.battery_capacity_current);
  const flow = batteryFlow(power);

  if (soc === undefined || power === undefined || voltage === undefined || !capacity) {
    return undefined;
  }

  if (flow === undefined || flow === 'idle') {
    return undefined;
  }

  const capacityKwh = (capacity * voltage) / WH_PER_KWH;
  const isCharging = flow === 'charging';
  const remainingSoc = isCharging ? FULL_SOC - soc : soc - thresholds.shutdown;
  const energyKwh = (Math.max(0, remainingSoc) / FULL_SOC) * capacityKwh;

  return {
    kind: isCharging ? 'full' : 'empty',
    minutes: (energyKwh / Math.abs(power)) * MINUTES_PER_HOUR,
  };
}
