import { html, nothing, type TemplateResult } from 'lit';

import { IDLE_POWER_KW } from '../../const';
import { pvPowerReading } from '../../data/derived';
import type { PanelModel } from '../../data/panels';
import { formatReading, valueOf } from '../../data/readings';
import type { DisplayMode } from '../../types/config';
import type { RenderContext, TileRenderer } from '../types';
import { caption, powerText, sparkline, unavailableCaption, valueBlock } from './parts';

function solarCaption(panel: PanelModel, ctx: RenderContext, isLoading: boolean): TemplateResult {
  if (isLoading) {
    return caption('loading history…');
  }

  const energy = panel.readings.day_pv_energy;

  if (!energy) {
    return caption(undefined);
  }

  return caption(`${formatReading('day_pv_energy', energy, ctx.locale)} ${energy.unit} today`);
}

export const SOLAR_TILE: TileRenderer = {
  id: 'pv',
  label: 'Solar',
  icon: () => 'sun',
  isVisible: (panel) => pvPowerReading(panel.readings) !== undefined,
  primaryEntityId: (panel) => pvPowerReading(panel.readings)?.entityId,

  render(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult {
    const reading = pvPowerReading(panel.readings);
    const power = valueOf(reading);
    const view = ctx.history.sparkline(panel);
    const liveFront =
      panel.kind === 'totals' ? valueOf(pvPowerReading(panel.master.readings)) : undefined;

    if (power === undefined) {
      return html`${valueBlock(powerText(undefined, ctx.locale), 'kW', 'disabled')}
        <span class="visual"></span>
        ${display === 'detailed' ? unavailableCaption() : nothing}`;
    }

    const tone = power < IDLE_POWER_KW ? 'muted' : 'normal';

    return html`${valueBlock(powerText(power, ctx.locale), 'kW', tone)}
    ${sparkline(view, power, liveFront, ctx.now, display)}
    ${display === 'detailed' ? solarCaption(panel, ctx, view.status === 'loading') : nothing}`;
  },
};
