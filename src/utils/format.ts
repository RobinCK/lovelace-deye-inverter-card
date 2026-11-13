import type { HassLocale, NumberFormat, TimeFormat } from '../types/ha';

export interface FormatLocale {
  readonly numberLocale: string | undefined;
  readonly useGrouping: boolean;
  readonly timeLocale: string | undefined;
  readonly hourCycle: 'h12' | 'h23' | undefined;
}

export const PLACEHOLDER = '—';

const NUMBER_LOCALES: Readonly<Partial<Record<NumberFormat, string>>> = {
  comma_decimal: 'en-US',
  decimal_period: 'de',
  space_comma: 'fr',
};

const HOUR_CYCLES: Readonly<Partial<Record<TimeFormat, 'h12' | 'h23'>>> = {
  '12': 'h12',
  '24': 'h23',
};

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;

const numberFormatters = new Map<string, Intl.NumberFormat>();

export function resolveFormatLocale(
  locale: HassLocale | undefined,
  fallbackLanguage = 'en',
): FormatLocale {
  const language = locale?.language ?? fallbackLanguage;
  const numberFormat = locale?.number_format ?? 'language';
  const timeFormat = locale?.time_format ?? 'language';

  return {
    numberLocale:
      numberFormat === 'system' ? undefined : (NUMBER_LOCALES[numberFormat] ?? language),
    useGrouping: numberFormat !== 'none',
    timeLocale: timeFormat === 'system' ? undefined : language,
    hourCycle: HOUR_CYCLES[timeFormat],
  };
}

function getNumberFormatter(decimals: number, locale: FormatLocale): Intl.NumberFormat {
  const cacheKey = `${locale.numberLocale ?? ''}|${decimals}|${locale.useGrouping}`;
  const cached = numberFormatters.get(cacheKey);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.NumberFormat(locale.numberLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: locale.useGrouping,
  });

  numberFormatters.set(cacheKey, formatter);

  return formatter;
}

export function formatNumber(
  value: number | undefined,
  decimals: number,
  locale: FormatLocale,
): string {
  if (value === undefined || !Number.isFinite(value)) {
    return PLACEHOLDER;
  }

  const normalized = Math.abs(value) < 0.5 * 10 ** -decimals ? 0 : value;

  return getNumberFormatter(decimals, locale).format(normalized);
}

export function formatDuration(totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes));

  if (minutes < MINUTES_PER_HOUR) {
    return `${minutes}m`;
  }

  if (minutes < MINUTES_PER_DAY) {
    return `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;
  }

  const days = Math.floor(minutes / MINUTES_PER_DAY);
  const hours = Math.floor((minutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR);

  return `${days}d ${hours}h`;
}

export function formatClock(time: number, locale: FormatLocale): string {
  return new Intl.DateTimeFormat(locale.timeLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: locale.hourCycle,
  }).format(time);
}

export function formatWeekday(time: number, locale: FormatLocale): string {
  return new Intl.DateTimeFormat(locale.timeLocale, { weekday: 'short' }).format(time);
}

export function capitalize(text: string): string {
  return text.length === 0 ? text : text[0].toUpperCase() + text.slice(1);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
