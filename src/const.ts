export const CARD_TYPE = 'deye-inverter-card';
export const EDITOR_TYPE = 'deye-inverter-card-editor';
export const POPUP_TYPE = 'deye-inverter-popup';
export const SOLAR_POPUP_BODY_TYPE = 'deye-solar-popup-body';
export const BATTERY_POPUP_BODY_TYPE = 'deye-battery-popup-body';
export const CARD_NAME = 'Deye Inverter Card';
export const CARD_DESCRIPTION =
  'Status and live values of Deye/Sunsynk inverters from the Sunsynk/Deye Inverter add-on.';
export const DOCUMENTATION_URL = 'https://github.com/RobinCK/lovelace-deye-inverter-card';

export const SECTION_IDS = ['status', 'pv', 'battery', 'grid', 'load', 'temps'] as const;
export const TILE_IDS = ['pv', 'battery', 'grid', 'load', 'temps'] as const;
export const POPUP_TILE_IDS = ['pv', 'battery'] as const;
export const TAP_ACTIONS = ['popup', 'more-info', 'none'] as const;
export const DISPLAY_MODES = ['detailed', 'compact'] as const;
export const SIGN_KEYS = ['battery_power', 'grid_power'] as const;

export const PHASES = [1, 2, 3] as const;
export const PV_STRINGS = [1, 2] as const;

export const DEFAULT_PREFIX = 'ss';
export const DEFAULT_TOTALS_TITLE = 'Total';

export const IDLE_POWER_KW = 0.02;
export const DEFAULT_LOW_SOC = 35;
export const DEFAULT_SHUTDOWN_SOC = 10;
export const GRID_VOLTAGE_MIN = 207;
export const GRID_VOLTAGE_MAX = 253;

export const SOLAR_DAY_START_HOUR = 5;
export const SOLAR_DAY_END_HOUR = 21;
export const SPARKLINE_BUCKETS = 96;
export const OUTAGE_SLOTS = 48;
export const OUTAGE_WINDOW_MS = 24 * 60 * 60 * 1000;
export const HISTORY_REFRESH_MS = 5 * 60 * 1000;
