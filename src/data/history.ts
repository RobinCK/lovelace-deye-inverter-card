import type { HomeAssistant } from '../types/ha';

export interface TimedState {
  readonly time: number;
  readonly state: string;
}

export interface TimedValue {
  readonly time: number;
  readonly value: number;
}

export type Series = readonly (number | undefined)[];

export interface HistorySource {
  fetchStates(
    entityIds: readonly string[],
    start: number,
    end: number,
  ): Promise<Record<string, TimedState[]>>;
  fetchHourlyMeans(
    entityIds: readonly string[],
    start: number,
    end: number,
  ): Promise<Record<string, TimedValue[]>>;
}

interface CompressedState {
  readonly s: string;
  readonly lu: number;
}

interface StatisticRow {
  readonly start: number | string;
  readonly mean?: number | null;
}

const MS_PER_SECOND = 1000;

export class HassHistoryAdapter implements HistorySource {
  constructor(private readonly hass: HomeAssistant) {}

  async fetchStates(
    entityIds: readonly string[],
    start: number,
    end: number,
  ): Promise<Record<string, TimedState[]>> {
    if (entityIds.length === 0) {
      return {};
    }

    const response = await this.hass.callWS<Record<string, CompressedState[]>>({
      type: 'history/history_during_period',
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      entity_ids: entityIds,
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    });

    return Object.fromEntries(
      Object.entries(response).map(([entityId, states]) => [
        entityId,
        states.map((state) => ({ time: state.lu * MS_PER_SECOND, state: state.s })),
      ]),
    );
  }

  async fetchHourlyMeans(
    entityIds: readonly string[],
    start: number,
    end: number,
  ): Promise<Record<string, TimedValue[]>> {
    if (entityIds.length === 0) {
      return {};
    }

    const response = await this.hass.callWS<Record<string, StatisticRow[]>>({
      type: 'recorder/statistics_during_period',
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      statistic_ids: entityIds,
      period: 'hour',
      types: ['mean'],
    });

    return Object.fromEntries(
      Object.entries(response).map(([entityId, rows]) => [entityId, statisticsToValues(rows)]),
    );
  }
}

function statisticsToValues(rows: readonly StatisticRow[]): TimedValue[] {
  return rows.flatMap((row) => {
    const time = typeof row.start === 'number' ? row.start : Date.parse(row.start);

    if (typeof row.mean !== 'number' || Number.isNaN(time)) {
      return [];
    }

    return [{ time, value: row.mean }];
  });
}

export function statesToValues(
  states: readonly TimedState[],
  transform: (raw: number) => number,
): TimedValue[] {
  return states.flatMap((entry) => {
    const raw = Number.parseFloat(entry.state);

    return Number.isFinite(raw) ? [{ time: entry.time, value: transform(raw) }] : [];
  });
}

export function resampleMean(
  points: readonly TimedValue[],
  start: number,
  end: number,
  buckets: number,
  until: number = end,
): (number | undefined)[] {
  const step = (end - start) / buckets;
  const sums = new Array<number>(buckets).fill(0);
  const weights = new Array<number>(buckets).fill(0);
  const limit = Math.min(until, end);

  points.forEach((point, index) => {
    const segmentStart = Math.max(point.time, start);
    const segmentEnd = Math.min(points[index + 1]?.time ?? limit, limit);

    if (segmentEnd <= segmentStart) {
      return;
    }

    const first = Math.floor((segmentStart - start) / step);
    const last = Math.min(buckets - 1, Math.ceil((segmentEnd - start) / step) - 1);

    for (let bucket = first; bucket <= last; bucket += 1) {
      const bucketStart = start + bucket * step;
      const overlap =
        Math.min(segmentEnd, bucketStart + step) - Math.max(segmentStart, bucketStart);

      if (overlap > 0) {
        sums[bucket] += point.value * overlap;
        weights[bucket] += overlap;
      }
    }
  });

  return sums.map((total, bucket) => (weights[bucket] > 0 ? total / weights[bucket] : undefined));
}

export function sumSeries(series: readonly Series[]): (number | undefined)[] {
  const length = Math.max(0, ...series.map((entry) => entry.length));

  return Array.from({ length }, (_, index) => {
    const values = series
      .map((entry) => entry[index])
      .filter((value): value is number => value !== undefined);

    return values.length === 0 ? undefined : values.reduce((total, value) => total + value, 0);
  });
}

export function seriesMax(series: readonly Series[]): number {
  return Math.max(
    0,
    ...series.flatMap((entry) => entry.filter((value): value is number => value !== undefined)),
  );
}

export function markSlots(
  states: readonly TimedState[],
  start: number,
  end: number,
  slots: number,
  until: number,
  isMarked: (state: string) => boolean,
): boolean[] {
  const step = (end - start) / slots;
  const result = new Array<boolean>(slots).fill(false);
  const limit = Math.min(until, end);

  states.forEach((entry, index) => {
    if (!isMarked(entry.state)) {
      return;
    }

    const segmentStart = Math.max(entry.time, start);
    const segmentEnd = Math.min(states[index + 1]?.time ?? limit, limit);

    if (segmentEnd <= segmentStart) {
      return;
    }

    const first = Math.floor((segmentStart - start) / step);
    const last = Math.min(slots - 1, Math.ceil((segmentEnd - start) / step) - 1);

    for (let slot = first; slot <= last; slot += 1) {
      result[slot] = true;
    }
  });

  return result;
}
