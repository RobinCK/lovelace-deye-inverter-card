import { html, nothing, svg, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { isVoltageOutOfRange, type PhaseReading, type SocLevel } from '../../data/derived';
import { formatReading, valueOf } from '../../data/readings';
import type { Series } from '../../data/history';
import type { DisplayMode } from '../../types/config';
import { formatClock, formatNumber, PLACEHOLDER, type FormatLocale } from '../../utils/format';
import { areaPath, niceScale, seriesToPoints, smoothPath, type Point } from '../../utils/svg';
import { localTicks, positionIn, solarWindow, type TimeWindow } from '../../utils/time';
import { icon } from '../icons';
import type { OutageView, SparklineView } from '../types';

export type ValueTone = 'normal' | 'muted' | 'disabled' | 'warning' | 'error';

const SEGMENTS = 10;
const SPARKLINE_TOP = 2;
const OUTAGE_TICK_HOURS = 12;
const MIN_TICK_GAP = 0.14;
const POWER_DECIMALS = 2;

export function valueBlock(
  number: string,
  unit: string,
  tone: ValueTone = 'normal',
  variant = '',
): TemplateResult {
  return html`<span class="value ${tone} ${variant}"
    ><span class="number">${number}</span><span class="unit">${unit}</span></span
  >`;
}

export function caption(content: TemplateResult | string | undefined): TemplateResult {
  return html`<span class="caption">${content ?? nothing}</span>`;
}

export function unavailableCaption(): TemplateResult {
  return caption(html`${icon('info', 12)}<span>unavailable</span>`);
}

export function skeleton(display: DisplayMode): TemplateResult {
  if (display === 'compact') {
    return html`<span class="visual skeleton"><span class="bone wide"></span></span>`;
  }

  return html`<span class="visual skeleton"
    ><span class="bone short"></span><span class="bone tall"></span
  ></span>`;
}

export function batteryCells(
  soc: number | undefined,
  level: SocLevel,
  isActive: boolean,
): TemplateResult {
  const filled = soc ?? 0;
  const activeIndex = Math.min(SEGMENTS - 1, Math.floor(filled / SEGMENTS));

  return html`<span class="battery-visual level-${level}"
    ><span class="cells"
      >${Array.from({ length: SEGMENTS }, (_, index) => {
        const ratio = Math.max(0, Math.min(1, filled / SEGMENTS - index));
        const isBreathing = isActive && soc !== undefined && index === activeIndex;

        return html`<span class="cell"
          ><span
            class=${isBreathing ? 'fill breathing' : 'fill'}
            style=${styleMap({ width: `${Math.round(ratio * 100)}%` })}
          ></span
        ></span>`;
      })}</span
    ><span class="nub"></span
  ></span>`;
}

function phaseTitle(phase: PhaseReading, locale: FormatLocale): string {
  const power = formatReading(phase.powerKey, phase.power, locale, { isAbsolute: true });
  const voltage = phase.voltage ? ` · ${formatNumber(valueOf(phase.voltage), 0, locale)} V` : '';

  return `L${phase.phase} · ${power} kW${voltage}`;
}

function barScale(phases: readonly PhaseReading[]): number {
  return Math.max(1, ...phases.map((phase) => Math.abs(valueOf(phase.power) ?? 0)));
}

function percent(value: number, scale: number): string {
  return `${Math.round((Math.abs(value) / scale) * 100)}%`;
}

function phaseLabel(phase: PhaseReading, locale: FormatLocale, isCompact: boolean): TemplateResult {
  if (isCompact) {
    return html``;
  }

  const isWarning = isVoltageOutOfRange(valueOf(phase.voltage));
  const value = formatReading(phase.powerKey, phase.power, locale, { isAbsolute: true });

  return html`<span class="phase-label"
    ><span class=${isWarning ? 'phase-name warning' : 'phase-name'}>L${phase.phase}</span>
    ${value}</span
  >`;
}

export function bidirectionalBars(
  phases: readonly PhaseReading[],
  locale: FormatLocale,
  display: DisplayMode,
): TemplateResult {
  const scale = barScale(phases);
  const isCompact = display === 'compact';

  return html`<span class="visual phases">
    ${phases.map((phase) => {
      const value = valueOf(phase.power);

      if (value === undefined) {
        return placeholderBar(phase, isCompact);
      }

      return html`<span class="phase" title=${phaseTitle(phase, locale)}>
        <span class="bidi">
          <span class="half up"
            ><span
              class="bar"
              style=${styleMap({ height: value > 0 ? percent(value, scale) : '0%' })}
            ></span
          ></span>
          <span class="axis"></span>
          <span class="half down"
            ><span
              class="bar"
              style=${styleMap({ height: value < 0 ? percent(value, scale) : '0%' })}
            ></span
          ></span>
        </span>
        ${phaseLabel(phase, locale, isCompact)}
      </span>`;
    })}
  </span>`;
}

export function levelBars(
  phases: readonly PhaseReading[],
  locale: FormatLocale,
  display: DisplayMode,
): TemplateResult {
  const scale = barScale(phases);
  const isCompact = display === 'compact';

  return html`<span class="visual phases">
    ${phases.map((phase) => {
      const value = valueOf(phase.power);

      if (value === undefined) {
        return placeholderBar(phase, isCompact);
      }

      return html`<span class="phase" title=${phaseTitle(phase, locale)}>
        <span class="track"
          ><span
            class="bar"
            style=${styleMap({ height: percent(Math.max(0, value), scale) })}
          ></span
        ></span>
        ${phaseLabel(phase, locale, isCompact)}
      </span>`;
    })}
  </span>`;
}

function placeholderBar(phase: PhaseReading, isCompact: boolean): TemplateResult {
  return html`<span class="phase">
    <span class="track placeholder"></span>
    ${
      isCompact
        ? nothing
        : html`<span class="phase-label muted">L${phase.phase} ${PLACEHOLDER}</span>`
    }
  </span>`;
}

export function voltageCaption(
  voltages: readonly (number | undefined)[],
  locale: FormatLocale,
): TemplateResult {
  const hasWarning = voltages.some((voltage) => isVoltageOutOfRange(voltage));
  const parts = voltages.map((voltage, index) => {
    const separator = index > 0 ? ' · ' : '';
    const text = formatNumber(voltage, 0, locale);

    return isVoltageOutOfRange(voltage)
      ? html`${separator}<span class="warning">${text}</span>`
      : html`${separator}${text}`;
  });

  return caption(
    html`${hasWarning ? icon('warning', 12, 'warning') : nothing}<span>${parts} V</span>`,
  );
}

function sparkGeometry(display: DisplayMode): { readonly height: number; readonly base: number } {
  const height = display === 'compact' ? 22 : 52;

  return { height, base: height - 2 };
}

function toSparkPoints(
  series: Series,
  live: number | undefined,
  window: TimeWindow,
  now: number,
  scale: number,
  base: number,
): Point[] {
  const toY = (value: number): number =>
    base - (Math.max(0, value) / scale) * (base - SPARKLINE_TOP);
  const xNow = positionIn(window, now) * 100;
  const points = seriesToPoints(series, (index) => (index / series.length) * 100, toY).filter(
    ([x]) => x < xNow,
  );

  if (now <= window.start) {
    return points;
  }

  return [...points, [xNow, toY(live ?? 0)]];
}

export function sparkline(
  view: SparklineView,
  live: number | undefined,
  liveFront: number | undefined,
  now: number,
  display: DisplayMode,
): TemplateResult {
  if (view.status === 'loading') {
    return skeleton(display);
  }

  const { height, base } = sparkGeometry(display);
  const window = solarWindow(now);
  const peak = Math.max(
    live ?? 0,
    ...view.back.filter((value): value is number => value !== undefined),
  );
  const scale = niceScale(peak, 4).max;
  const back = toSparkPoints(view.back, live, window, now, scale, base);
  const front = view.front ? toSparkPoints(view.front, liveFront, window, now, scale, base) : [];
  const xNow = positionIn(window, now) * 100;
  const yNow = back.at(-1)?.[1] ?? base;
  const isProducing = (live ?? 0) > 0;

  return html`<span class="visual sparkline">
    <svg
      width="100%"
      height=${height}
      viewBox="0 0 100 ${height}"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      ${svg`<line class="baseline" x1="0" y1=${base + 0.5} x2="100" y2=${base + 0.5}></line>
      <path class=${view.front ? 'area back stacked' : 'area back'} d=${areaPath(back, base, SPARKLINE_TOP)}></path>
      <path class="area front" d=${areaPath(front, base, SPARKLINE_TOP)}></path>
      <path class="line" d=${smoothPath(back, SPARKLINE_TOP, base)}></path>`}
    </svg>
    <span
      class=${isProducing ? 'dot live' : 'dot'}
      style=${styleMap({ left: `${xNow.toFixed(2)}%`, top: `${((yNow / height) * 100).toFixed(2)}%` })}
    ></span>
  </span>`;
}

export function outageStrip(
  view: OutageView,
  now: number,
  windowMs: number,
  locale: FormatLocale,
  display: DisplayMode,
): TemplateResult {
  if (view.status === 'loading') {
    return skeleton(display);
  }

  const window: TimeWindow = { start: now - windowMs, end: now };
  const ticks = localTicks(window, OUTAGE_TICK_HOURS)
    .map((time) => ({ time, x: positionIn(window, time) }))
    .filter((tick) => tick.x < 1 - MIN_TICK_GAP);

  return html`<span class="visual outage">
    <span
      class="strip"
      style=${styleMap({ gridTemplateColumns: `repeat(${view.slots.length}, minmax(0, 1fr))` })}
      >${view.slots.map((isDown) => html`<span class=${isDown ? 'slot down' : 'slot'}></span>`)}</span
    >
    ${
      display === 'compact'
        ? nothing
        : html`<span class="strip-axis">
            ${ticks.map(
              (tick) =>
                html`<span class="tick" style=${styleMap({ left: `${(tick.x * 100).toFixed(2)}%` })}
                  >${formatClock(tick.time, locale)}</span
                >`,
            )}
            <span class="tick now">now</span>
          </span>`
    }
  </span>`;
}

export function powerText(value: number | undefined, locale: FormatLocale): string {
  return formatNumber(value === undefined ? undefined : Math.abs(value), POWER_DECIMALS, locale);
}
