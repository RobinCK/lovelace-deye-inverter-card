import { html, LitElement, nothing, svg, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { SPARKLINE_BUCKETS, PV_STRINGS } from '../const';
import { pvPowerReading, pvSourceEntityIds, pvStringKeys } from '../data/derived';
import {
  HassHistoryAdapter,
  resampleMean,
  seriesMax,
  statesToValues,
  sumSeries,
  type Series,
  type TimedValue,
} from '../data/history';
import type { MemberModel, PanelModel } from '../data/panels';
import { formatReading, valueOf } from '../data/readings';
import { VALUE_FORMATS } from '../registry/formats';
import type { HomeAssistant } from '../types/ha';
import { formatNumber, resolveFormatLocale, type FormatLocale } from '../utils/format';
import { areaPath, niceScale, seriesToPoints, smoothPath, type Point } from '../utils/svg';
import {
  atHour,
  MS_PER_DAY,
  MS_PER_HOUR,
  positionIn,
  solarWindow,
  type TimeWindow,
} from '../utils/time';
import { themeTokens } from '../card/styles';
import {
  axisTicks,
  chartStatus,
  fireMoreInfo,
  orderedMembers,
  rangeToggle,
  timeAxis,
  type RangeOption,
} from './parts';
import { popupStyles } from './styles';

type SolarRange = 'today' | 'week';

interface StringRow {
  readonly member: MemberModel;
  readonly index: (typeof PV_STRINGS)[number];
  readonly power?: number;
}

interface SolarChart {
  readonly window: TimeWindow;
  readonly layers: readonly Series[];
}

const RANGES: readonly RangeOption<SolarRange>[] = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: '7 d' },
];

const WEEK_DAYS = 7;
const WIDTH = 512;
const HEIGHT = 160;
const TOP = 8;
const BASE = 152;
const DIVISIONS = 3;
const TODAY_TICK_HOURS = 3;
const WEEK_TICK_HOURS = 24;
const LAYER_OPACITY = ['36%', '26%', '18%', '12%'] as const;

function rangeWindow(range: SolarRange, now: number): TimeWindow {
  if (range === 'today') {
    return solarWindow(now);
  }

  return { start: atHour(now - (WEEK_DAYS - 1) * MS_PER_DAY, 0), end: now };
}

function bucketCount(range: SolarRange, window: TimeWindow): number {
  return range === 'today'
    ? SPARKLINE_BUCKETS
    : Math.ceil((window.end - window.start) / MS_PER_HOUR);
}

export class DeyeSolarPopupBody extends LitElement {
  static override styles = [themeTokens, popupStyles];

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @property({ attribute: false }) accessor panel: PanelModel | undefined;

  @state() private accessor range: SolarRange = 'today';

  @state() private accessor chart: SolarChart | undefined;

  @state() private accessor isLoading = true;

  private loadedKey = '';

  protected override willUpdate(changed: PropertyValues): void {
    if (!this.hass || !this.panel || !(changed.has('range') || changed.has('panel'))) {
      return;
    }

    const key = `${this.range}|${this.memberIds(this.panel).join(',')}`;

    if (key === this.loadedKey) {
      return;
    }

    this.loadedKey = key;
    void this.load(this.hass, this.panel, this.range, key);
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.panel) {
      return nothing;
    }

    const locale = resolveFormatLocale(this.hass.locale, this.hass.language);
    const members = orderedMembers(this.panel);

