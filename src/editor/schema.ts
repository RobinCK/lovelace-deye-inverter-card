import { SECTION_IDS, TAP_ACTIONS, TILE_IDS } from '../const';
import { supportsPopup } from '../config/normalize';
import { getSectionKeys, getSensorDefinition } from '../registry/sensors';
import type { InverterConfig, SectionId, TapAction, TileId } from '../types/config';

export interface HaFormSelectorField {
  readonly name: string;
  readonly selector: Readonly<Record<string, unknown>>;
  readonly required?: boolean;
}

export interface HaFormExpandable {
  readonly type: 'expandable';
  readonly name: string;
  readonly title: string;
  readonly schema: readonly HaFormSchema[];
}

export type HaFormSchema = HaFormSelectorField | HaFormExpandable;

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export const SECTION_LABELS: Readonly<Record<SectionId, string>> = {
  status: 'Status',
  pv: 'Solar',
  battery: 'Battery',
  grid: 'Grid',
  load: 'Load',
  temps: 'Temperatures',
};

const TAP_ACTION_LABELS: Readonly<Record<TapAction, string>> = {
  popup: 'Card popup',
  'more-info': 'More info (history)',
  none: 'None',
};

export const FIELD_LABELS: Readonly<Record<string, string>> = {
  title: 'Title',
  display: 'Display',
  show_totals: 'Combined card',
  parallel: 'Parallel system',
  master: 'Master inverter',
  sections: 'Tiles',
  prefix: 'Prefix',
  name: 'Name',
  battery_power: 'Invert battery power (positive = charging)',
  grid_power: 'Invert grid power (positive = export)',
};

export const FIELD_HELPERS: Readonly<Record<string, string>> = {
  show_totals: 'Adds a combined card when the card has two or more inverters',
  parallel:
    'Shared battery: SOC, voltage and temperature come from the master. Power, current and daily energy are summed.',
};

export const GENERAL_SCHEMA: readonly HaFormSchema[] = [
  { name: 'title', selector: { text: {} } },
  {
    name: 'display',
    selector: {
      select: {
        mode: 'list',
        options: [
          { value: 'detailed', label: 'Detailed' },
          { value: 'compact', label: 'Compact' },
        ],
      },
    },
  },
];

export function combinedSchema(inverters: readonly InverterConfig[]): HaFormSchema[] {
  return [
    { name: 'show_totals', selector: { boolean: {} } },
    { name: 'parallel', selector: { boolean: {} } },
    {
      name: 'master',
      selector: {
        select: {
          mode: 'dropdown',
          options: inverters.map((inverter) => ({
            value: inverter.prefix,
            label: `${inverter.name || inverter.prefix} · ${inverter.prefix}`,
          })),
        },
      },
    },
  ];
}

function tapActionOptions(tile: TileId): SelectOption[] {
  return TAP_ACTIONS.filter((action) => action !== 'popup' || supportsPopup(tile)).map(
    (action) => ({
      value: action,
      label: TAP_ACTION_LABELS[action],
    }),
  );
}

export const TAP_ACTIONS_SCHEMA: readonly HaFormSchema[] = TILE_IDS.map((tile) => ({
  name: tile,
  selector: { select: { mode: 'dropdown', options: tapActionOptions(tile) } },
}));

export const SECTIONS_SCHEMA: readonly HaFormSchema[] = [
  {
    name: 'sections',
    selector: {
      select: {
        multiple: true,
        mode: 'list',
        options: SECTION_IDS.map((section) => ({ value: section, label: SECTION_LABELS[section] })),
      },
    },
  },
];

export const INVERT_SCHEMA: readonly HaFormSchema[] = [
  {
    type: 'expandable',
    name: 'invert',
    title: 'Sign conventions',
    schema: [
      { name: 'battery_power', selector: { boolean: {} } },
      { name: 'grid_power', selector: { boolean: {} } },
    ],
  },
];

export function inverterSchema(prefixOptions: readonly string[]): HaFormSchema[] {
  const prefixSelector =
    prefixOptions.length > 0
      ? { select: { mode: 'dropdown', custom_value: true, options: prefixOptions } }
      : { text: {} };

  return [
    { name: 'prefix', required: true, selector: prefixSelector },
    { name: 'name', selector: { text: {} } },
  ];
}

export const OVERRIDES_SCHEMA: readonly HaFormSchema[] = SECTION_IDS.map((section) => ({
  type: 'expandable' as const,
  name: section,
  title: SECTION_LABELS[section],
  schema: getSectionKeys(section).map((key) => ({
    name: key,
    selector: { entity: { domain: [...getSensorDefinition(key).domains] } },
  })),
}));
