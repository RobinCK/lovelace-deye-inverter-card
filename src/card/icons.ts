import { html, svg, type SVGTemplateResult, type TemplateResult } from 'lit';

export type IconName =
  | 'sun'
  | 'battery'
  | 'grid'
  | 'gridOff'
  | 'home'
  | 'chevron'
  | 'chart'
  | 'thermometer'
  | 'warning'
  | 'info'
  | 'close'
  | 'bolt'
  | 'pencil'
  | 'trash'
  | 'plus'
  | 'back';

const ICON_PATHS: Readonly<Record<IconName, SVGTemplateResult>> = {
  sun: svg`<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>`,
  battery: svg`<rect x="2" y="7" width="17" height="10" rx="2"></rect><path d="M22 11v2"></path>`,
  grid: svg`<path d="M8 21l4-18 4 18M6 9h12M5 13h14M9.5 17h5"></path>`,
  gridOff: svg`<path d="M8 21l4-18 4 18M6 9h12M5 13h14M9.5 17h5"></path><path class="icon-slash" d="M3 3l18 18"></path>`,
  home: svg`<path d="M3 11l9-7 9 7"></path><path d="M5 10v10h14V10"></path>`,
  chevron: svg`<path d="M9 6l6 6-6 6"></path>`,
  chart: svg`<path d="M4 4v16h16"></path><path d="M8 14l3.5-4 3 3 4.5-6"></path>`,
  thermometer: svg`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"></path>`,
  warning: svg`<path d="M12 3l10 18H2L12 3z"></path><path d="M12 10v4M12 17.5h.01"></path>`,
  info: svg`<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6M12 16.5h.01"></path>`,
  close: svg`<path d="M6 6l12 12M18 6L6 18"></path>`,
  bolt: svg`<path class="icon-fill" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"></path>`,
  pencil: svg`<path d="M4 20h4L18 10l-4-4L4 16v4z"></path><path d="M13.5 6.5l4 4"></path>`,
  trash: svg`<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"></path>`,
  plus: svg`<path d="M12 5v14M5 12h14"></path>`,
  back: svg`<path d="M19 12H5M11 6l-6 6 6 6"></path>`,
};

export function icon(name: IconName, size: number, className = ''): TemplateResult {
  return html`<svg
    class="icon ${className}"
    width=${size}
    height=${size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${ICON_PATHS[name]}
  </svg>`;
}
