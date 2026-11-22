import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { icon } from '../card/icons';
import { themeTokens } from '../card/styles';
import type { PanelModel } from '../data/panels';
import type { PopupTileId, ResolvedConfig } from '../types/config';
import type { HomeAssistant } from '../types/ha';
import { lockScroll, type ScrollUnlock } from '../utils/scroll-lock';
import { POPUP_DEFINITIONS } from './definitions';
import { fireMoreInfo } from './parts';
import { popupStyles } from './styles';

const TITLE_ID = 'deye-popup-title';

export class DeyeInverterPopup extends LitElement {
  static override styles = [themeTokens, popupStyles];

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @property({ attribute: false }) accessor panel: PanelModel | undefined;

  @property({ attribute: false }) accessor tile: PopupTileId | undefined;

  @property({ attribute: false }) accessor config: ResolvedConfig | undefined;

  private unlockScroll: ScrollUnlock | undefined;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.releaseScroll();
  }

  protected override render(): TemplateResult {
    return html`<dialog
      aria-labelledby=${TITLE_ID}
      @close=${this.handleClose}
      @click=${this.handleBackdropClick}
      @hass-more-info=${this.handleMoreInfo}
    >
      ${this.renderContent()}
    </dialog>`;
  }

  protected override updated(): void {
    const dialog = this.dialog;
    const isOpen = this.isActive();

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      this.unlockScroll ??= lockScroll(this);

      return;
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }

  private get dialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector('dialog');
  }

  private isActive(): boolean {
    return Boolean(this.hass && this.panel && this.tile && this.config);
  }

  private renderContent(): TemplateResult | typeof nothing {
    if (!this.hass || !this.panel || !this.tile || !this.config) {
      return nothing;
    }

    const definition = POPUP_DEFINITIONS[this.tile];
    const historyEntityId = definition.historyEntityId(this.panel);

    return html`<div class="top-bar">
        <button type="button" class="icon-button" aria-label="Close" @click=${this.close}>
          ${icon('close', 22)}
        </button>
        <div class="heading">
          <h2 id=${TITLE_ID}>${definition.title}</h2>
          <span>${definition.subtitle(this.panel)}</span>
        </div>
        ${
          historyEntityId
            ? html`<button
                type="button"
                class="icon-button"
                aria-label="Open history"
                @click=${(event: Event) => fireMoreInfo(event.currentTarget, historyEntityId)}
              >
                ${icon('chart', 20)}
              </button>`
            : nothing
        }
      </div>
      ${definition.body(this.panel, this.hass, this.config)}`;
  }

  private readonly close = (): void => {
    this.dialog?.close();
  };

  private readonly handleClose = (): void => {
    this.releaseScroll();
    this.dispatchEvent(new CustomEvent('popup-closed'));
  };

  private releaseScroll(): void {
    this.unlockScroll?.();
    this.unlockScroll = undefined;
  }

  private readonly handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  private readonly handleMoreInfo = (): void => {
    this.close();
  };
}
