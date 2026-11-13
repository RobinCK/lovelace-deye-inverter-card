import type { SectionId, SignKey } from '../types/config';
import type { ValueKind } from './formats';

export type EntityDomain = 'sensor' | 'binary_sensor' | 'number';
export type AggregateKind = 'sum' | 'master' | 'shared' | 'pooled' | 'none';

export interface SensorDefinition {
  readonly key: string;
  readonly section: SectionId;
  readonly label: string;
  readonly kind: ValueKind;
  readonly domains: readonly EntityDomain[];
  readonly aggregate: AggregateKind;
  readonly decimals?: number;
  readonly sign?: SignKey;
}

const SENSOR: readonly EntityDomain[] = ['sensor'];
const BINARY: readonly EntityDomain[] = ['binary_sensor', 'sensor'];
const SETTING: readonly EntityDomain[] = ['number', 'sensor'];

export const SENSOR_DEFINITIONS = [
  {
    key: 'overall_state',
    section: 'status',
    label: 'Overall state',
    kind: 'text',
    domains: SENSOR,
    aggregate: 'none',
  },
  {
    key: 'fault',
    section: 'status',
    label: 'Fault',
    kind: 'text',
    domains: SENSOR,
    aggregate: 'none',
  },
  {
    key: 'grid_connected',
    section: 'status',
    label: 'Grid connected',
    kind: 'binary',
    domains: BINARY,
    aggregate: 'master',
  },
  {
    key: 'grid_relay_status',
    section: 'status',
    label: 'Grid relay status',
    kind: 'binary',
    domains: BINARY,
    aggregate: 'master',
  },
  {
    key: 'parallel_mode',
    section: 'status',
    label: 'Parallel mode',
    kind: 'text',
    domains: SENSOR,
    aggregate: 'none',
  },

  {
    key: 'pv_power',
    section: 'pv',
    label: 'PV power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'pv1_power',
    section: 'pv',
    label: 'PV1 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'pv2_power',
    section: 'pv',
    label: 'PV2 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'pv1_voltage',
    section: 'pv',
    label: 'PV1 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
  },
  {
    key: 'pv2_voltage',
    section: 'pv',
    label: 'PV2 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
  },
  {
    key: 'pv1_current',
    section: 'pv',
    label: 'PV1 current',
    kind: 'current',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'pv2_current',
    section: 'pv',
    label: 'PV2 current',
    kind: 'current',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'day_pv_energy',
    section: 'pv',
    label: 'Day PV energy',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },

  {
    key: 'battery_soc',
    section: 'battery',
    label: 'Battery SOC',
    kind: 'percent',
    domains: SENSOR,
    aggregate: 'shared',
  },
  {
    key: 'battery_power',
    section: 'battery',
    label: 'Battery power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'battery_power',
  },
  {
    key: 'battery_voltage',
    section: 'battery',
    label: 'Battery voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'shared',
  },
  {
    key: 'battery_current',
    section: 'battery',
    label: 'Battery current',
    kind: 'current',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'battery_power',
  },
  {
    key: 'battery_temperature',
    section: 'battery',
    label: 'Battery temperature',
    kind: 'temperature',
    domains: SENSOR,
    aggregate: 'shared',
  },
  {
    key: 'day_battery_charge',
    section: 'battery',
    label: 'Day battery charge',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'day_battery_discharge',
    section: 'battery',
    label: 'Day battery discharge',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'battery_capacity_current',
    section: 'battery',
    label: 'Battery capacity',
    kind: 'capacity',
    domains: SETTING,
    aggregate: 'pooled',
  },
  {
    key: 'battery_low_capacity',
    section: 'battery',
    label: 'Battery low capacity',
    kind: 'percent',
    domains: SETTING,
    aggregate: 'master',
  },
  {
    key: 'battery_shutdown_capacity',
    section: 'battery',
    label: 'Battery shutdown capacity',
    kind: 'percent',
    domains: SETTING,
    aggregate: 'master',
  },

  {
    key: 'grid_power',
    section: 'grid',
    label: 'Grid power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'grid_power',
  },
  {
    key: 'grid_ct_power',
    section: 'grid',
    label: 'Grid CT power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'grid_power',
  },
  {
    key: 'grid_l1_power',
    section: 'grid',
    label: 'Grid L1 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'grid_power',
  },
  {
    key: 'grid_l2_power',
    section: 'grid',
    label: 'Grid L2 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'grid_power',
  },
  {
    key: 'grid_l3_power',
    section: 'grid',
    label: 'Grid L3 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
    sign: 'grid_power',
  },
  {
    key: 'grid_l1_voltage',
    section: 'grid',
    label: 'Grid L1 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'grid_l2_voltage',
    section: 'grid',
    label: 'Grid L2 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'grid_l3_voltage',
    section: 'grid',
    label: 'Grid L3 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'grid_frequency',
    section: 'grid',
    label: 'Grid frequency',
    kind: 'frequency',
    domains: SENSOR,
    aggregate: 'master',
  },
  {
    key: 'day_grid_import',
    section: 'grid',
    label: 'Day grid import',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'day_grid_export',
    section: 'grid',
    label: 'Day grid export',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },

  {
    key: 'load_power',
    section: 'load',
    label: 'Load power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'load_l1_power',
    section: 'load',
    label: 'Load L1 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'load_l2_power',
    section: 'load',
    label: 'Load L2 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'load_l3_power',
    section: 'load',
    label: 'Load L3 power',
    kind: 'power',
    domains: SENSOR,
    aggregate: 'sum',
  },
  {
    key: 'load_l1_voltage',
    section: 'load',
    label: 'Load L1 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'load_l2_voltage',
    section: 'load',
    label: 'Load L2 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'load_l3_voltage',
    section: 'load',
    label: 'Load L3 voltage',
    kind: 'voltage',
    domains: SENSOR,
    aggregate: 'master',
    decimals: 0,
  },
  {
    key: 'load_frequency',
    section: 'load',
    label: 'Load frequency',
    kind: 'frequency',
    domains: SENSOR,
    aggregate: 'master',
  },
  {
    key: 'day_load_energy',
    section: 'load',
    label: 'Day load energy',
    kind: 'energy',
    domains: SENSOR,
    aggregate: 'sum',
  },

  {
    key: 'radiator_temperature',
    section: 'temps',
    label: 'Radiator temperature',
    kind: 'temperature',
    domains: SENSOR,
    aggregate: 'none',
  },
  {
    key: 'dc_transformer_temperature',
    section: 'temps',
    label: 'DC transformer temperature',
    kind: 'temperature',
    domains: SENSOR,
    aggregate: 'none',
  },
] as const satisfies readonly SensorDefinition[];

export type SensorKey = (typeof SENSOR_DEFINITIONS)[number]['key'];

const DEFINITIONS_BY_KEY: ReadonlyMap<string, SensorDefinition> = new Map(
  SENSOR_DEFINITIONS.map((definition) => [definition.key, definition]),
);

export function getSensorDefinition(key: SensorKey): SensorDefinition {
  const definition = DEFINITIONS_BY_KEY.get(key);

  if (!definition) {
    throw new Error(`Unknown sensor key: ${key}`);
  }

  return definition;
}

export function isSensorKey(key: string): key is SensorKey {
  return DEFINITIONS_BY_KEY.has(key);
}

export function getSectionKeys(section: SectionId): SensorKey[] {
  return SENSOR_DEFINITIONS.filter((definition) => definition.section === section).map(
    (definition) => definition.key,
  );
}
