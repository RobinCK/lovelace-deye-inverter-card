import { getSensorDefinition, type SensorKey } from '../registry/sensors';
import type { EntityOverrides } from '../types/config';
import type { HassEntities } from '../types/ha';

export function buildEntityId(domain: string, prefix: string, key: SensorKey): string {
  return `${domain}.${prefix}_${key}`;
}

export function findAutoEntityId(
  states: HassEntities,
  prefix: string,
  key: SensorKey,
): string | undefined {
  return getSensorDefinition(key)
    .domains.map((domain) => buildEntityId(domain, prefix, key))
    .find((entityId) => entityId in states);
}

export function resolveEntityId(
  states: HassEntities,
  prefix: string,
  key: SensorKey,
  overrides: EntityOverrides = {},
): string | undefined {
  const override = overrides[key];

  if (override) {
    return override in states ? override : undefined;
  }

  return findAutoEntityId(states, prefix, key);
}
