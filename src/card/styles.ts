import { css } from 'lit';

export const themeTokens = css`
  :host {
    --deye-solar-color: var(--energy-solar-color, var(--amber-color));
    --deye-battery-color: var(--success-color);
    --deye-grid-color: var(--energy-grid-consumption-color, var(--info-color));
    --deye-load-color: var(--purple-color, var(--accent-color));
    --deye-discharge-color: var(--orange-color, var(--warning-color));
    --deye-ok-color: var(--success-color);
    --deye-warning-color: var(--warning-color);
    --deye-error-color: var(--error-color);
    --deye-info-color: var(--info-color);
    --deye-text: var(--primary-text-color);
    --deye-muted: var(--secondary-text-color);
    --deye-disabled: var(--disabled-text-color);
    --deye-surface: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    --deye-surface-hover: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    --deye-surface-solid: color-mix(
      in srgb,
      var(--primary-text-color) 4%,
      var(--ha-card-background, var(--card-background-color))
    );
    --deye-track: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    --deye-outline: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
    --deye-axis: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    --deye-focus: var(--primary-color);
  }

  @keyframes deye-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.7;
    }
  }

  @keyframes deye-breath {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @keyframes deye-skeleton {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }

  .ok {
    --tone-color: var(--deye-ok-color);
  }

  .warning {
    --tone-color: var(--deye-warning-color);
  }

  .error {
    --tone-color: var(--deye-error-color);
  }

  .info {
    --tone-color: var(--deye-info-color);
  }

  .neutral {
    --tone-color: var(--deye-muted);
  }
`;

export const cardLayoutStyles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
    gap: 8px;
    align-items: start;
  }
