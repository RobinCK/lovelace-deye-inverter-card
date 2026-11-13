import { html, nothing, type TemplateResult } from 'lit';

import { OUTAGE_WINDOW_MS } from '../../const';
import { gridFlow, gridPhases, gridPowerKey, gridVoltages } from '../../data/derived';
import type { PanelModel } from '../../data/panels';
import { valueOf } from '../../data/readings';
import type { DisplayMode } from '../../types/config';
import { formatClock, formatDuration, PLACEHOLDER } from '../../utils/format';
import type { RenderContext, TileRenderer } from '../types';
import {
  bidirectionalBars,
  caption,
  outageStrip,
  powerText,
  unavailableCaption,
  valueBlock,
  voltageCaption,
} from './parts';

const MS_PER_MINUTE = 60 * 1000;

function renderOffGrid(
  panel: PanelModel,
  ctx: RenderContext,
  display: DisplayMode,
): TemplateResult {
  const since = panel.master.readings.grid_connected?.lastChanged;
  const duration =
    since === undefined ? PLACEHOLDER : formatDuration((ctx.now - since) / MS_PER_MINUTE);
  const strip = outageStrip(
    ctx.history.outage(panel),
    ctx.now,
    OUTAGE_WINDOW_MS,
    ctx.locale,
    display,
  );

  if (display === 'compact') {
    return html`${valueBlock(duration, '', 'normal')} ${strip}`;
  }

  return html`<span class="value-row">
      ${valueBlock(duration, '', 'normal')}
      <span class="side-note warning">down</span>
    </span>
    ${strip}
    ${since === undefined ? caption(undefined) : caption(`since ${formatClock(since, ctx.locale)}`)}`;
}

function renderOnGrid(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult {
  const key = gridPowerKey(panel.readings);
  const power = key ? valueOf(panel.readings[key]) : undefined;
  const phases = gridPhases(panel.readings);
  const voltages = gridVoltages(panel.readings);
  const flow = gridFlow(power);
  const bars =
    phases.length > 0
      ? bidirectionalBars(phases, ctx.locale, display)
      : html`<span class="visual"></span>`;

  if (display === 'compact') {
    return html`${valueBlock(powerText(power, ctx.locale), 'kW', power === undefined ? 'disabled' : 'normal')}
    ${bars}`;
  }

  if (power === undefined) {
    return html`${valueBlock(powerText(undefined, ctx.locale), 'kW', 'disabled')} ${bars}
    ${unavailableCaption()}`;
  }

  return html`<span class="value-row">
      ${valueBlock(powerText(power, ctx.locale), 'kW')}
      ${flow ? html`<span class="side-note accent">${flow}</span>` : nothing}
    </span>
    ${bars}
    ${
      voltages.length > 0
        ? voltageCaption(
            voltages.map((voltage) => valueOf(voltage)),
            ctx.locale,
          )
        : caption(undefined)
    }`;
}

export const GRID_TILE: TileRenderer = {
  id: 'grid',
  label: 'Grid',
  icon: (panel) => (panel.status.isOffGrid ? 'gridOff' : 'grid'),
  isVisible: (panel) => gridPowerKey(panel.readings) !== undefined || panel.status.isOffGrid,

  primaryEntityId(panel: PanelModel): string | undefined {
    if (panel.status.isOffGrid) {
      return panel.master.readings.grid_connected?.entityId;
    }

    const key = gridPowerKey(panel.readings);

    return key ? panel.readings[key]?.entityId : undefined;
  },

  render(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult {
    return panel.status.isOffGrid
      ? renderOffGrid(panel, ctx, display)
      : renderOnGrid(panel, ctx, display);
  },
};
