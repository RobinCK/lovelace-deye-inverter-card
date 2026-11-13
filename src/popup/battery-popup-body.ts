import { html, LitElement, nothing, svg, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { icon } from '../card/icons';
import { themeTokens, cardStyles } from '../card/styles';
import { batteryState, flowTone, type BatteryState } from '../card/tiles/battery-tile';
import { batteryCells } from '../card/tiles/parts';
import {
  HassHistoryAdapter,
  resampleMean,
  statesToValues,
  sumSeries,
  type Series,
  type TimedValue,
} from '../data/history';
import type { MemberModel, PanelModel } from '../data/panels';
import { formatReading, normalizeValue, valueOf } from '../data/readings';
import type { ResolvedConfig } from '../types/config';
import type { HomeAssistant } from '../types/ha';
import {
  capitalize,
  formatDuration,
  formatNumber,
  resolveFormatLocale,
  type FormatLocale,
} from '../utils/format';
import { areaPath, seriesToPoints, smoothPath } from '../utils/svg';
import { MS_PER_HOUR, type TimeWindow } from '../utils/time';
import {
  axisTicks,
  chartStatus,
  fireMoreInfo,
  orderedMembers,
  rangeToggle,
  sourceLabel,
  statTile,
  timeAxis,
  type RangeOption,
} from './parts';
import { popupStyles } from './styles';

type BatteryRange = '6h' | '24h' | '7d';

interface BatteryRangeOption extends RangeOption<BatteryRange> {
  readonly hours: number;
  readonly tickHours: number;
}

interface BatteryChart {
  readonly window: TimeWindow;
  readonly soc: Series;
  readonly power: Series;
}

const RANGES: readonly BatteryRangeOption[] = [
  { id: '6h', label: '6 h', hours: 6, tickHours: 1 },
  { id: '24h', label: '24 h', hours: 24, tickHours: 6 },
  { id: '7d', label: '7 d', hours: 168, tickHours: 24 },
];

const STATISTICS_MIN_HOURS = 48;
const SOC_POINTS = 96;
const POWER_BARS = 48;
const WIDTH = 512;
const SOC_HEIGHT = 120;
const SOC_TOP = 8;
const SOC_BASE = 112;
const BAR_HEIGHT = 48;
const BAR_ZERO = 24;
const BAR_SPAN = 22;
const BAR_WIDTH = 7;
const MIN_BAR_SCALE_KW = 1;

function socY(soc: number): number {
  return SOC_BASE - (Math.min(100, Math.max(0, soc)) / 100) * (SOC_BASE - SOC_TOP);
}

function socSourceIds(panel: PanelModel): string[] {
  if (panel.kind === 'inverter' || panel.isParallel) {
    const entityId = panel.master.readings.battery_soc?.entityId;

    return entityId ? [entityId] : [];
  }

  return panel.members.flatMap((member) => member.readings.battery_soc?.entityId ?? []);
}

function powerSourceIds(panel: PanelModel): string[] {
  return panel.members.flatMap((member) => member.readings.battery_power?.entityId ?? []);
}

function etaText(battery: BatteryState): string | undefined {
  if (!battery.eta) {
    return undefined;
  }

  const duration = formatDuration(battery.eta.minutes);

  return battery.eta.kind === 'full' ? `full in ≈ ${duration}` : `≈ ${duration} left`;
}

function meanSeries(series: readonly Series[]): Series {
  return sumSeries(series).map((value) =>
    value === undefined ? undefined : value / series.length,
  );
}

export class DeyeBatteryPopupBody extends LitElement {
  static override styles = [themeTokens, cardStyles, popupStyles];

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @property({ attribute: false }) accessor panel: PanelModel | undefined;

  @property({ attribute: false }) accessor config: ResolvedConfig | undefined;

  @state() private accessor range: BatteryRange = '24h';

  @state() private accessor chart: BatteryChart | undefined;

  @state() private accessor isLoading = true;

  private loadedKey = '';

  protected override willUpdate(changed: PropertyValues): void {
    if (
      !this.hass ||
      !this.panel ||
      !this.config ||
      !(changed.has('range') || changed.has('panel'))
    ) {
      return;
    }

    const key = `${this.range}|${socSourceIds(this.panel).join(',')}|${powerSourceIds(this.panel).join(',')}`;

    if (key === this.loadedKey) {
      return;
    }

    this.loadedKey = key;
    void this.load(this.hass, this.panel, this.config, key);
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.panel) {
      return nothing;
    }

    const locale = resolveFormatLocale(this.hass.locale, this.hass.language);
    const battery = batteryState(this.panel);
    const isActive = battery.flow === 'charging' || battery.flow === 'discharging';

    return html`${this.renderHero(battery, locale)}
      <div class="big-cells">${batteryCells(battery.soc, battery.level, isActive)}</div>
      <section class="section">
        <div class="section-head">
          <h3>History</h3>
          ${rangeToggle(RANGES, this.range, (range) => {
            this.range = range;
          })}
        </div>
        ${this.renderCharts(battery, locale)}
      </section>
      ${this.renderStats(this.panel, locale)} ${this.renderMembers(this.panel, locale)}`;
  }

  private async load(
    hass: HomeAssistant,
    panel: PanelModel,
    config: ResolvedConfig,
    key: string,
  ): Promise<void> {
    const option = RANGES.find((candidate) => candidate.id === this.range) ?? RANGES[1];
    const now = Date.now();
    const window: TimeWindow = { start: now - option.hours * MS_PER_HOUR, end: now };
    const socIds = socSourceIds(panel);
    const powerIds = powerSourceIds(panel);
    const entityIds = [...socIds, ...powerIds];
    const source = new HassHistoryAdapter(hass);

    this.isLoading = true;

    try {
      const history: Record<string, TimedValue[]> =
        option.hours < STATISTICS_MIN_HOURS
          ? Object.fromEntries(
              Object.entries(await source.fetchStates(entityIds, window.start, window.end)).map(
                ([entityId, states]) => [entityId, statesToValues(states, (raw) => raw)],
              ),
            )
          : await source.fetchHourlyMeans(entityIds, window.start, window.end);

      if (key !== this.loadedKey) {
        return;
      }

      const socPoints = option.hours < STATISTICS_MIN_HOURS ? SOC_POINTS : option.hours;
      const power = powerIds.map((entityId) => {
        const unit = hass.states[entityId]?.attributes.unit_of_measurement;
        const values = (history[entityId] ?? []).map((point) => ({
          ...point,
          value: normalizeValue('battery_power', point.value, unit, config.invert),
        }));

        return resampleMean(values, window.start, window.end, POWER_BARS, now);
      });

      this.chart = {
        window,
        soc: meanSeries(
          socIds.map((entityId) =>
            resampleMean(history[entityId] ?? [], window.start, window.end, socPoints, now),
          ),
        ),
        power: sumSeries(power),
      };
    } catch {
      this.chart = undefined;
    }

    this.isLoading = false;
  }

  private renderHero(battery: BatteryState, locale: FormatLocale): TemplateResult {
    const tone = flowTone(battery.flow);
    const eta = etaText(battery);

    return html`<div class="hero">
      <span class="hero-value percent"
        ><span class="number">${formatNumber(battery.soc, 0, locale)}</span
        ><span class="unit">%</span></span
      >
      ${
        battery.power === undefined
          ? nothing
          : html`<span class="hero-side">
              <span class="hero-status ${tone}"
                >${battery.flow === 'charging' ? icon('bolt', 14) : nothing}${capitalize(battery.flow ?? '')}</span
              >
              <span class="hero-main"
                >${formatNumber(Math.abs(battery.power), 2, locale)} <small>kW</small></span
              >
              ${eta ? html`<span class="hero-note">${eta}</span>` : nothing}
            </span>`
      }
    </div>`;
  }

  private renderCharts(battery: BatteryState, locale: FormatLocale): TemplateResult {
    if (!this.chart || (this.isLoading && this.chart.soc.length === 0)) {
      return chartStatus(this.isLoading);
    }

    const { window, soc, power } = this.chart;
    const option = RANGES.find((candidate) => candidate.id === this.range) ?? RANGES[1];
    const ticks = axisTicks(window, option.tickHours, locale);
    const points = seriesToPoints(soc, (index) => (index / soc.length) * WIDTH, socY);
    const live = battery.soc;
    const linePoints = live === undefined ? points : [...points, [WIDTH, socY(live)] as const];

    return html`<svg
        class="chart"
        viewBox="0 0 ${WIDTH} ${SOC_HEIGHT}"
        role="img"
        aria-label="State of charge"
      >
        <line class="grid-line" x1="0" y1=${socY(100)} x2=${WIDTH} y2=${socY(100)}></line>
        <line class="grid-line" x1="0" y1=${socY(50)} x2=${WIDTH} y2=${socY(50)}></line>
        <line class="base-line" x1="0" y1=${SOC_BASE} x2=${WIDTH} y2=${SOC_BASE}></line>
        ${ticks.map(
          (tick) =>
            svg`<line class="tick-line" x1=${tick.x * WIDTH} y1=${SOC_TOP} x2=${tick.x * WIDTH} y2=${SOC_BASE}></line>`,
        )}
        ${this.renderThreshold(battery.thresholds.hasLow, battery.thresholds.low, 'Low', 'warning')}
        ${this.renderThreshold(battery.thresholds.hasShutdown, battery.thresholds.shutdown, 'Shutdown', 'error')}
        <path
          d=${areaPath(linePoints, SOC_BASE, SOC_TOP)}
          style="fill: color-mix(in srgb, var(--deye-battery-color) 14%, transparent)"
        ></path>
        <path
          d=${smoothPath(linePoints, SOC_TOP, SOC_BASE)}
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          style="stroke: var(--deye-battery-color)"
        ></path>
        ${
          live === undefined
            ? nothing
            : svg`<circle cx=${WIDTH} cy=${socY(live)} r="4.5" stroke-width="2.5" style="fill: var(--deye-battery-color); stroke: var(--ha-card-background, var(--card-background-color))"></circle>`
        }
        <text x="4" y=${socY(100) + 12}>100%</text>
        <text x="4" y=${socY(50) + 12}>50%</text>
        <text x="4" y=${SOC_BASE - 4}>0%</text>
      </svg>
      ${this.renderPowerBars(power)} ${timeAxis(ticks, true)}
      <div class="section-head">
        <span class="legend"><span class="swatch stroke battery-fill"></span>SOC</span>
        <span class="legend"><span class="swatch battery-fill"></span>Charge</span>
        <span class="legend"><span class="swatch discharge-fill"></span>Discharge</span>
      </div>`;
  }

  private renderThreshold(
    isVisible: boolean,
    value: number,
    label: string,
    tone: string,
  ): TemplateResult | typeof nothing {
    if (!isVisible) {
      return nothing;
    }

    const y = socY(value);
    const color = tone === 'warning' ? 'var(--deye-warning-color)' : 'var(--deye-error-color)';

    return svg`<line x1="0" y1=${y} x2=${WIDTH} y2=${y} stroke-dasharray="5 4" style=${`stroke: color-mix(in srgb, ${color} 55%, transparent)`}></line>
      <text x=${WIDTH - 6} y=${y - 4} text-anchor="end" style=${`fill: ${color}`}>${label} ${Math.round(value)}%</text>`;
  }

  private renderPowerBars(power: Series): TemplateResult {
    const slot = WIDTH / Math.max(1, power.length);
    const scale = Math.max(MIN_BAR_SCALE_KW, ...power.map((value) => Math.abs(value ?? 0)));
    const bars = power.map((value, index) => {
      if (value === undefined || value === 0) {
        return nothing;
      }

      const height = (Math.abs(value) / scale) * BAR_SPAN;
      const x = index * slot + (slot - BAR_WIDTH) / 2;
      const isCharge = value < 0;

      return svg`<rect x=${x} y=${isCharge ? BAR_ZERO - height : BAR_ZERO} width=${BAR_WIDTH} height=${height} rx="1" class=${isCharge ? 'charge' : 'discharge'}></rect>`;
    });

    return html`<svg
      class="chart bars"
      viewBox="0 0 ${WIDTH} ${BAR_HEIGHT}"
      role="img"
      aria-label="Battery power"
    >
      <line class="base-line" x1="0" y1=${BAR_ZERO} x2=${WIDTH} y2=${BAR_ZERO}></line>
      ${bars}
    </svg>`;
  }

  private renderStats(panel: PanelModel, locale: FormatLocale): TemplateResult {
    const { readings } = panel;

    return html`<section class="section">
      <div class="stats">
        ${statTile('Voltage', 'battery_voltage', readings.battery_voltage, sourceLabel(panel, 'battery_voltage'), locale)}
        ${statTile('Current', 'battery_current', readings.battery_current, sourceLabel(panel, 'battery_current'), locale)}
        ${statTile(
          'Temperature',
          'battery_temperature',
          readings.battery_temperature,
          sourceLabel(panel, 'battery_temperature'),
          locale,
        )}
      </div>
      <div class="stats">
        ${statTile(
          'Charged today',
          'day_battery_charge',
          readings.day_battery_charge,
          sourceLabel(panel, 'day_battery_charge'),
          locale,
        )}
        ${statTile(
          'Discharged today',
          'day_battery_discharge',
          readings.day_battery_discharge,
          sourceLabel(panel, 'day_battery_discharge'),
          locale,
        )}
      </div>
    </section>`;
  }

  private renderMembers(panel: PanelModel, locale: FormatLocale): TemplateResult | typeof nothing {
    if (panel.members.length < 2) {
      return nothing;
    }

    const members = orderedMembers(panel);
    const total = members.reduce(
      (sum, member) => sum + Math.abs(valueOf(member.readings.battery_power) ?? 0),
      0,
    );

    return html`<section class="section">
      <h3>By inverter</h3>
      <div class="rows">${members.map((member) => this.renderMember(member, total, locale))}</div>
    </section>`;
  }

  private renderMember(member: MemberModel, total: number, locale: FormatLocale): TemplateResult {
    const power = valueOf(member.readings.battery_power);
    const share = total > 0 ? Math.round((Math.abs(power ?? 0) / total) * 100) : 0;

    return html`<button
      type="button"
      class="row"
      style=${styleMap({
        gridTemplateColumns: '8px minmax(0, 1fr) minmax(48px, 140px) 72px 64px',
        '--share-color': 'var(--deye-battery-color)',
      })}
      @click=${(event: Event) => fireMoreInfo(event.currentTarget, member.readings.battery_power?.entityId)}
    >
      <span class="row-dot ${member.status.chip?.tone ?? 'neutral'}"></span>
      <span class="cell-text">${member.name}</span>
      <span class="share"><span style=${styleMap({ width: `${share}%` })}></span></span>
      <span class="num"
        >${formatNumber(power === undefined ? undefined : Math.abs(power), 2, locale)} kW</span
      >
      <span class="num muted"
        >${formatReading('battery_current', member.readings.battery_current, locale)} A</span
      >
    </button>`;
  }
}
