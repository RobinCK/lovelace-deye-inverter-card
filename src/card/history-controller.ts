import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { HISTORY_REFRESH_MS, OUTAGE_SLOTS, OUTAGE_WINDOW_MS, SPARKLINE_BUCKETS } from '../const';
import { pvSourceEntityIds } from '../data/derived';
import {
  HassHistoryAdapter,
  markSlots,
  resampleMean,
  statesToValues,
  sumSeries,
  type HistorySource,
  type Series,
} from '../data/history';
import type { PanelModel } from '../data/panels';
import { isOffState } from '../data/readings';
import { VALUE_FORMATS } from '../registry/formats';
import type { ResolvedConfig } from '../types/config';
import type { HomeAssistant } from '../types/ha';
import { solarWindow } from '../utils/time';
import type { HistoryView, OutageView, SparklineView } from './types';

interface HistoryRequest {
  readonly power: readonly string[];
  readonly outage: readonly string[];
}

const EMPTY_OUTAGE: OutageView = { status: 'loading', slots: [] };

function unique(values: readonly (string | undefined)[]): string[] {
  return [...new Set(values.filter((value): value is string => value !== undefined))].sort();
}

function buildRequest(panels: readonly PanelModel[], config: ResolvedConfig): HistoryRequest {
  const power = config.sections.has('pv')
    ? unique(
        panels.flatMap((panel) =>
          panel.members.flatMap((member) => pvSourceEntityIds(member.readings)),
        ),
      )
    : [];
  const outage = config.sections.has('grid')
    ? unique(
        panels
          .filter((panel) => panel.status.isOffGrid)
          .map((panel) => panel.master.readings.grid_connected?.entityId),
      )
    : [];

  return { power, outage };
}

export class CardHistoryController implements ReactiveController, HistoryView {
  private power = new Map<string, Series>();
  private outageSlots = new Map<string, readonly boolean[]>();
  private loadedKey = '';
  private loadedAt = 0;
  private pendingKey: string | undefined;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.loadedKey = '';
  }

  hostDisconnected(): void {
    this.pendingKey = undefined;
  }

  sync(
    hass: HomeAssistant,
    panels: readonly PanelModel[],
    config: ResolvedConfig,
    now: number,
  ): void {
    const request = buildRequest(panels, config);
    const key = JSON.stringify(request);
    const isFresh = key === this.loadedKey && now - this.loadedAt < HISTORY_REFRESH_MS;

    if (isFresh || key === this.pendingKey) {
      return;
    }

    if (request.power.length === 0 && request.outage.length === 0) {
      this.loadedKey = key;
      this.loadedAt = now;

      return;
    }

    void this.load(hass, request, key, now);
  }

  sparkline(panel: PanelModel): SparklineView {
    const memberSeries = panel.members.map((member) =>
      pvSourceEntityIds(member.readings).map((entityId) => this.power.get(entityId)),
    );

    if (memberSeries.some((series) => series.some((entry) => entry === undefined))) {
      return { status: 'loading', back: [] };
    }

    const resolved = memberSeries.map((series) =>
      sumSeries(series.filter((entry): entry is Series => !!entry)),
    );
    const masterIndex = panel.members.indexOf(panel.master);

    return {
      status: 'ready',
      back: sumSeries(resolved),
      front: panel.kind === 'totals' ? resolved[masterIndex] : undefined,
    };
  }

  outage(panel: PanelModel): OutageView {
    const entityId = panel.master.readings.grid_connected?.entityId;
    const slots = entityId ? this.outageSlots.get(entityId) : undefined;

    return slots ? { status: 'ready', slots } : EMPTY_OUTAGE;
  }

  private async load(
    hass: HomeAssistant,
    request: HistoryRequest,
    key: string,
    now: number,
  ): Promise<void> {
    const source = new HassHistoryAdapter(hass);

    this.pendingKey = key;

    const [power, outage] = await Promise.all([
      this.loadPower(source, hass, request.power, now),
      this.loadOutage(source, request.outage, now),
    ]);

    if (this.pendingKey !== key) {
      return;
    }

    this.power = power;
    this.outageSlots = outage;
    this.loadedKey = key;
    this.loadedAt = now;
    this.pendingKey = undefined;
    this.host.requestUpdate();
  }

  private async loadPower(
    source: HistorySource,
    hass: HomeAssistant,
    entityIds: readonly string[],
    now: number,
  ): Promise<Map<string, Series>> {
    const window = solarWindow(now);
    const empty = new Map(entityIds.map((entityId) => [entityId, [] as Series]));

    if (entityIds.length === 0 || now <= window.start) {
      return empty;
    }

    try {
      const history = await source.fetchStates(entityIds, window.start, Math.min(now, window.end));

      return new Map(
        entityIds.map((entityId) => {
          const scale = VALUE_FORMATS.power.scale(
            hass.states[entityId]?.attributes.unit_of_measurement,
          );
          const values = statesToValues(history[entityId] ?? [], (raw) => raw * scale);

          return [entityId, resampleMean(values, window.start, window.end, SPARKLINE_BUCKETS, now)];
        }),
      );
    } catch {
      return empty;
    }
  }

  private async loadOutage(
    source: HistorySource,
    entityIds: readonly string[],
    now: number,
  ): Promise<Map<string, readonly boolean[]>> {
    const start = now - OUTAGE_WINDOW_MS;
    const empty = new Map(
      entityIds.map((entityId) => [entityId, new Array<boolean>(OUTAGE_SLOTS).fill(false)]),
    );

    if (entityIds.length === 0) {
      return empty;
    }

    try {
      const history = await source.fetchStates(entityIds, start, now);

      return new Map(
        entityIds.map((entityId) => [
          entityId,
          markSlots(history[entityId] ?? [], start, now, OUTAGE_SLOTS, now, isOffState),
        ]),
      );
    } catch {
      return empty;
    }
  }
}
