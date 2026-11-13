import { html, nothing, type TemplateResult } from 'lit';

import {
  batteryEta,
  batteryFlow,
  socLevel,
  socThresholds,
  type BatteryEta,
  type BatteryFlow,
  type SocLevel,
  type SocThresholds,
} from '../../data/derived';
import type { PanelModel } from '../../data/panels';
import { formatReading, valueOf, type Readings } from '../../data/readings';
import type { DisplayMode } from '../../types/config';
import { formatDuration, formatNumber, type FormatLocale } from '../../utils/format';
import type { RenderContext, TileRenderer } from '../types';
import {
  batteryCells,
  caption,
  powerText,
  unavailableCaption,
  valueBlock,
  type ValueTone,
} from './parts';

export interface BatteryState {
  readonly soc?: number;
  readonly power?: number;
  readonly flow?: BatteryFlow;
  readonly level: SocLevel;
  readonly thresholds: SocThresholds;
  readonly eta?: BatteryEta;
}

const FLOW_TONES: Readonly<Record<BatteryFlow, string>> = {
  charging: 'ok',
  discharging: 'warning',
  idle: 'muted',
};

const LEVEL_TONES: Readonly<Record<SocLevel, ValueTone>> = {
  normal: 'normal',
  low: 'warning',
  critical: 'error',
};

export function batteryState(panel: PanelModel): BatteryState {
  const soc = valueOf(panel.readings.battery_soc);
  const power = valueOf(panel.readings.battery_power);
  const thresholds = socThresholds(panel.readings);

  return {
    soc,
    power,
    flow: batteryFlow(power),
    level: socLevel(soc, thresholds),
    thresholds,
    eta: panel.isWholeBattery ? batteryEta(panel.readings, thresholds) : undefined,
  };
}

export function flowText(state: BatteryState): string {
  if (state.eta) {
    const duration = formatDuration(state.eta.minutes);

    return state.eta.kind === 'full' ? `full in ${duration}` : `${duration} left`;
  }

  return state.flow ?? '';
}

export function flowTone(flow: BatteryFlow | undefined): string {
  return flow ? FLOW_TONES[flow] : 'muted';
}

function batteryCaption(readings: Readings, locale: FormatLocale): TemplateResult {
  const parts = [
    readings.battery_voltage
      ? `${formatReading('battery_voltage', readings.battery_voltage, locale)} V`
      : undefined,
    readings.battery_temperature
      ? `${formatReading('battery_temperature', readings.battery_temperature, locale)} ${readings.battery_temperature.unit}`
      : undefined,
  ].filter((part): part is string => part !== undefined);

  return caption(parts.join(' · '));
}

function powerBlock(state: BatteryState, locale: FormatLocale): TemplateResult | typeof nothing {
  if (state.power === undefined) {
    return nothing;
  }

  return html`<span class="side">
    <span class="side-value">${powerText(state.power, locale)} kW</span>
    <span class="side-note ${flowTone(state.flow)}" title=${flowText(state)}
      >${flowText(state)}</span
    >
  </span>`;
}

export const BATTERY_TILE: TileRenderer = {
  id: 'battery',
  label: 'Battery',
  icon: () => 'battery',
  isVisible: (panel) =>
    panel.readings.battery_soc !== undefined || panel.readings.battery_power !== undefined,
  primaryEntityId: (panel) =>
    (panel.readings.battery_soc ?? panel.readings.battery_power)?.entityId,

  render(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult {
    const state = batteryState(panel);
    const isActive = state.flow === 'charging' || state.flow === 'discharging';
    const socText = formatNumber(state.soc, 0, ctx.locale);
    const tone = state.soc === undefined ? 'disabled' : LEVEL_TONES[state.level];

    if (display === 'compact') {
      return html`${valueBlock(socText, '%', tone, 'percent')}
      ${batteryCells(state.soc, state.level, isActive)}`;
    }

    return html`<span class="value-row">
        ${valueBlock(socText, '%', tone, 'percent')} ${powerBlock(state, ctx.locale)}
      </span>
      ${batteryCells(state.soc, state.level, isActive)}
      ${
        state.soc === undefined && panel.readings.battery_soc
          ? unavailableCaption()
          : batteryCaption(panel.readings, ctx.locale)
      }`;
  },
};
