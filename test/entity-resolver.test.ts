import { describe, expect, it } from 'vitest';

import { findAutoEntityId, resolveEntityId } from '../src/data/entity-resolver';
import { readInverterReadings } from '../src/data/panels';
import { detectPrefixes } from '../src/data/prefix-detector';
import { entity, states } from './helpers';

const NO_INVERT = { battery_power: false, grid_power: false };

describe('resolveEntityId', () => {
  it('finds add-on sensors by prefix and key', () => {
    const hass = states(entity('sensor.deye_master_battery_soc', 82, '%'));

    expect(resolveEntityId(hass, 'deye_master', 'battery_soc')).toBe(
      'sensor.deye_master_battery_soc',
    );
  });

  it('looks up binary sensors and number entities in their own domains', () => {
    const hass = states(
      entity('binary_sensor.deye_master_grid_connected', 'on'),
      entity('number.deye_master_battery_low_capacity', 35, '%'),
    );

    expect(findAutoEntityId(hass, 'deye_master', 'grid_connected')).toBe(
      'binary_sensor.deye_master_grid_connected',
    );
    expect(findAutoEntityId(hass, 'deye_master', 'battery_low_capacity')).toBe(
      'number.deye_master_battery_low_capacity',
    );
  });

  it('prefers an override over the automatic entity', () => {
    const hass = states(
      entity('sensor.deye_master_battery_soc', 82, '%'),
      entity('sensor.custom_override', 77, '%'),
    );

    expect(
      resolveEntityId(hass, 'deye_master', 'battery_soc', {
        battery_soc: 'sensor.custom_override',
      }),
    ).toBe('sensor.custom_override');
  });

  it('returns undefined when neither the override nor the sensor exists', () => {
    const hass = states(entity('sensor.deye_master_battery_soc', 82, '%'));

    expect(
      resolveEntityId(hass, 'deye_master', 'battery_soc', { battery_soc: 'sensor.missing' }),
    ).toBeUndefined();
    expect(resolveEntityId(hass, 'deye_slave', 'battery_soc')).toBeUndefined();
  });
});

describe('readInverterReadings', () => {
  const inverter = { prefix: 'deye_master', name: 'Master', overrides: {} };

  it('converts watts to kilowatts and keeps the add-on sign by default', () => {
    const hass = states(entity('sensor.deye_master_battery_power', -2150, 'W'));
    const readings = readInverterReadings(hass, inverter, NO_INVERT);

    expect(readings.battery_power?.value).toBeCloseTo(-2.15);
    expect(readings.battery_power?.unit).toBe('kW');
  });

  it('inverts every sensor of the configured sign group', () => {
    const hass = states(
      entity('sensor.deye_master_grid_power', 1120, 'W'),
      entity('sensor.deye_master_grid_l1_power', 380, 'W'),
      entity('sensor.deye_master_load_power', 3570, 'W'),
    );
    const readings = readInverterReadings(hass, inverter, {
      battery_power: false,
      grid_power: true,
    });

    expect(readings.grid_power?.value).toBeCloseTo(-1.12);
    expect(readings.grid_l1_power?.value).toBeCloseTo(-0.38);
    expect(readings.load_power?.value).toBeCloseTo(3.57);
  });

  it('marks unavailable and non-numeric states as unavailable', () => {
    const hass = states(
      entity('sensor.deye_master_load_power', 'unavailable', 'W'),
      entity('sensor.deye_master_pv_power', 'n/a', 'W'),
      entity('sensor.deye_master_overall_state', 'ok'),
    );
    const readings = readInverterReadings(hass, inverter, NO_INVERT);

    expect(readings.load_power?.isAvailable).toBe(false);
    expect(readings.pv_power?.isAvailable).toBe(false);
    expect(readings.overall_state?.text).toBe('ok');
    expect(readings.grid_power).toBeUndefined();
  });
});

describe('detectPrefixes', () => {
  it('detects prefixes that expose several add-on sensors', () => {
    const hass = states(
      entity('sensor.deye_master_battery_soc', 82, '%'),
      entity('sensor.deye_master_pv_power', 6840, 'W'),
      entity('sensor.deye_slave_battery_soc', 82, '%'),
      entity('sensor.deye_slave_load_power', 3110, 'W'),
      entity('sensor.phone_battery_soc', 54, '%'),
    );

    expect(detectPrefixes(hass)).toEqual(['deye_master', 'deye_slave']);
  });
});
