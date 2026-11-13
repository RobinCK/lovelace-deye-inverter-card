import { html, nothing, type TemplateResult } from 'lit';

import type { FooterItem, PanelModel } from '../data/panels';
import { formatReading } from '../data/readings';
import { icon } from './icons';
import { renderTile } from './tiles/frame';
import { TILE_RENDERERS } from './tiles';
import type { RenderContext } from './types';

function renderHeader(panel: PanelModel, ctx: RenderContext): TemplateResult {
  const hasStatus = ctx.config.sections.has('status');
  const { chip, line } = panel.status;

  return html`<header class="header">
    <div class="title-row">
      <h2 class="name">${panel.name}</h2>
      ${hasStatus && chip ? html`<span class="chip ${chip.tone}">${chip.label}</span>` : nothing}
    </div>
    ${
      hasStatus && line
        ? html`<p class="line ${line.tone}">
            ${line.isFault ? icon('warning', 13) : nothing}<span>${line.text}</span>
          </p>`
        : nothing
    }
  </header>`;
}

function renderFooterItem(item: FooterItem, ctx: RenderContext): TemplateResult {
  const content = html`${
      item.tone
        ? html`<span class="foot-dot ${item.tone}"></span>`
        : icon('thermometer', 14, 'foot-icon')
    }
    <span class="foot-label">${item.label}</span>
    <span class="foot-value"
      >${formatReading(item.key, item.reading, ctx.locale)} ${item.reading.unit}</span
    >`;

  if (ctx.config.tapActions.temps === 'none') {
    return html`<div class="foot-item">${content}</div>`;
  }

  return html`<button
    type="button"
    class="foot-item"
    @click=${() => ctx.moreInfo(item.reading.entityId)}
  >
    ${content}
  </button>`;
}

function renderFooter(panel: PanelModel, ctx: RenderContext): TemplateResult | typeof nothing {
  if (
    ctx.config.display === 'compact' ||
    !ctx.config.sections.has('temps') ||
    panel.footer.length === 0
  ) {
    return nothing;
  }

  return html`<div class="footer">${panel.footer.map((item) => renderFooterItem(item, ctx))}</div>`;
}

export function renderPanel(panel: PanelModel, ctx: RenderContext): TemplateResult {
  const display = ctx.config.display;
  const tiles = TILE_RENDERERS.filter(
    (renderer) => ctx.config.sections.has(renderer.id) && renderer.isVisible(panel),
  );

  return html`<ha-card class="panel ${display}">
    ${renderHeader(panel, ctx)}
    ${
      tiles.length > 0
        ? html`<div class="tiles">
            ${tiles.map((renderer) => renderTile(renderer, panel, ctx, display))}
          </div>`
        : nothing
    }
    ${renderFooter(panel, ctx)}
  </ha-card>`;
}
