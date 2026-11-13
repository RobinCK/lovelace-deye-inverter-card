import type { SensorKey } from '../registry/sensors';
import { capitalize, pluralize, type FormatLocale } from '../utils/format';
import { formatReading, isOn, textOf, type Readings } from './readings';

export type Tone = 'ok' | 'warning' | 'error' | 'info' | 'neutral';
export type LineTone = 'normal' | 'warning' | 'error';

export interface StatusChip {
  readonly label: string;
  readonly tone: Tone;
}

export interface StatusLine {
  readonly text: string;
  readonly tone: LineTone;
  readonly isFault: boolean;
}

export interface PanelStatus {
  readonly chip?: StatusChip;
  readonly line?: StatusLine;
  readonly isOffGrid: boolean;
}

const OK_CHIP: StatusChip = { label: 'OK', tone: 'ok' };
const ALARM_CHIP: StatusChip = { label: 'Alarm', tone: 'warning' };
const FAULT_CHIP: StatusChip = { label: 'Fault', tone: 'error' };
const OFF_GRID_CHIP: StatusChip = { label: 'Off-grid', tone: 'info' };
const UNAVAILABLE_CHIP: StatusChip = { label: 'Unavailable', tone: 'neutral' };

const STATE_CHIPS: Readonly<Record<string, StatusChip>> = {
  alarm: ALARM_CHIP,
  fault: FAULT_CHIP,
};

const LINE_SEPARATOR = ' · ';

function resolveChip(
  readings: Readings,
  faultText: string,
  isOffGrid: boolean,
): StatusChip | undefined {
  if (readings.overall_state && !readings.overall_state.isAvailable) {
    return UNAVAILABLE_CHIP;
  }

  const state = textOf(readings.overall_state)?.trim().toLowerCase();
  const stateChip = state ? STATE_CHIPS[state] : undefined;

  if (stateChip) {
    return stateChip;
  }

  if (!state && faultText) {
    return ALARM_CHIP;
  }

  if (isOffGrid) {
    return OFF_GRID_CHIP;
  }

  if (state === 'ok') {
    return OK_CHIP;
  }

  if (state) {
    return { label: capitalize(state), tone: 'neutral' };
  }

  return readings.fault?.isAvailable ? OK_CHIP : undefined;
}

function describeConnection(isConnected: boolean | undefined): string | undefined {
  if (isConnected === undefined) {
    return undefined;
  }

  return isConnected ? 'On-grid' : 'Off-grid';
}

function describeRelay(isClosed: boolean | undefined): string | undefined {
  if (isClosed === undefined) {
    return undefined;
  }

  return isClosed ? 'relay closed' : 'relay open';
}

function describeFrequency(
  readings: Readings,
  isOffGrid: boolean,
  locale: FormatLocale,
): string | undefined {
  const keys: readonly SensorKey[] = isOffGrid
    ? ['load_frequency', 'grid_frequency']
    : ['grid_frequency', 'load_frequency'];
  const key = keys.find((candidate) => readings[candidate]?.isAvailable);

  return key ? formatReading(key, readings[key], locale, { hasUnit: true }) : undefined;
}

function resolveLine(
  readings: Readings,
  faultText: string,
  chip: StatusChip | undefined,
  isOffGrid: boolean,
  locale: FormatLocale,
): StatusLine | undefined {
  if (faultText) {
    return { text: faultText, tone: chip?.tone === 'error' ? 'error' : 'warning', isFault: true };
  }

  const parts = [
    describeConnection(isOn(readings.grid_connected)),
    describeRelay(isOn(readings.grid_relay_status)),
    describeFrequency(readings, isOffGrid, locale),
    textOf(readings.parallel_mode)?.trim().toLowerCase(),
  ].filter((part): part is string => Boolean(part));

  if (parts.length === 0) {
    return undefined;
  }

  return { text: parts.join(LINE_SEPARATOR), tone: 'normal', isFault: false };
}

export function resolveInverterStatus(readings: Readings, locale: FormatLocale): PanelStatus {
  const isOffGrid = isOn(readings.grid_connected) === false;
  const faultText = textOf(readings.fault)?.trim() ?? '';
  const chip = resolveChip(readings, faultText, isOffGrid);

  return {
    chip,
    line: resolveLine(readings, faultText, chip, isOffGrid, locale),
    isOffGrid,
  };
}

function resolveTotalsChip(
  members: readonly PanelStatus[],
  master: PanelStatus | undefined,
): StatusChip | undefined {
  const faults = members.filter((member) => member.chip?.tone === 'error').length;
  const alarms = members.filter((member) => member.chip?.tone === 'warning').length;

  if (faults > 0) {
    return { label: pluralize(faults, 'fault'), tone: 'error' };
  }

  if (alarms > 0) {
    return { label: pluralize(alarms, 'alarm'), tone: 'warning' };
  }

  if (master?.isOffGrid) {
    return OFF_GRID_CHIP;
  }

  const neutral = members.find((member) => member.chip?.tone === 'neutral');

  if (neutral) {
    return neutral.chip;
  }

  return members.some((member) => member.chip) ? OK_CHIP : undefined;
}

export function resolveTotalsStatus(
  members: readonly PanelStatus[],
  master: PanelStatus | undefined,
  masterName: string,
  isParallel: boolean,
): PanelStatus {
  const parts = [pluralize(members.length, 'inverter')];

  if (isParallel) {
    parts.push('parallel', `battery from ${masterName}`);
  }

  return {
    chip: resolveTotalsChip(members, master),
    line: { text: parts.join(LINE_SEPARATOR), tone: 'normal', isFault: false },
    isOffGrid: master?.isOffGrid ?? false,
  };
}
