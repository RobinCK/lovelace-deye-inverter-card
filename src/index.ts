import {
  BATTERY_POPUP_BODY_TYPE,
  CARD_DESCRIPTION,
  CARD_NAME,
  CARD_TYPE,
  DOCUMENTATION_URL,
  EDITOR_TYPE,
  POPUP_TYPE,
  SOLAR_POPUP_BODY_TYPE,
} from './const';
import { DeyeInverterCard } from './card/deye-inverter-card';
import { DeyeInverterCardEditor } from './editor/deye-inverter-card-editor';
import { DeyeBatteryPopupBody } from './popup/battery-popup-body';
import { DeyeInverterPopup } from './popup/deye-inverter-popup';
import { DeyeSolarPopupBody } from './popup/solar-popup-body';

const ELEMENTS: readonly (readonly [string, CustomElementConstructor])[] = [
  [CARD_TYPE, DeyeInverterCard],
  [EDITOR_TYPE, DeyeInverterCardEditor],
  [POPUP_TYPE, DeyeInverterPopup],
  [SOLAR_POPUP_BODY_TYPE, DeyeSolarPopupBody],
  [BATTERY_POPUP_BODY_TYPE, DeyeBatteryPopupBody],
];

for (const [name, element] of ELEMENTS) {
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
}

window.customCards = window.customCards ?? [];

if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: CARD_DESCRIPTION,
    preview: true,
    documentationURL: DOCUMENTATION_URL,
  });
}

console.info(`%c ${CARD_NAME.toUpperCase()} %c ${__CARD_VERSION__} `, 'font-weight: bold', '');
