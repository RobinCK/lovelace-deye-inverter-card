import { SENSOR_DEFINITIONS, type AggregateKind, type SensorKey } from '../registry/sensors';
import type { Reading, Readings } from './readings';

export interface AggregationMember {
  readonly prefix: string;
  readonly readings: Readings;
}

type Aggregator = (
  readings: readonly Reading[],
  master: Reading | undefined,
  isParallel: boolean,
) => Reading | undefined;

function unavailable(reading: Reading): Reading {
  return { ...reading, isAvailable: false, value: undefined };
}

const sum: Aggregator = (readings) => {
  const [first] = readings;

  if (!first) {
    return undefined;
  }

  if (readings.some((reading) => !reading.isAvailable)) {
    return unavailable(first);
  }

  return { ...first, value: readings.reduce((total, reading) => total + (reading.value ?? 0), 0) };
};

const mean: Aggregator = (readings, master, isParallel) => {
  const total = sum(readings, master, isParallel);

  if (!total || total.value === undefined) {
    return total;
  }

  return { ...total, value: total.value / readings.length };
};

const fromMaster: Aggregator = (readings, master) => master ?? readings[0];

const shared: Aggregator = (readings, master, isParallel) =>
  isParallel ? fromMaster(readings, master, isParallel) : mean(readings, master, isParallel);

const pooled: Aggregator = (readings, master, isParallel) =>
  isParallel ? fromMaster(readings, master, isParallel) : sum(readings, master, isParallel);

const none: Aggregator = () => undefined;

export function sumReadings(readings: readonly Reading[]): Reading | undefined {
  return sum(readings, undefined, false);
}

const AGGREGATORS: Readonly<Record<AggregateKind, Aggregator>> = {
  sum,
  master: fromMaster,
  shared,
  pooled,
  none,
};

export function aggregateReadings(
  members: readonly AggregationMember[],
  masterPrefix: string,
  isParallel: boolean,
): Readings {
  const master = members.find((member) => member.prefix === masterPrefix) ?? members[0];
  const result: Readings = {};

  for (const definition of SENSOR_DEFINITIONS) {
    const key: SensorKey = definition.key;
    const readings = members
      .map((member) => member.readings[key])
      .filter((reading): reading is Reading => reading !== undefined);

    if (readings.length === 0) {
      continue;
    }

    const aggregated = AGGREGATORS[definition.aggregate](
      readings,
      master?.readings[key],
      isParallel,
    );

    if (aggregated) {
      result[key] = aggregated;
    }
  }

  return result;
}
