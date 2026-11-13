import type { CustomCardEntry, LovelaceCardHelpers } from './types/ha';

declare global {
  const __CARD_VERSION__: string;

  interface Window {
    customCards?: CustomCardEntry[];
    loadCardHelpers?: () => Promise<LovelaceCardHelpers>;
  }
}