`;

export const cardStyles = css`
  ha-card.panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    padding: 18px;
    container-type: inline-size;
  }

  ha-card.panel.compact {
    padding: 15px;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 24px;
  }

  .name {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-text);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 6px;
    height: 22px;
    padding: 0 9px;
    border-radius: 11px;
    background: color-mix(in srgb, var(--tone-color) 14%, transparent);
    color: var(--tone-color);
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }

  .chip::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    height: 18px;
    margin: 0;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 18px;
  }

  .line.warning,
  .line.error {
    color: var(--tone-color);
  }

  .line .icon {
    flex: none;
  }

  .line span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tiles {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 14px;
  }

  .tile {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
    min-width: 0;
    min-height: 176px;
    padding: 14px;
    overflow: hidden;
    border-radius: 12px;
    background: var(--deye-surface);
    color: var(--deye-text);
    font-family: inherit;
    transition: background-color 120ms ease;
  }

  .tile.pv {
    --tile-color: var(--deye-solar-color);
  }

  .tile.battery {
    --tile-color: var(--deye-battery-color);
  }

  .tile.grid {
    --tile-color: var(--deye-grid-color);
  }

  .tile.load {
    --tile-color: var(--deye-load-color);
  }

  button.tile,
  button.foot-item {
    cursor: pointer;
  }

  button.tile:hover,
  button.foot-item:hover {
    background: var(--deye-surface-hover);
  }

  button.tile:hover .tile-label,
  button.tile:hover .tile-action {
    color: var(--deye-text);
  }

  button.tile:focus-visible,
  button.foot-item:focus-visible {
    box-shadow:
      0 0 0 2px var(--ha-card-background, var(--card-background-color)),
      0 0 0 4px var(--deye-focus);
  }

  .tile-head {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 20px;
  }

  .tile-icon {
    flex: none;
    color: var(--tile-color);
  }

  .tile-icon .icon-slash {
    color: var(--deye-warning-color);
  }

  .tile-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 13px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-action {
    flex: none;
    color: var(--deye-muted);
  }

  .value-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    height: 34px;
  }

  .tile > .value {
    height: 34px;
  }

  .value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .value .number {
    color: var(--deye-text);
    font-size: 28px;
    line-height: 34px;
  }

  .value .unit {
    color: var(--deye-muted);
    font-size: 13px;
  }

  .value.percent {
    gap: 2px;
  }

  .value.percent .unit {
    font-size: 15px;
  }

  .value.muted .number {
    color: var(--deye-muted);
  }

  .value.disabled .number,
  .value.disabled .unit {
    color: var(--deye-disabled);
  }

  .value.warning .number {
    color: var(--deye-warning-color);
  }

  .value.error .number {
    color: var(--deye-error-color);
  }

  .side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
    padding-bottom: 3px;
  }

  .side-value {
    color: var(--deye-text);
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .side-note {
    max-width: 100%;
    overflow: hidden;
    color: var(--tone-color, var(--deye-muted));
    font-size: 12px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .value-row > .side-note {
    padding-bottom: 6px;
  }

  .side-note.accent {
    color: var(--tile-color);
  }

  .side-note.muted {
    color: var(--deye-muted);
  }

  .visual {
    position: relative;
    display: block;
    height: 52px;
  }

  .caption {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 16px;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .caption > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .caption .warning {
    color: var(--deye-warning-color);
  }

  .caption .icon.warning {
    flex: none;
    color: var(--deye-warning-color);
  }

  .sparkline svg {
    display: block;
    overflow: visible;
  }

  .sparkline .baseline {
    stroke: var(--deye-axis);
    stroke-width: 1;
    stroke-dasharray: 2 3;
    vector-effect: non-scaling-stroke;
  }

  .sparkline .area.back {
    fill: color-mix(in srgb, var(--deye-solar-color) 22%, transparent);
  }

  .sparkline .area.back.stacked {
    fill: color-mix(in srgb, var(--deye-solar-color) 16%, transparent);
  }

  .sparkline .area.front {
    fill: color-mix(in srgb, var(--deye-solar-color) 34%, transparent);
  }

  .sparkline .line {
    fill: none;
    stroke: var(--deye-solar-color);
    stroke-width: 1.75;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .sparkline .dot {
    position: absolute;
    width: 8px;
    height: 8px;
    margin: -4px 0 0 -4px;
    border-radius: 50%;
    background: var(--deye-disabled);
    box-shadow: 0 0 0 3px var(--deye-surface-solid);
  }

  .sparkline .dot.live {
    background: var(--deye-solar-color);
    animation: deye-pulse 2.4s ease-in-out infinite;
  }

  .skeleton {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 6px;
  }

  .bone {
    display: block;
    border-radius: 6px;
    background: var(--deye-surface-hover);
    animation: deye-skeleton 1.6s ease-in-out infinite;
  }

  .bone.short {
    width: 72%;
    height: 8px;
    border-radius: 4px;
  }

  .bone.tall {
    width: 100%;
    height: 22px;
  }

  .bone.wide {
    width: 100%;
    height: 10px;
  }

  .battery-visual {
    display: flex;
    align-items: center;
    height: 52px;
  }

  .battery-visual.level-normal {
    --level-color: var(--deye-ok-color);
  }

  .battery-visual.level-low {
    --level-color: var(--deye-warning-color);
  }

  .battery-visual.level-critical {
    --level-color: var(--deye-error-color);
  }

  .cells {
    box-sizing: border-box;
    display: grid;
    flex: 1;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 3px;
    height: 30px;
    padding: 3px;
    border: 1.5px solid var(--deye-outline);
    border-radius: 7px;
  }

  .nub {
    flex: none;
    width: 3px;
    height: 10px;
    margin-left: 2px;
    border-radius: 0 2px 2px 0;
    background: var(--deye-outline);
  }

  .battery-visual.level-low .cells,
  .battery-visual.level-critical .cells {
    border-color: color-mix(in srgb, var(--level-color) 45%, transparent);
  }

  .battery-visual.level-low .nub,
  .battery-visual.level-critical .nub {
    background: color-mix(in srgb, var(--level-color) 45%, transparent);
  }

  .cell {
    display: block;
    overflow: hidden;
    border-radius: 2px;
    background: var(--deye-track);
  }

  .cell .fill {
    display: block;
    height: 100%;
    background: var(--level-color);
  }

  .cell .fill.breathing {
    animation: deye-breath 2.4s ease-in-out infinite;
  }

  .phases {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .phase {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
  }

  .bidi {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 36px;
  }

  .half {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
  }

  .half.up {
    align-items: flex-end;
  }

  .half.down {
    align-items: flex-start;
  }

  .axis {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--deye-axis);
  }

  .half .bar {
    display: block;
    width: 16px;
    background: var(--tile-color);
  }

  .half.up .bar {
    border-radius: 3px 3px 0 0;
  }

  .half.down .bar {
    border-radius: 0 0 3px 3px;
  }

  .track {
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    width: 16px;
    height: 36px;
    overflow: hidden;
    border-radius: 3px;
    background: var(--deye-track);
  }

  .track .bar {
    display: block;
    width: 100%;
    border-radius: 3px;
    background: var(--tile-color);
  }

  .track.placeholder {
    border: 1px dashed var(--deye-outline);
    background: transparent;
  }

  .phase-label {
    max-width: 100%;
    margin-top: 2px;
    overflow: hidden;
    color: var(--deye-text);
    font-size: 11px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .phase-label.muted,
  .phase-name {
    color: var(--deye-muted);
  }

  .phase-name.warning {
    color: var(--deye-warning-color);
  }

  .outage {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .strip {
    display: grid;
    height: 14px;
    overflow: hidden;
    border-radius: 4px;
  }

  .slot {
    display: block;
    background: color-mix(in srgb, var(--deye-grid-color) 45%, transparent);
  }

  .slot.down {
    background: var(--deye-warning-color);
  }

  .strip-axis {
    position: relative;
    display: block;
    height: 14px;
    margin-top: 4px;
    color: var(--deye-muted);
    font-size: 11px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .tick {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .tick.now {
    right: 0;
    transform: none;
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .foot-item {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    background: var(--deye-surface);
    font-family: inherit;
  }

  .foot-icon {
    flex: none;
    color: var(--deye-muted);
  }

  .foot-dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tone-color);
  }

  .foot-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--deye-muted);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .foot-value {
    flex: none;
    color: var(--deye-text);
    font-size: 13px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .compact .tiles {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin-top: 12px;
  }

  .compact .tile {
    gap: 2px;
    min-height: 98px;
    padding: 10px;
    border-radius: 10px;
  }

  .compact .tile-head {
    height: 16px;
  }

  .compact .tile-label {
    font-size: 12px;
    line-height: 16px;
  }

  .compact .tile > .value {
    height: 24px;
    overflow: hidden;
  }

  .compact .value {
    gap: 3px;
  }

  .compact .value .number {
    font-size: 18px;
    line-height: 24px;
  }

  .compact .value .unit {
    font-size: 11px;
  }

  .compact .visual,
  .compact .battery-visual {
    height: 22px;
  }

  .compact .cells {
    gap: 2px;
    height: 10px;
    padding: 0;
    border: none;
    border-radius: 0;
  }

  .compact .nub {
    display: none;
  }

  .compact .phases {
    gap: 4px;
  }

  .compact .bidi,
  .compact .track {
    height: 22px;
  }

  .compact .half .bar,
  .compact .track {
    width: 8px;
  }

  .compact .half.up .bar {
    border-radius: 2px 2px 0 0;
  }

  .compact .half.down .bar {
    border-radius: 0 0 2px 2px;
  }

  .compact .track .bar {
    border-radius: 2px;
  }

  .compact .sparkline .dot {
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    box-shadow: 0 0 0 2px var(--deye-surface-solid);
  }

  .compact .strip {
    height: 10px;
  }

  @container (max-width: 340px) {
    .tiles {
      gap: 8px;
    }

    .tile {
      padding: 12px;
    }

    .value .number {
      font-size: 24px;
    }

    .phase-name,
    .foot-icon {
      display: none;
    }
  }

  @container (max-width: 300px) {
    .compact .tiles {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
