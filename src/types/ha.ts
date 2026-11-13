export interface HassEntityAttributes {
  readonly unit_of_measurement?: string;
  readonly friendly_name?: string;
  readonly [key: string]: unknown;
}

export interface HassEntity {
  readonly entity_id: string;
  readonly state: string;
  readonly attributes: HassEntityAttributes;
  readonly last_changed: string;
  readonly last_updated: string;
}

export type HassEntities = Readonly<Record<string, HassEntity>>;

export type NumberFormat =
  'language' | 'system' | 'comma_decimal' | 'decimal_period' | 'space_comma' | 'none';

export type TimeFormat = 'language' | 'system' | '12' | '24';

export interface HassLocale {
  readonly language: string;
  readonly number_format?: NumberFormat;
  readonly time_format?: TimeFormat;
}

export interface HassMessage {
  readonly type: string;
  readonly [key: string]: unknown;
}

export interface HomeAssistant {
  readonly states: HassEntities;
  readonly locale?: HassLocale;
  readonly language?: string;
  callWS<T>(message: HassMessage): Promise<T>;
}

export interface LovelaceGridOptions {
  readonly columns?: number | 'full';
  readonly rows?: number | 'auto';
  readonly min_columns?: number;
  readonly max_columns?: number;
  readonly min_rows?: number;
  readonly max_rows?: number;
}

export interface CustomCardEntry {
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly preview?: boolean;
  readonly documentationURL?: string;
}

export interface LovelaceCardHelpers {
  createCardElement(config: Record<string, unknown>): Promise<HTMLElement>;
}
