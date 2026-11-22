import { css } from 'lit';

export const popupStyles = css`
  :host {
    display: block;
  }

  dialog {
    box-sizing: border-box;
    width: min(560px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: 0;
    overflow: auto;
    overscroll-behavior: contain;
    border: none;
    border-radius: var(--ha-dialog-border-radius, 24px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--deye-text);
    font-family: var(--ha-font-family-body, inherit);
    box-shadow: var(--ha-card-box-shadow, none);
  }

  dialog::backdrop {
    background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32));
  }

  .top-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 64px;
    padding: 0 8px;
  }

  .icon-button {
    all: unset;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: var(--deye-text);
    cursor: pointer;
  }

  .icon-button:hover {
    background: var(--deye-surface-hover);
  }

  .icon-button:focus-visible {
    box-shadow: 0 0 0 2px var(--deye-focus);
  }

  .heading {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    padding-left: 4px;
  }

  .heading h2 {
    margin: 0;
    color: var(--deye-text);
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
  }

  .heading span {
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 24px 0;
  }

  .hero-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .hero-value.percent {
    gap: 2px;
  }

  .hero-value .number {
    color: var(--deye-text);
    font-size: 56px;
    line-height: 64px;
  }

  .hero-value .unit {
    color: var(--deye-muted);
    font-size: 22px;
  }

  .hero-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
    padding-bottom: 8px;
  }

  .hero-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--tone-color, var(--deye-muted));
    font-size: 14px;
    font-weight: 500;
  }

  .hero-status .icon-fill {
    fill: currentColor;
    stroke: none;
  }

  .hero-main {
    color: var(--deye-text);
    font-size: 22px;
    line-height: 28px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .hero-main small {
    color: var(--deye-muted);
    font-size: 14px;
  }

  .hero-note {
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .section {
    padding: 24px 24px 0;
  }

  .section:last-child {
    padding-bottom: 24px;
  }

  .section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
    min-height: 32px;
  }

  .section-head h3,
  .section > h3 {
    margin: 0;
    color: var(--deye-text);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .section > h3 {
    margin-bottom: 8px;
  }

  .legend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .swatch {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .swatch.stroke {
    width: 12px;
    height: 2px;
    border-radius: 1px;
  }

  .range {
    display: inline-grid;
    grid-auto-flow: column;
    height: 30px;
    margin-left: auto;
    overflow: hidden;
    border: 1px solid var(--deye-outline);
    border-radius: 15px;
  }

  .range button {
    all: unset;
    padding: 0 14px;
    color: var(--deye-muted);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
  }

  .range button[aria-pressed='true'] {
    background: var(--deye-surface-hover);
    color: var(--deye-text);
  }

  .range button:focus-visible {
    box-shadow: inset 0 0 0 2px var(--deye-focus);
  }

  .chart {
    display: block;
    width: 100%;
    height: auto;
    margin-top: 12px;
    overflow: visible;
  }

  .chart .grid-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    stroke-dasharray: 3 4;
  }

  .chart .base-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  }

  .chart .tick-line {
    stroke: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }

  .chart text {
    fill: var(--deye-muted);
    font-family: inherit;
    font-size: 10px;
  }

  .chart-axis {
    position: relative;
    height: 14px;
    margin-top: 6px;
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .chart-axis span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .chart-axis .now {
    right: 0;
    transform: none;
  }

  .chart-status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    margin-top: 12px;
    border-radius: 12px;
    background: var(--deye-surface);
    color: var(--deye-muted);
    font-size: 12px;
  }

  .chart-status.loading {
    animation: deye-skeleton 1.6s ease-in-out infinite;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .stats + .stats {
    padding-top: 10px;
  }

  .stat {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    height: 72px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--deye-surface);
    cursor: pointer;
  }

  .stat-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    height: 16px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat-head span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat-value {
    color: var(--deye-text);
    font-size: 18px;
    line-height: 22px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .stat-value small {
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat-source {
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    white-space: nowrap;
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .row {
    all: unset;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--primary-text-color) 3%, transparent);
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  .row-head {
    display: grid;
    align-items: center;
    gap: 12px;
    height: 24px;
    padding: 0 12px;
    color: var(--deye-muted);
    font-size: 12px;
  }

  .stat:hover,
  .row:hover {
    background: var(--deye-surface-hover);
  }

  .stat:focus-visible,
  .row:focus-visible {
    box-shadow: 0 0 0 2px var(--deye-focus);
  }

  .cell-text {
    min-width: 0;
    overflow: hidden;
    color: var(--deye-text);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cell-text.muted,
  .cell-muted {
    color: var(--deye-muted);
  }

  .num {
    color: var(--deye-text);
    text-align: right;
    white-space: nowrap;
  }

  .num.muted {
    color: var(--deye-muted);
    font-size: 13px;
  }

  .share {
    display: block;
    height: 6px;
    overflow: hidden;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .share span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--share-color);
  }

  .battery-fill {
    background: var(--deye-battery-color);
  }

  .discharge-fill {
    background: var(--deye-discharge-color);
  }

  .chart.bars {
    margin-top: 8px;
  }

  .bars .charge {
    fill: var(--deye-battery-color);
  }

  .bars .discharge {
    fill: var(--deye-discharge-color);
  }

  .row-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tone-color);
  }

  .big-cells {
    display: flex;
    align-items: center;
    padding: 14px 24px 0;
  }

  .big-cells .battery-visual {
    flex: 1;
    height: auto;
  }

  .big-cells .cells {
    gap: 4px;
    height: 36px;
    padding: 4px;
    border-width: 2px;
    border-radius: 9px;
  }

  .big-cells .cell {
    border-radius: 3px;
  }

  .big-cells .nub {
    width: 5px;
    height: 14px;
    margin-left: 3px;
    border-radius: 0 3px 3px 0;
  }

  @media (max-width: 420px) {
    .hero-value.percent {
      gap: 2px;
    }

    .hero-value .number {
      font-size: 44px;
      line-height: 52px;
    }

    .row {
      gap: 8px;
    }
  }
`;
