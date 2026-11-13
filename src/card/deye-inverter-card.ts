import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { CARD_TYPE, DEFAULT_PREFIX, EDITOR_TYPE } from '../const';
import { normalizeConfig, suggestInverterName, supportsPopup } from '../config/normalize';
import { buildPanels, collectEntityIds, type PanelModel } from '../data/panels';
import { detectPrefixes } from '../data/prefix-detector';
import type { DeyeInverterCardConfig, PopupTileId, ResolvedConfig, TileId } from '../types/config';
import type { HomeAssistant, LovelaceGridOptions } from '../types/ha';
import { resolveFormatLocale, type FormatLocale } from '../utils/format';
import { CardHistoryController } from './history-controller';
import { renderPanel } from './panel';
import { cardLayoutStyles, cardStyles, themeTokens } from './styles';
import { TILE_RENDERERS } from './tiles';
import type { RenderContext } from './types';

interface OpenPopup {
  readonly panelId: string;
  readonly tile: PopupTileId;
}

const DETAILED_CARD_SIZE = 10;
const COMPACT_CARD_SIZE = 4;
const GRID_COLUMNS = 12;
const MIN_GRID_COLUMNS = 6;

export class DeyeInverterCard extends LitElement {
  static override styles = [themeTokens, cardLayoutStyles, cardStyles];

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @state() private accessor config: ResolvedConfig | undefined;

  @state() private accessor popup: OpenPopup | undefined;

  private readonly history = new CardHistoryController(this);
  private panels: PanelModel[] = [];
  private trackedEntityIds: string[] = [];
  private stateCount = 0;
  private locale: FormatLocale = resolveFormatLocale(undefined);

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(hass: HomeAssistant): DeyeInverterCardConfig {
    const prefixes = detectPrefixes(hass.states);
    const inverters = (prefixes.length > 0 ? prefixes : [DEFAULT_PREFIX]).map((prefix) => ({
      prefix,
      name: suggestInverterName(prefix),
    }));

    return { type: `custom:${CARD_TYPE}`, inverters };
  }

  setConfig(config: DeyeInverterCardConfig): void {
    this.config = normalizeConfig(config);
  }

  getCardSize(): number {
    if (!this.config) {
      return DETAILED_CARD_SIZE;
    }

    const panelCount = this.config.inverters.length + (this.hasTotals(this.config) ? 1 : 0);
    const panelSize = this.config.display === 'compact' ? COMPACT_CARD_SIZE : DETAILED_CARD_SIZE;

    return panelCount * panelSize;
  }

  getGridOptions(): LovelaceGridOptions {
    return { columns: GRID_COLUMNS, rows: 'auto', min_columns: MIN_GRID_COLUMNS };
  }

  protected override shouldUpdate(changed: PropertyValues<this>): boolean {
    if (changed.size !== 1 || !changed.has('hass')) {
      return true;
    }

    const previous = changed.get('hass');

    if (!previous || !this.hass) {
      return true;
    }

    if (Object.keys(this.hass.states).length !== this.stateCount) {
      return true;
    }

    return this.trackedEntityIds.some(
      (entityId) => previous.states[entityId] !== this.hass?.states[entityId],
    );
  }

  protected override willUpdate(): void {
    if (!this.hass || !this.config) {
      return;
    }

    this.locale = resolveFormatLocale(this.hass.locale, this.hass.language);
    this.panels = buildPanels(this.hass.states, this.config, this.locale);
    this.trackedEntityIds = collectEntityIds(this.panels);
    this.stateCount = Object.keys(this.hass.states).length;
  }

  protected override updated(): void {
    if (!this.hass || !this.config) {
      return;
    }

    this.history.sync(this.hass, this.panels, this.config, Date.now());
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const ctx = this.createContext(this.config);
    const popupPanel = this.popup
      ? this.panels.find((panel) => panel.id === this.popup?.panelId)
      : undefined;

    return html`${this.panels.map((panel) => renderPanel(panel, ctx))}
      <deye-inverter-popup
        .hass=${this.hass}
        .panel=${popupPanel}
        .tile=${this.popup?.tile}
        .config=${this.config}
        @popup-closed=${this.closePopup}
      ></deye-inverter-popup>`;
  }

  private createContext(config: ResolvedConfig): RenderContext {
    return {
      config,
      locale: this.locale,
      now: Date.now(),
      history: this.history,
      tap: (panel, tile) => this.handleTap(panel, tile),
      moreInfo: (entityId) => this.openMoreInfo(entityId),
    };
  }

  private hasTotals(config: ResolvedConfig): boolean {
    return config.showTotals && config.inverters.length > 1;
  }

  private handleTap(panel: PanelModel, tile: TileId): void {
    const action = this.config?.tapActions[tile];

    if (action === 'popup' && supportsPopup(tile)) {
      this.popup = { panelId: panel.id, tile: tile as PopupTileId };

      return;
    }

    if (action !== 'more-info') {
      return;
    }

    const entityId = TILE_RENDERERS.find((renderer) => renderer.id === tile)?.primaryEntityId(
      panel,
    );

    if (entityId) {
      this.openMoreInfo(entityId);
    }
  }

  private readonly closePopup = (): void => {
    this.popup = undefined;
  };

  private openMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }),
    );
  }
}
