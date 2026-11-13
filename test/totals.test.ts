import { describe, expect, it } from 'vitest';

import { normalizeConfig } from '../src/config/normalize';
import { buildPanels, TOTALS_PANEL_ID } from '../src/data/panels';
import type { Reading, Readings } from '../src/data/readings';
import { aggregateReadings } from '../src/data/totals';
import { resolveFormatLocale } from '../src/utils/format';
import { entity, states } from './helpers';

function reading(entityId: string, value: number, isAvailable = true): Reading {
  return { entityId, value: isAvailable ? value : undefined, isAvailable, unit: '' };
}

const MASTER: Readings = {
  pv_power: reading('sensor.deye_master_pv_power', 6.84),
  battery_soc: reading('sensor.deye_master_battery_soc', 82),
  battery_power: reading('sensor.deye_master_battery_power', -2.15),
  battery_voltage: reading('sensor.deye_master_battery_voltage', 54.9),
  battery_capacity_current: reading('number.deye_master_battery_capacity_current', 314),
  grid_l1_voltage: reading('sensor.deye_master_grid_l1_voltage', 238),
  radiator_temperature: reading('sensor.deye_master_radiator_temperature', 49.8),
};

const SLAVE: Readings = {
  pv_power: reading('sensor.deye_slave_pv_power', 6.21),
  battery_soc: reading('sensor.deye_slave_battery_soc', 78),
  battery_power: reading('sensor.deye_slave_battery_power', -1.98),
  battery_voltage: reading('sensor.deye_slave_battery_voltage', 54.7),
  battery_capacity_current: reading('number.deye_slave_battery_capacity_current', 200),
  grid_l1_voltage: reading('sensor.deye_slave_grid_l1_voltage', 237),
  radiator_temperature: reading('sensor.deye_slave_radiator_temperature', 47.2),
};

const MEMBERS = [
  { prefix: 'deye_master', readings: MASTER },
  { prefix: 'deye_slave', readings: SLAVE },
];

describe('aggregateReadings', () => {
  it('sums power across inverters', () => {
    const totals = aggregateReadings(MEMBERS, 'deye_master', true);

    expect(totals.pv_power?.value).toBeCloseTo(13.05);
    expect(totals.battery_power?.value).toBeCloseTo(-4.13);
  });

  it('takes shared battery values from the master in parallel mode', () => {
    const totals = aggregateReadings(MEMBERS, 'deye_master', true);

    expect(totals.battery_soc?.value).toBe(82);
    expect(totals.battery_voltage?.value).toBe(54.9);
    expect(totals.battery_capacity_current?.value).toBe(314);
  });

  it('averages shared values and pools capacity for independent batteries', () => {
    const totals = aggregateReadings(MEMBERS, 'deye_master', false);

    expect(totals.battery_soc?.value).toBe(80);
    expect(totals.battery_capacity_current?.value).toBe(514);
  });

  it('uses the selected master for grid voltages', () => {
    const totals = aggregateReadings(MEMBERS, 'deye_slave', true);

    expect(totals.grid_l1_voltage?.value).toBe(237);
  });

  it('marks a sum unavailable when one inverter is unavailable', () => {
    const slave = { ...SLAVE, pv_power: reading('sensor.deye_slave_pv_power', 0, false) };
    const totals = aggregateReadings(
      [MEMBERS[0], { prefix: 'deye_slave', readings: slave }],
      'deye_master',
      true,
    );

    expect(totals.pv_power?.isAvailable).toBe(false);
  });

  it('skips sensors that only one inverter has and keeps per-inverter temperatures out', () => {
    const totals = aggregateReadings(
      [MEMBERS[0], { prefix: 'deye_slave', readings: { pv_power: SLAVE.pv_power } }],
      'deye_master',
      true,
    );

    expect(totals.battery_power?.value).toBeCloseTo(-2.15);
    expect(totals.radiator_temperature).toBeUndefined();
  });
});

describe('buildPanels', () => {
  const locale = resolveFormatLocale(undefined);
  const hass = states(
    entity('sensor.deye_master_overall_state', 'ok'),
    entity('sensor.deye_master_fault', ''),
    entity('sensor.deye_master_load_power', 3570, 'W'),
    entity('sensor.deye_slave_overall_state', 'alarm'),
    entity('sensor.deye_slave_fault', 'F13 Working mode change'),
    entity('sensor.deye_slave_load_power', 3110, 'W'),
  );
  const rawConfig = {
    type: 'custom:deye-inverter-card',
    title: 'Home',
    inverters: [
      { prefix: 'deye_master', name: 'Master' },
      { prefix: 'deye_slave', name: 'Slave' },
    ],
  };
  const config = normalizeConfig(rawConfig);

  it('adds a combined panel with summed load and alarm count', () => {
    const panels = buildPanels(hass, config, locale);
    const totals = panels.find((panel) => panel.id === TOTALS_PANEL_ID);

    expect(panels).toHaveLength(3);
    expect(totals?.name).toBe('Home');
    expect(totals?.readings.load_power?.value).toBeCloseTo(6.68);
    expect(totals?.status.chip).toEqual({ label: '1 alarm', tone: 'warning' });
    expect(panels[1].status.line?.text).toBe('F13 Working mode change');
  });

  it('omits the combined panel when it is disabled', () => {
    const panels = buildPanels(hass, normalizeConfig({ ...rawConfig, show_totals: false }), locale);

    expect(panels.map((panel) => panel.id)).toEqual(['deye_master', 'deye_slave']);
  });
});
