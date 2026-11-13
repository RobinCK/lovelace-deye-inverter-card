import type { SensorKey } from '../registry/sensors';
import type { HassEntities } from '../types/ha';

const MARKER_KEYS: readonly SensorKey[] = [
  'overall_state',
  'battery_soc',
  'pv_power',
  'grid_power',
  'load_power',
  'radiator_temperature',
];

const MIN_MARKERS = 2;
const SENSOR_DOMAIN = 'sensor.';

function extractPrefix(entityId: string): string | undefined {
  if (!entityId.startsWith(SENSOR_DOMAIN)) {
    return undefined;
  }

  const objectId = entityId.slice(SENSOR_DOMAIN.length);
  const key = MARKER_KEYS.find((marker) => objectId.endsWith(`_${marker}`));

  if (!key) {
    return undefined;
  }

  return objectId.slice(0, -(key.length + 1)) || undefined;
}

export function detectPrefixes(states: HassEntities): string[] {
  const counts = new Map<string, number>();

  for (const entityId of Object.keys(states)) {
    const prefix = extractPrefix(entityId);

    if (prefix) {
      counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    }
  }

  return [...counts]
    .filter(([, count]) => count >= MIN_MARKERS)
    .map(([prefix]) => prefix)
    .sort();
}
