import { describe, expect, it } from 'vitest';

import { batteryEta, batteryFlow, gridFlow, socLevel, socThresholds } from '../src/data/derived';
import { formatReading, type Reading } from '../src/data/readings';
import {
  formatDuration,
  formatNumber,
  PLACEHOLDER,
  resolveFormatLocale,
} from '../src/utils/format';

const EN = resolveFormatLocale({ language: 'en', number_format: 'language' });
const DE = resolveFormatLocale({ language: 'de', number_format: 'language' });

function reading(value: number | undefined, unit = 'kW'): Reading {
  return { entityId: 'sensor.test', value, isAvailable: value !== undefined, unit };
}

describe('formatNumber', () => {
  it('uses fixed decimals and the Home Assistant number locale', () => {
    expect(formatNumber(6.8412, 2, EN)).toBe('6.84');
    expect(formatNumber(6.8412, 2, DE)).toBe('6,84');
  });

  it('maps explicit number formats to a locale', () => {
    const comma = resolveFormatLocale({ language: 'uk', number_format: 'comma_decimal' });

    expect(formatNumber(1234.5, 1, comma)).toBe('1,234.5');
    expect(
      formatNumber(1234.5, 1, resolveFormatLocale({ language: 'en', number_format: 'none' })),
    ).toBe('1234.5');
  });

  it('does not render negative zero and shows a placeholder for missing values', () => {
    expect(formatNumber(-0.001, 2, EN)).toBe('0.00');
    expect(formatNumber(undefined, 2, EN)).toBe(PLACEHOLDER);
    expect(formatNumber(Number.NaN, 2, EN)).toBe(PLACEHOLDER);
  });
});

describe('formatReading', () => {
  it('applies registry decimals, units and absolute values', () => {
    expect(formatReading('battery_power', reading(-2.153), EN, { isAbsolute: true })).toBe('2.15');
    expect(formatReading('grid_l1_voltage', reading(238.4, 'V'), EN, { hasUnit: true })).toBe(
      '238 V',
    );
    expect(formatReading('battery_voltage', reading(54.93, 'V'), EN)).toBe('54.9');
    expect(formatReading('battery_soc', reading(undefined, '%'), EN)).toBe(PLACEHOLDER);
  });
});

describe('formatDuration', () => {
  it('formats minutes, hours and days', () => {
    expect(formatDuration(45)).toBe('45m');
    expect(formatDuration(72)).toBe('1h 12m');
    expect(formatDuration(26 * 60 + 5)).toBe('1d 2h');
  });
});

describe('power direction and battery estimate', () => {
  it('reads the add-on sign convention', () => {
    expect(batteryFlow(-2.15)).toBe('charging');
    expect(batteryFlow(1.8)).toBe('discharging');
    expect(batteryFlow(0.01)).toBe('idle');
    expect(gridFlow(0.42)).toBe('import');
    expect(gridFlow(-1.12)).toBe('export');
  });

  it('colors SOC by low and shutdown capacity', () => {
    const thresholds = socThresholds({});

    expect(socLevel(82, thresholds)).toBe('normal');
    expect(socLevel(28, thresholds)).toBe('low');
    expect(socLevel(8, thresholds)).toBe('critical');
  });

  it('estimates time to full from capacity, voltage and power', () => {
    const readings = {
      battery_soc: reading(80, '%'),
      battery_power: reading(-2),
      battery_voltage: reading(50, 'V'),
      battery_capacity_current: reading(200, 'Ah'),
    };

    expect(batteryEta(readings, socThresholds(readings))).toEqual({ kind: 'full', minutes: 60 });
  });
});
