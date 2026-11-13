import { SENSOR_DEFINITIONS, type SensorKey } from '../registry/sensors';
import type { ResolvedConfig, ResolvedInverter, SignKey } from '../types/config';
import type { HassEntities } from '../types/ha';
import type { FormatLocale } from '../utils/format';
import { resolveEntityId } from './entity-resolver';
import { readEntity, type Reading, type Readings } from './readings';
import { resolveInverterStatus, resolveTotalsStatus, type PanelStatus, type Tone } from './status';
import { aggregateReadings } from './totals';

export type PanelKind = 'inverter' | 'totals';

export interface MemberModel {
  readonly prefix: string;
  readonly name: string;
  readonly readings: Readings;
  readonly status: PanelStatus;
}

export interface FooterItem {
  readonly label: string;
  readonly key: SensorKey;
  readonly reading: Reading;
  readonly tone?: Tone;
}

export interface PanelModel {
  readonly id: string;
  readonly kind: PanelKind;
  readonly name: string;
  readonly readings: Readings;
  readonly status: PanelStatus;
  readonly members: readonly MemberModel[];
  readonly master: MemberModel;
  readonly isParallel: boolean;
  readonly isWholeBattery: boolean;
  readonly footer: readonly FooterItem[];
}

export const TOTALS_PANEL_ID = '__totals__';

const TEMPERATURE_FOOTER: readonly { readonly key: SensorKey; readonly label: string }[] = [
  { key: 'radiator_temperature', label: 'Radiator' },
  { key: 'dc_transformer_temperature', label: 'Transformer' },
];

export function readInverterReadings(
  states: HassEntities,
  inverter: ResolvedInverter,
  invert: Readonly<Record<SignKey, boolean>>,
): Readings {
  const readings: Readings = {};

  for (const definition of SENSOR_DEFINITIONS) {
    const entityId = resolveEntityId(states, inverter.prefix, definition.key, inverter.overrides);
    const entity = entityId ? states[entityId] : undefined;

    if (!entity) {
      continue;
    }

    readings[definition.key] = readEntity(definition.key, entity, invert);
  }

  return readings;
}

function buildMember(
  states: HassEntities,
  inverter: ResolvedInverter,
  config: ResolvedConfig,
  locale: FormatLocale,
): MemberModel {
  const readings = readInverterReadings(states, inverter, config.invert);

  return {
    prefix: inverter.prefix,
    name: inverter.name,
    readings,
    status: resolveInverterStatus(readings, locale),
  };
}

function inverterFooter(readings: Readings): FooterItem[] {
  return TEMPERATURE_FOOTER.flatMap(({ key, label }) => {
    const reading = readings[key];

    return reading ? [{ label, key, reading }] : [];
  });
}

function totalsFooter(members: readonly MemberModel[]): FooterItem[] {
  return members.flatMap((member) => {
    const reading = member.readings.radiator_temperature;

    if (!reading) {
      return [];
    }

    return [
      {
        label: member.name,
        key: 'radiator_temperature' as const,
        reading,
        tone: member.status.chip?.tone ?? 'neutral',
      },
    ];
  });
}

function buildInverterPanel(
  member: MemberModel,
  config: ResolvedConfig,
  memberCount: number,
): PanelModel {
  return {
    id: member.prefix,
    kind: 'inverter',
    name: member.name,
    readings: member.readings,
    status: member.status,
    members: [member],
    master: member,
    isParallel: config.isParallel && memberCount > 1,
    isWholeBattery: !(config.isParallel && memberCount > 1),
    footer: inverterFooter(member.readings),
  };
}

function buildTotalsPanel(members: readonly MemberModel[], config: ResolvedConfig): PanelModel {
  const master = members.find((member) => member.prefix === config.master) ?? members[0];

  return {
    id: TOTALS_PANEL_ID,
    kind: 'totals',
    name: config.title,
    readings: aggregateReadings(members, master.prefix, config.isParallel),
    status: resolveTotalsStatus(
      members.map((member) => member.status),
      master.status,
      master.name,
      config.isParallel,
    ),
    members,
    master,
    isParallel: config.isParallel,
    isWholeBattery: true,
    footer: totalsFooter(members),
  };
}

export function buildPanels(
  states: HassEntities,
  config: ResolvedConfig,
  locale: FormatLocale,
): PanelModel[] {
  const members = config.inverters.map((inverter) => buildMember(states, inverter, config, locale));
  const panels = members.map((member) => buildInverterPanel(member, config, members.length));

  if (config.showTotals && members.length > 1) {
    panels.push(buildTotalsPanel(members, config));
  }

  return panels;
}

export function collectEntityIds(panels: readonly PanelModel[]): string[] {
  const entityIds = new Set<string>();

  for (const panel of panels) {
    for (const member of panel.members) {
      for (const reading of Object.values(member.readings)) {
        entityIds.add(reading.entityId);
      }
    }
  }

  return [...entityIds];
}
