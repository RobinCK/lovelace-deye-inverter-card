import { SOLAR_DAY_END_HOUR, SOLAR_DAY_START_HOUR } from '../const';

export interface TimeWindow {
  readonly start: number;
  readonly end: number;
}

export const MS_PER_HOUR = 60 * 60 * 1000;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

export function atHour(time: number, hour: number): number {
  const date = new Date(time);

  date.setHours(hour, 0, 0, 0);

  return date.getTime();
}

export function solarWindow(now: number): TimeWindow {
  return {
    start: atHour(now, SOLAR_DAY_START_HOUR),
    end: atHour(now, SOLAR_DAY_END_HOUR),
  };
}

export function positionIn(window: TimeWindow, time: number): number {
  const ratio = (time - window.start) / (window.end - window.start);

  return Math.min(1, Math.max(0, ratio));
}

export function localTicks(window: TimeWindow, stepHours: number): number[] {
  const ticks: number[] = [];
  const first = new Date(window.start);

  first.setMinutes(0, 0, 0);
  first.setHours(Math.ceil(first.getHours() / stepHours) * stepHours);

  for (let tick = first.getTime(); tick < window.end; tick = nextLocalTick(tick, stepHours)) {
    if (tick > window.start) {
      ticks.push(tick);
    }
  }

  return ticks;
}

function nextLocalTick(time: number, stepHours: number): number {
  const date = new Date(time);

  date.setHours(date.getHours() + stepHours);

  return date.getTime();
}
