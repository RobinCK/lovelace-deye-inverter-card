import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { PanelModel } from '../data/panels';
import { formatReading, type Reading } from '../data/readings';
import { getSensorDefinition, type SensorKey } from '../registry/sensors';
import { formatClock, formatWeekday, PLACEHOLDER, type FormatLocale } from '../utils/format';
import { localTicks, positionIn, type TimeWindow } from '../utils/time';
import { icon } from '../card/icons';

export interface RangeOption<T extends string> {
  readonly id: T;
  readonly label: string;
}

export interface AxisTick {
  readonly x: number;
  readonly label: string;
}

const NOW_GAP = 0.1;
const DAILY_STEP_HOURS = 24;

export function fireMoreInfo(target: EventTarget | null, entityId: string | undefined): void {
  if (!target || !entityId) {
    return;
  }

  target.dispatchEvent(
    new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }),
  );
}

export function rangeToggle<T extends string>(
  options: readonly RangeOption<T>[],
  active: T,
  onSelect: (id: T) => void,
): TemplateResult {
  return html`<div class="range" role="group" aria-label="Range">
    ${options.map(
      (option) =>
        html`<button
          type="button"
          aria-pressed=${option.id === active ? 'true' : 'false'}
          @click=${() => onSelect(option.id)}
        >
          ${option.label}
        </button>`,
    )}
  </div>`;
}

export function chartStatus(isLoading: boolean): TemplateResult {
  return html`<div class=${isLoading ? 'chart-status loading' : 'chart-status'}>
    ${isLoading ? 'loading history…' : 'no history'}
  </div>`;
}

export function axisTicks(window: TimeWindow, stepHours: number, locale: FormatLocale): AxisTick[] {
  const format = stepHours >= DAILY_STEP_HOURS ? formatWeekday : formatClock;

  return localTicks(window, stepHours).map((time) => ({
    x: positionIn(window, time),
    label: format(time, locale),
  }));
}

export function timeAxis(ticks: readonly AxisTick[], hasNow: boolean): TemplateResult {
  return html`<div class="chart-axis">
    ${ticks
      .filter((tick) => !hasNow || tick.x < 1 - NOW_GAP)
      .map(
        (tick) =>
          html`<span style=${styleMap({ left: `${(tick.x * 100).toFixed(2)}%` })}
            >${tick.label}</span
          >`,
      )}
    ${hasNow ? html`<span class="now">now</span>` : nothing}
  </div>`;
}

export function statTile(
  label: string,
  key: SensorKey,
  reading: Reading | undefined,
  source: string,
  locale: FormatLocale,
): TemplateResult | typeof nothing {
  if (!reading) {
    return nothing;
  }

  const value = formatReading(key, reading, locale);

  return html`<button
    type="button"
    class="stat"
    @click=${(event: Event) => fireMoreInfo(event.currentTarget, reading.entityId)}
  >
    <span class="stat-head"><span>${label}</span>${icon('chart', 12)}</span>
    <span class="stat-value"
      >${value}${value === PLACEHOLDER ? nothing : html` <small>${reading.unit}</small>`}</span
    >
    <span class="stat-source">${source}</span>
  </button>`;
}

export function sourceLabel(panel: PanelModel, key: SensorKey): string {
  if (panel.kind === 'inverter') {
    return panel.name;
  }

  const count = panel.members.length;
  const aggregate = getSensorDefinition(key).aggregate;

  if (aggregate === 'sum') {
    return `Sum of ${count}`;
  }

  if (aggregate === 'master' || panel.isParallel) {
    return panel.master.name;
  }

  return aggregate === 'shared' ? `Average of ${count}` : `Sum of ${count}`;
}

export function orderedMembers(panel: PanelModel): PanelModel['members'] {
  return [panel.master, ...panel.members.filter((member) => member !== panel.master)];
}
