import { VALUE_FORMATS } from '../registry/formats';
import { getSensorDefinition, type SensorKey } from '../registry/sensors';
import type { SignKey } from '../types/config';
import type { HassEntity } from '../types/ha';
import { formatNumber, PLACEHOLDER, type FormatLocale } from '../utils/format';

export interface Reading {
  readonly entityId: string;
  readonly isAvailable: boolean;
  readonly value?: number;
  readonly text?: string;
  readonly unit: string;
  readonly lastChanged?: number;
}

export type Readings = Partial<Record<SensorKey, Reading>>;

const UNAVAILABLE_STATES: ReadonlySet<string> = new Set(['unavailable', 'unknown']);
const ON_STATES: ReadonlySet<string> = new Set(['on', 'true', '1']);
const OFF_STATES: ReadonlySet<string> = new Set(['off', 'false', '0']);

export function isOffState(state: string): boolean {
  return OFF_STATES.has(state.toLowerCase());
}

export function normalizeValue(
  key: SensorKey,
  raw: number,
  sourceUnit: string | undefined,
  invert: Readonly<Record<SignKey, boolean>>,
): number {
  const definition = getSensorDefinition(key);
  const format = VALUE_FORMATS[definition.kind];
  const sign = definition.sign && invert[definition.sign] ? -1 : 1;

  return raw * format.scale(sourceUnit) * sign;
}

export function readEntity(
  key: SensorKey,
  entity: HassEntity,
  invert: Readonly<Record<SignKey, boolean>>,
): Reading {
  const definition = getSensorDefinition(key);
  const format = VALUE_FORMATS[definition.kind];
  const sourceUnit = entity.attributes.unit_of_measurement;
  const lastChanged = Date.parse(entity.last_changed);
  const base = {
    entityId: entity.entity_id,
    unit: format.unit(sourceUnit),
    lastChanged: Number.isNaN(lastChanged) ? undefined : lastChanged,
  };

  if (UNAVAILABLE_STATES.has(entity.state)) {
    return { ...base, isAvailable: false };
  }

  if (!format.isNumeric) {
    return { ...base, isAvailable: true, text: entity.state };
  }

  const raw = Number.parseFloat(entity.state);

  if (!Number.isFinite(raw)) {
    return { ...base, isAvailable: false };
  }

  return { ...base, isAvailable: true, value: normalizeValue(key, raw, sourceUnit, invert) };
}

export function valueOf(reading: Reading | undefined): number | undefined {
  return reading?.isAvailable ? reading.value : undefined;
}

export function textOf(reading: Reading | undefined): string | undefined {
  return reading?.isAvailable ? reading.text : undefined;
}

export function isOn(reading: Reading | undefined): boolean | undefined {
  const text = textOf(reading)?.toLowerCase();

  if (text === undefined) {
    return undefined;
  }

  if (ON_STATES.has(text)) {
    return true;
  }

  return isOffState(text) ? false : undefined;
}

export function formatReading(
  key: SensorKey,
  reading: Reading | undefined,
  locale: FormatLocale,
  options: { readonly isAbsolute?: boolean; readonly hasUnit?: boolean } = {},
): string {
  const value = valueOf(reading);

  if (value === undefined || !reading) {
    return PLACEHOLDER;
  }

  const definition = getSensorDefinition(key);
  const decimals = definition.decimals ?? VALUE_FORMATS[definition.kind].decimals;
  const number = formatNumber(options.isAbsolute ? Math.abs(value) : value, decimals, locale);

  return options.hasUnit && reading.unit ? `${number} ${reading.unit}` : number;
}
