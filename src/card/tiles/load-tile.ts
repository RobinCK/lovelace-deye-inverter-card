import { html, type TemplateResult } from 'lit';

import { loadPhases } from '../../data/derived';
import type { PanelModel } from '../../data/panels';
import { formatReading, valueOf } from '../../data/readings';
import type { DisplayMode } from '../../types/config';
import type { RenderContext, TileRenderer } from '../types';
import { caption, levelBars, powerText, unavailableCaption, valueBlock } from './parts';

function loadCaption(panel: PanelModel, ctx: RenderContext): TemplateResult {
  const energy = panel.readings.day_load_energy;

  if (!energy) {
    return caption(undefined);
  }

  return caption(`${formatReading('day_load_energy', energy, ctx.locale)} ${energy.unit} today`);
}

export const LOAD_TILE: TileRenderer = {
  id: 'load',
  label: 'Load',
  icon: () => 'home',
  isVisible: (panel) => panel.readings.load_power !== undefined,
  primaryEntityId: (panel) => panel.readings.load_power?.entityId,

  render(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult {
    const power = valueOf(panel.readings.load_power);
    const phases = loadPhases(panel.readings);
    const bars =
      phases.length > 0
        ? levelBars(phases, ctx.locale, display)
        : html`<span class="visual"></span>`;
    const value = valueBlock(
      powerText(power, ctx.locale),
      'kW',
      power === undefined ? 'disabled' : 'normal',
    );

    if (display === 'compact') {
      return html`${value} ${bars}`;
    }

    return html`${value} ${bars}
    ${power === undefined ? unavailableCaption() : loadCaption(panel, ctx)}`;
  },
};
