import {
  DEFAULT_TOTALS_TITLE,
  DISPLAY_MODES,
  POPUP_TILE_IDS,
  SECTION_IDS,
  SIGN_KEYS,
  TAP_ACTIONS,
  TILE_IDS,
} from '../const';
import { isSensorKey } from '../registry/sensors';
import type {
  DeyeInverterCardConfig,
  DisplayMode,
  EntityOverrides,
  InverterConfig,
  ResolvedConfig,
  ResolvedInverter,
  SectionId,
  SignKey,
  TapAction,
  TileId,
} from '../types/config';

const PREFIX_PATTERN = /^[a-z0-9_]+$/;

export const DEFAULT_TAP_ACTIONS: Readonly<Record<TileId, TapAction>> = {
  pv: 'popup',
  battery: 'popup',
  grid: 'more-info',
  load: 'more-info',
  temps: 'more-info',
};

export function supportsPopup(tile: TileId): boolean {
  return (POPUP_TILE_IDS as readonly TileId[]).includes(tile);
}

export function suggestInverterName(prefix: string): string {
  const parts = prefix.split('_').filter(Boolean);
  const last = parts.at(-1) ?? prefix;

  if (parts.length < 2) {
    return last.toUpperCase();
  }

  return last[0].toUpperCase() + last.slice(1);
}

function cleanOverrides(overrides: EntityOverrides | undefined): EntityOverrides {
  const result: Record<string, string> = {};

  for (const [key, entityId] of Object.entries(overrides ?? {})) {
    if (isSensorKey(key) && typeof entityId === 'string' && entityId.length > 0) {
      result[key] = entityId;
    }
  }

  return result;
}

function resolveInverter(
  inverter: InverterConfig,
  entities: DeyeInverterCardConfig['entities'],
): ResolvedInverter {
  const prefix = typeof inverter?.prefix === 'string' ? inverter.prefix.trim() : '';

  if (!PREFIX_PATTERN.test(prefix)) {
    throw new Error(`Invalid inverter prefix "${prefix}": use lowercase letters, digits and "_"`);
  }

  return {
    prefix,
    name: inverter.name?.trim() || prefix,
    overrides: cleanOverrides(entities?.[prefix]),
  };
}

function resolveDisplay(display: DisplayMode | undefined): DisplayMode {
  return display && DISPLAY_MODES.includes(display) ? display : 'detailed';
}

function resolveSections(sections: readonly SectionId[] | undefined): ReadonlySet<SectionId> {
  if (!Array.isArray(sections)) {
    return new Set(SECTION_IDS);
  }

  return new Set(sections.filter((section) => SECTION_IDS.includes(section)));
}

function resolveTapActions(
  actions: DeyeInverterCardConfig['tap_actions'],
): Readonly<Record<TileId, TapAction>> {
  const result = { ...DEFAULT_TAP_ACTIONS };

  for (const tile of TILE_IDS) {
    const action = actions?.[tile];

    if (!action || !TAP_ACTIONS.includes(action)) {
      continue;
    }

    result[tile] = action === 'popup' && !supportsPopup(tile) ? 'more-info' : action;
  }

  return result;
}

function resolveInvert(
  invert: DeyeInverterCardConfig['invert'],
): Readonly<Record<SignKey, boolean>> {
  return Object.fromEntries(SIGN_KEYS.map((key) => [key, invert?.[key] === true])) as Record<
    SignKey,
    boolean
  >;
}

export function normalizeConfig(config: DeyeInverterCardConfig): ResolvedConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Invalid configuration');
  }

  if (!Array.isArray(config.inverters) || config.inverters.length === 0) {
    throw new Error('Add at least one inverter: inverters: [{ prefix: deye_master }]');
  }

  const inverters = config.inverters.map((inverter) => resolveInverter(inverter, config.entities));
  const prefixes = inverters.map((inverter) => inverter.prefix);

  if (new Set(prefixes).size !== prefixes.length) {
    throw new Error('Each inverter prefix must be unique');
  }

  return {
    title: config.title?.trim() || DEFAULT_TOTALS_TITLE,
    display: resolveDisplay(config.display),
    inverters,
    showTotals: config.show_totals !== false,
    isParallel: config.parallel !== false,
    master: config.master && prefixes.includes(config.master) ? config.master : prefixes[0],
    sections: resolveSections(config.sections),
    tapActions: resolveTapActions(config.tap_actions),
    invert: resolveInvert(config.invert),
  };
}