    return html`${this.renderHero(this.panel, members, locale)}
      <section class="section">
        <div class="section-head">
          <h3>${RANGES.find((option) => option.id === this.range)?.label}</h3>
          ${members.length > 1 ? members.map((member, index) => this.renderLegend(member, index)) : nothing}
          ${rangeToggle(RANGES, this.range, (range) => (this.range = range))}
        </div>
        ${this.renderChart(this.panel, locale)}
      </section>
      ${this.renderStrings(members, locale)}`;
  }

  private memberIds(panel: PanelModel): string[] {
    return orderedMembers(panel).map((member) => pvSourceEntityIds(member.readings).join('+'));
  }

  private async load(
    hass: HomeAssistant,
    panel: PanelModel,
    range: SolarRange,
    key: string,
  ): Promise<void> {
    const now = Date.now();
    const window = rangeWindow(range, now);
    const members = orderedMembers(panel);
    const entityIds = members.flatMap((member) => pvSourceEntityIds(member.readings));
    const source = new HassHistoryAdapter(hass);

    this.isLoading = true;

    try {
      const history: Record<string, TimedValue[]> =
        range === 'today'
          ? Object.fromEntries(
              Object.entries(
                await source.fetchStates(entityIds, window.start, Math.min(now, window.end)),
              ).map(([entityId, states]) => [entityId, statesToValues(states, (raw) => raw)]),
            )
          : await source.fetchHourlyMeans(entityIds, window.start, window.end);

      if (key !== this.loadedKey) {
        return;
      }

      const buckets = bucketCount(range, window);
      const memberSeries = members.map((member) =>
        sumSeries(
          pvSourceEntityIds(member.readings).map((entityId) => {
            const scale = VALUE_FORMATS.power.scale(
              hass.states[entityId]?.attributes.unit_of_measurement,
            );
            const values = (history[entityId] ?? []).map((point) => ({
              ...point,
              value: point.value * scale,
            }));

            return resampleMean(values, window.start, window.end, buckets, now);
          }),
        ),
      );

      this.chart = {
        window,
        layers: memberSeries.map((_, index) => sumSeries(memberSeries.slice(0, index + 1))),
      };
    } catch {
      this.chart = undefined;
    }

    this.isLoading = false;
  }

  private renderHero(
    panel: PanelModel,
    members: readonly MemberModel[],
    locale: FormatLocale,
  ): TemplateResult {
    const power = valueOf(pvPowerReading(panel.readings));
    const energy = panel.readings.day_pv_energy;
    const breakdown = members
      .filter((member) => member.readings.day_pv_energy)
      .map(
        (member) =>
          `${member.name} ${formatReading('day_pv_energy', member.readings.day_pv_energy, locale)}`,
      )
      .join(' · ');

    return html`<div class="hero">
      <span class="hero-value"
        ><span class="number">${formatNumber(power, 2, locale)}</span
        ><span class="unit">kW</span></span
      >
      ${
        energy
          ? html`<span class="hero-side">
              <span class="hero-main"
                >${formatReading('day_pv_energy', energy, locale)}
                <small>${energy.unit} today</small></span
              >
              ${members.length > 1 ? html`<span class="hero-note">${breakdown}</span>` : nothing}
            </span>`
          : nothing
      }
    </div>`;
  }

  private renderLegend(member: MemberModel, index: number): TemplateResult {
    const opacity = LAYER_OPACITY[Math.min(index, LAYER_OPACITY.length - 1)];

    return html`<span class="legend"
      ><span
        class="swatch"
        style=${styleMap({
          background: `color-mix(in srgb, var(--deye-solar-color) ${opacity}, transparent)`,
        })}
      ></span
      >${member.name}</span
    >`;
  }

  private renderChart(panel: PanelModel, locale: FormatLocale): TemplateResult {
    if (!this.chart || (this.isLoading && this.chart.layers.length === 0)) {
      return chartStatus(this.isLoading);
    }

    const { window, layers } = this.chart;
    const now = Date.now();
    const total = layers.at(-1) ?? [];
    const live = valueOf(pvPowerReading(panel.readings));
    const scale = niceScale(Math.max(seriesMax([total]), live ?? 0), DIVISIONS);
    const toY = (value: number): number => BASE - (Math.max(0, value) / scale.max) * (BASE - TOP);
    const toPoints = (series: Series): Point[] =>
      seriesToPoints(series, (index) => (index / series.length) * WIDTH, toY);
    const isToday = this.range === 'today';
    const xNow = positionIn(window, now) * WIDTH;
    const ticks = axisTicks(window, isToday ? TODAY_TICK_HOURS : WEEK_TICK_HOURS, locale);
    const totalPoints = toPoints(total);

    return html`<svg
        class="chart"
        viewBox="0 0 ${WIDTH} ${HEIGHT}"
        role="img"
        aria-label="Solar production"
      >
        ${Array.from({ length: DIVISIONS + 1 }, (_, index) => {
          const y = TOP + ((BASE - TOP) / DIVISIONS) * index;
          const value = scale.max - scale.step * index;

          return svg`<line class=${index === DIVISIONS ? 'base-line' : 'grid-line'} x1="0" y1=${y} x2=${WIDTH} y2=${y}></line>
            ${index < DIVISIONS ? svg`<text x=${WIDTH - 4} y=${y + 12} text-anchor="end">${formatNumber(value, 0, locale)}${index === 0 ? ' kW' : ''}</text>` : nothing}`;
        })}
        ${[...layers].reverse().map((layer, reversedIndex) => {
          const index = layers.length - 1 - reversedIndex;
          const opacity = LAYER_OPACITY[Math.min(index, LAYER_OPACITY.length - 1)];

          return svg`<path d=${areaPath(toPoints(layer), BASE, TOP)} style=${`fill: color-mix(in srgb, var(--deye-solar-color) ${opacity}, transparent)`}></path>`;
        })}
        ${layers
          .slice(0, -1)
          .map(
            (layer) =>
              svg`<path d=${smoothPath(toPoints(layer), TOP, BASE)} fill="none" stroke-width="1" style="stroke: color-mix(in srgb, var(--deye-solar-color) 70%, transparent)"></path>`,
          )}
        <path
          d=${smoothPath(totalPoints, TOP, BASE)}
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          style="stroke: var(--deye-solar-color)"
        ></path>
        ${
          isToday && now > window.start && now < window.end
            ? svg`<line x1=${xNow} y1=${TOP} x2=${xNow} y2=${BASE} stroke-dasharray="2 3" style="stroke: color-mix(in srgb, var(--primary-text-color) 35%, transparent)"></line>
            <circle cx=${xNow} cy=${toY(live ?? 0)} r="4.5" stroke-width="2.5" style="fill: var(--deye-solar-color); stroke: var(--ha-card-background, var(--card-background-color))"></circle>
            <text x=${xNow + 6} y=${TOP + 10}>now</text>`
            : nothing
        }
      </svg>
      ${timeAxis(ticks, !isToday)}`;
  }

  private renderStrings(
    members: readonly MemberModel[],
    locale: FormatLocale,
  ): TemplateResult | typeof nothing {
    const rows: StringRow[] = members.flatMap((member) =>
      PV_STRINGS.flatMap((index) => {
        const reading = member.readings[pvStringKeys(index).power];

        return reading ? [{ member, index, power: valueOf(reading) }] : [];
      }),
    );

    if (rows.length === 0) {
      return nothing;
    }

    const best = Math.max(0, ...rows.map((row) => row.power ?? 0));
    const columns = 'minmax(0, 1fr) 56px 64px 48px 96px';

    return html`<section class="section">
      <div class="row-head" style=${styleMap({ gridTemplateColumns: columns })}>
        <span>String</span><span class="num muted">kW</span><span class="num muted">V</span
        ><span class="num muted">A</span><span class="num muted">vs. best</span>
      </div>
      <div class="rows">
        ${rows.map((row) => this.renderStringRow(row, members.length > 1, best, columns, locale))}
      </div>
    </section>`;
  }

  private renderStringRow(
    row: StringRow,
    hasUnit: boolean,
    best: number,
    columns: string,
    locale: FormatLocale,
  ): TemplateResult {
    const keys = pvStringKeys(row.index);
    const readings = row.member.readings;
    const share = best > 0 ? Math.round(((row.power ?? 0) / best) * 100) : 0;

    return html`<button
      type="button"
      class="row"
      style=${styleMap({ gridTemplateColumns: columns, '--share-color': 'var(--deye-solar-color)' })}
      @click=${(event: Event) => fireMoreInfo(event.currentTarget, readings[keys.power]?.entityId)}
    >
      <span class="cell-text"
        >${hasUnit ? html`<span class="cell-muted">${row.member.name} · </span>` : nothing}PV${row.index}</span
      >
      <span class="num">${formatReading(keys.power, readings[keys.power], locale)}</span>
      <span class="num">${formatReading(keys.voltage, readings[keys.voltage], locale)}</span>
      <span class="num">${formatReading(keys.current, readings[keys.current], locale)}</span>
      <span class="share"><span style=${styleMap({ width: `${share}%` })}></span></span>
    </button>`;
  }
}
