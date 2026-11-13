import { html, nothing, type TemplateResult } from 'lit';

import type { PanelModel } from '../../data/panels';
import type { DisplayMode, TapAction } from '../../types/config';
import { icon } from '../icons';
import type { RenderContext, TileRenderer } from '../types';

function actionIcon(action: TapAction): TemplateResult | typeof nothing {
  if (action === 'popup') {
    return icon('chevron', 14, 'tile-action');
  }

  return action === 'more-info' ? icon('chart', 14, 'tile-action') : nothing;
}

function tileHead(
  renderer: TileRenderer,
  panel: PanelModel,
  action: TapAction,
  display: DisplayMode,
): TemplateResult {
  if (display === 'compact') {
    return html`<span class="tile-head"><span class="tile-label">${renderer.label}</span></span>`;
  }

  return html`<span class="tile-head">
    ${icon(renderer.icon(panel), 16, 'tile-icon')}
    <span class="tile-label">${renderer.label}</span>
    ${actionIcon(action)}
  </span>`;
}

function isInteractive(renderer: TileRenderer, panel: PanelModel, action: TapAction): boolean {
  if (action === 'none') {
    return false;
  }

  return action === 'popup' || renderer.primaryEntityId(panel) !== undefined;
}

export function renderTile(
  renderer: TileRenderer,
  panel: PanelModel,
  ctx: RenderContext,
  display: DisplayMode,
): TemplateResult {
  const action = ctx.config.tapActions[renderer.id];
  const head = tileHead(renderer, panel, action, display);
  const body = renderer.render(panel, ctx, display);

  if (!isInteractive(renderer, panel, action)) {
    return html`<div class="tile ${renderer.id}">${head}${body}</div>`;
  }

  return html`<button
    type="button"
    class="tile ${renderer.id}"
    aria-haspopup=${action === 'popup' ? 'dialog' : nothing}
    @click=${() => ctx.tap(panel, renderer.id)}
  >
    ${head}${body}
  </button>`;
}
