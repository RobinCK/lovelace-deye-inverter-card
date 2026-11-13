import { html, type TemplateResult } from 'lit';

import { PV_STRINGS } from '../const';
import { pvPowerReading, pvStringKeys } from '../data/derived';
import type { PanelModel } from '../data/panels';
import type { PopupTileId, ResolvedConfig } from '../types/config';
import type { HomeAssistant } from '../types/ha';
import { pluralize } from '../utils/format';

export interface PopupDefinition {
  readonly title: string;
  subtitle(panel: PanelModel): string;
  historyEntityId(panel: PanelModel): string | undefined;
  body(panel: PanelModel, hass: HomeAssistant, config: ResolvedConfig): TemplateResult;
}

function countStrings(panel: PanelModel): number {
  return panel.members.reduce(
    (count, member) =>
      count + PV_STRINGS.filter((index) => member.readings[pvStringKeys(index).power]).length,
    0,
  );
}

const SOLAR_POPUP: PopupDefinition = {
  title: 'Solar',

  subtitle(panel: PanelModel): string {
    const parts = [panel.name];
    const strings = countStrings(panel);

    if (panel.members.length > 1) {
      parts.push(pluralize(panel.members.length, 'inverter'));
    }

    if (strings > 0) {
      parts.push(pluralize(strings, 'string'));
    }

    return parts.join(' · ');
  },

  historyEntityId: (panel) => pvPowerReading(panel.readings)?.entityId,

  body: (panel, hass) =>
    html`<deye-solar-popup-body .hass=${hass} .panel=${panel}></deye-solar-popup-body>`,
};

const BATTERY_POPUP: PopupDefinition = {
  title: 'Battery',

  subtitle(panel: PanelModel): string {
    if (panel.kind === 'inverter') {
      return panel.name;
    }

    if (panel.isParallel) {
      return `${panel.name} · parallel · BMS data from ${panel.master.name}`;
    }

    return `${panel.name} · ${pluralize(panel.members.length, 'inverter')}`;
  },

  historyEntityId: (panel) => panel.readings.battery_soc?.entityId,

  body: (panel, hass, config) =>
    html`<deye-battery-popup-body
      .hass=${hass}
      .panel=${panel}
      .config=${config}
    ></deye-battery-popup-body>`,
};

export const POPUP_DEFINITIONS: Readonly<Record<PopupTileId, PopupDefinition>> = {
  pv: SOLAR_POPUP,
  battery: BATTERY_POPUP,
};
