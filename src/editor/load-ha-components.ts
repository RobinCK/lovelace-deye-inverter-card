interface ConfigurableCard {
  getConfigElement?: () => Promise<unknown> | unknown;
}

export async function loadHaComponents(): Promise<void> {
  if (customElements.get('ha-form') && customElements.get('ha-selector')) {
    return;
  }

  const helpers = await window.loadCardHelpers?.();

  if (!helpers) {
    return;
  }

  const card = await helpers.createCardElement({ type: 'entities', entities: [] });
  const cardClass = card.constructor as ConfigurableCard;

  await cardClass.getConfigElement?.();
}
