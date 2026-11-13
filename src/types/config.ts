import type {
  DISPLAY_MODES,
  POPUP_TILE_IDS,
  SECTION_IDS,
  SIGN_KEYS,
  TAP_ACTIONS,
  TILE_IDS,
} from '../const';
import type { SensorKey } from '../registry/sensors';

export type SectionId = (typeof SECTION_IDS)[number];
export type TileId = (typeof TILE_IDS)[number];
export type PopupTileId = (typeof POPUP_TILE_IDS)[number];
export type TapAction = (typeof TAP_ACTIONS)[number];
export type DisplayMode = (typeof DISPLAY_MODES)[number];
export type SignKey = (typeof SIGN_KEYS)[number];

export type EntityOverrides = Partial<Record<SensorKey, string>>;

export interface InverterConfig {
  readonly prefix: string;
  readonly name?: string;
}

export interface DeyeInverterCardConfig {
  readonly type: string;
  readonly title?: string;
  readonly display?: DisplayMode;
  readonly inverters: readonly InverterConfig[];
  readonly show_totals?: boolean;
  readonly parallel?: boolean;
  readonly master?: string;
  readonly sections?: readonly SectionId[];
  readonly tap_actions?: Partial<Record<TileId, TapAction>>;
  readonly invert?: Partial<Record<SignKey, boolean>>;
  readonly entities?: Readonly<Record<string, EntityOverrides>>;
}

export interface ResolvedInverter {
  readonly prefix: string;
  readonly name: string;
  readonly overrides: EntityOverrides;
}

export interface ResolvedConfig {
  readonly title: string;
  readonly display: DisplayMode;
  readonly inverters: readonly ResolvedInverter[];
  readonly showTotals: boolean;
  readonly isParallel: boolean;
  readonly master: string;
  readonly sections: ReadonlySet<SectionId>;
  readonly tapActions: Readonly<Record<TileId, TapAction>>;
  readonly invert: Readonly<Record<SignKey, boolean>>;
}
