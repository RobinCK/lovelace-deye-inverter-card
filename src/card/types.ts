import type { TemplateResult } from 'lit';

import type { Series } from '../data/history';
import type { PanelModel } from '../data/panels';
import type { DisplayMode, ResolvedConfig, TileId } from '../types/config';
import type { FormatLocale } from '../utils/format';
import type { IconName } from './icons';

export type LoadStatus = 'loading' | 'ready';

export interface SparklineView {
  readonly status: LoadStatus;
  readonly back: Series;
  readonly front?: Series;
}

export interface OutageView {
  readonly status: LoadStatus;
  readonly slots: readonly boolean[];
}

export interface HistoryView {
  sparkline(panel: PanelModel): SparklineView;
  outage(panel: PanelModel): OutageView;
}

export interface RenderContext {
  readonly config: ResolvedConfig;
  readonly locale: FormatLocale;
  readonly now: number;
  readonly history: HistoryView;
  tap(panel: PanelModel, tile: TileId): void;
  moreInfo(entityId: string): void;
}

export type TileSectionId = Exclude<TileId, 'temps'>;

export interface TileRenderer {
  readonly id: TileSectionId;
  readonly label: string;
  icon(panel: PanelModel): IconName;
  isVisible(panel: PanelModel): boolean;
  primaryEntityId(panel: PanelModel): string | undefined;
  render(panel: PanelModel, ctx: RenderContext, display: DisplayMode): TemplateResult;
}
