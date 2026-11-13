import type { HassEntities, HassEntity } from '../src/types/ha';

export const NOW = Date.parse('2026-06-15T12:40:00Z');

export function entity(entityId: string, state: string | number, unit?: string): HassEntity {
  const timestamp = new Date(NOW).toISOString();

  return {
    entity_id: entityId,
    state: String(state),
    attributes: unit ? { unit_of_measurement: unit } : {},
    last_changed: timestamp,
    last_updated: timestamp,
  };
}

export function states(...entities: readonly HassEntity[]): HassEntities {
  return Object.fromEntries(entities.map((item) => [item.entity_id, item]));
}
