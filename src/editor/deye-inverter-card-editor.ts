import { css, html, LitElement, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { icon } from '../card/icons';
import { themeTokens } from '../card/styles';
import { DEFAULT_PREFIX, SECTION_IDS } from '../const';
import { DEFAULT_TAP_ACTIONS, suggestInverterName } from '../config/normalize';
import { findAutoEntityId } from '../data/entity-resolver';
import { detectPrefixes } from '../data/prefix-detector';
import { getSectionKeys, getSensorDefinition, isSensorKey } from '../registry/sensors';
import type {
  DeyeInverterCardConfig,
  EntityOverrides,
  InverterConfig,
  SectionId,
} from '../types/config';
import type { HomeAssistant } from '../types/ha';
import { pluralize } from '../utils/format';
import { loadHaComponents } from './load-ha-components';
import {
  combinedSchema,
  FIELD_HELPERS,
  FIELD_LABELS,
  GENERAL_SCHEMA,
  INVERT_SCHEMA,
  inverterSchema,
  OVERRIDES_SCHEMA,
  SECTION_LABELS,
  SECTIONS_SCHEMA,
  TAP_ACTIONS_SCHEMA,
  type HaFormSchema,
} from './schema';

type FormData = Readonly<Record<string, unknown>>;
type MutableConfig = { -readonly [K in keyof DeyeInverterCardConfig]: DeyeInverterCardConfig[K] };

interface ValueChangedEvent extends Event {
  readonly detail: { readonly value: FormData };
}

function withoutUndefined<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as T;
}

function omitKey<T>(
  record: Readonly<Record<string, T>>,
  key: string | undefined,
): Record<string, T> {
  return Object.fromEntries(Object.entries(record).filter(([entryKey]) => entryKey !== key));
}

function emptyToUndefined<T>(
  record: Readonly<Record<string, T>>,
): Readonly<Record<string, T>> | undefined {
  return Object.keys(record).length > 0 ? record : undefined;
}

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

function toOverrides(data: FormData): EntityOverrides {
  const overrides: Record<string, string> = {};

  for (const group of Object.values(data)) {
    if (!group || typeof group !== 'object') {
      continue;
    }

    for (const [key, entityId] of Object.entries(group)) {
      if (isSensorKey(key) && typeof entityId === 'string' && entityId) {
        overrides[key] = entityId;
      }
    }
  }

  return overrides;
}

function groupOverrides(overrides: EntityOverrides): Record<SectionId, EntityOverrides> {
  return Object.fromEntries(
    SECTION_IDS.map((section) => [
      section,
      Object.fromEntries(
        getSectionKeys(section)
          .filter((key) => overrides[key])
          .map((key) => [key, overrides[key]]),
      ),
    ]),
  ) as Record<SectionId, EntityOverrides>;
}

export class DeyeInverterCardEditor extends LitElement {
  static override styles = [
    themeTokens,
    css`
      :host {
        display: block;
      }

      .editor {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }

      .block {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .block.boxed {
        gap: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
      }

      .block-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }

      h3 {
        margin: 0;
        color: var(--primary-text-color);
        font-size: 14px;
        font-weight: 500;
      }

      .hint {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 16px;
      }

      .inverter {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto 44px 44px;
        align-items: center;
        gap: 2px;
        min-height: 56px;
        padding: 0 4px 0 14px;
        border-radius: 10px;
        background: var(--deye-surface);
      }

      .inverter-name {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .inverter-name span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .inverter-name .prefix {
        color: var(--secondary-text-color);
        font-family: var(--ha-font-family-code, monospace);
        font-size: 12px;
      }

      .overrides {
        padding-right: 8px;
        color: var(--secondary-text-color);
        font-size: 12px;
        white-space: nowrap;
      }

      .icon-button {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        cursor: pointer;
      }

      .icon-button:hover {
        background: var(--deye-surface-hover);
        color: var(--primary-text-color);
      }

      .icon-button:focus-visible,
      .add:focus-visible {
        box-shadow: 0 0 0 2px var(--primary-color);
      }

      .add {
        all: unset;
        display: inline-flex;
        align-self: flex-start;
        align-items: center;
        gap: 8px;
        height: 40px;
        padding: 0 16px 0 12px;
        border: 1px solid var(--divider-color);
        border-radius: 20px;
        color: var(--primary-color);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }

      .back {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `,
  ];

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @state() private accessor config: DeyeInverterCardConfig | undefined;

  @state() private accessor editingIndex: number | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    void loadHaComponents().then(() => this.requestUpdate());
  }

  setConfig(config: DeyeInverterCardConfig): void {
    this.config = config;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const inverter =
      this.editingIndex === undefined ? undefined : this.config.inverters[this.editingIndex];

    if (inverter && this.editingIndex !== undefined) {
      return this.renderInverterEditor(this.hass, inverter, this.editingIndex);
    }

    return this.renderMain(this.hass, this.config);
  }

  private renderMain(hass: HomeAssistant, config: DeyeInverterCardConfig): TemplateResult {
    const inverters = config.inverters ?? [];
    const detected = detectPrefixes(hass.states);

    return html`<div class="editor">
      ${this.renderForm(
        hass,
        GENERAL_SCHEMA,
        { title: config.title, display: config.display ?? 'detailed' },
        (value) =>
          this.patch({
            title: (value.title as string) || undefined,
            display: value.display as MutableConfig['display'],
          }),
      )}
      <section class="block">
        <div class="block-head">
          <h3>Inverters</h3>
          <span class="hint">${pluralize(detected.length, 'prefix', 'prefixes')} detected</span>
        </div>
        ${inverters.map((item, index) => this.renderInverterRow(item, index, config))}
        <button type="button" class="add" @click=${() => this.addInverter(detected)}>
          ${icon('plus', 18)}Add inverter
        </button>
      </section>
      ${inverters.length > 1 ? this.renderCombined(hass, config, inverters) : nothing}
      <section class="block">
        <h3>Tap actions</h3>
        <span class="hint"
          >What opens when a tile is tapped. Values inside a card popup always open their sensor
          history.</span
        >
        ${this.renderForm(
          hass,
          TAP_ACTIONS_SCHEMA,
          { ...DEFAULT_TAP_ACTIONS, ...config.tap_actions },
          (value) => this.patch({ tap_actions: value as MutableConfig['tap_actions'] }),
        )}
      </section>
      ${this.renderForm(
        hass,
        SECTIONS_SCHEMA,
        { sections: config.sections ?? [...SECTION_IDS] },
        (value) => this.patch({ sections: value.sections as MutableConfig['sections'] }),
      )}
      ${this.renderForm(hass, INVERT_SCHEMA, { invert: config.invert ?? {} }, (value) =>
        this.patch({ invert: value.invert as MutableConfig['invert'] }),
      )}
    </div>`;
  }

  private renderCombined(
    hass: HomeAssistant,
    config: DeyeInverterCardConfig,
    inverters: readonly InverterConfig[],
  ): TemplateResult {
    const data = {
      show_totals: config.show_totals !== false,
      parallel: config.parallel !== false,
      master: config.master ?? inverters[0]?.prefix,
    };

    return html`<section class="block boxed">
      <h3>Combined card</h3>
      ${this.renderForm(hass, combinedSchema(inverters), data, (value) =>
        this.patch({
          show_totals: value.show_totals as boolean,
          parallel: value.parallel as boolean,
          master: value.master as string,
        }),
      )}
    </section>`;
  }

  private renderInverterRow(
    inverter: InverterConfig,
    index: number,
    config: DeyeInverterCardConfig,
  ): TemplateResult {
    const overrideCount = Object.keys(config.entities?.[inverter.prefix] ?? {}).length;
    const label = inverter.name || inverter.prefix;

    return html`<div class="inverter">
      <span class="inverter-name">
        <span>${label}</span>
        <span class="prefix">${inverter.prefix}</span>
      </span>
      <span class="overrides"
        >${overrideCount > 0 ? pluralize(overrideCount, 'override') : 'auto'}</span
      >
      <button
        type="button"
        class="icon-button"
        aria-label="Edit ${label}"
        @click=${() => {
          this.editingIndex = index;
        }}
      >
        ${icon('pencil', 18)}
      </button>
      <button
        type="button"
        class="icon-button"
        aria-label="Remove ${label}"
        @click=${() => this.removeInverter(index)}
      >
        ${icon('trash', 18)}
      </button>
    </div>`;
  }

  private renderInverterEditor(
    hass: HomeAssistant,
    inverter: InverterConfig,
    index: number,
  ): TemplateResult {
    const prefixes = detectPrefixes(hass.states);
    const overrides = this.config?.entities?.[inverter.prefix] ?? {};

    return html`<div class="editor">
      <div class="back">
        <button
          type="button"
          class="icon-button"
          aria-label="Back"
          @click=${() => {
            this.editingIndex = undefined;
          }}
        >
          ${icon('back', 20)}
        </button>
        <h3>${inverter.name || inverter.prefix || 'Inverter'}</h3>
      </div>
      ${this.renderForm(
        hass,
        inverterSchema(prefixes),
        { prefix: inverter.prefix, name: inverter.name },
        (value) =>
          this.updateInverter(
            index,
            String(value.prefix ?? '').trim(),
            (value.name as string) || undefined,
          ),
      )}
      <section class="block">
        <h3>Entity overrides</h3>
        <span class="hint"
          >Leave empty to use sensor.${inverter.prefix || '<prefix>'}_&lt;key&gt; from the
          add-on.</span
        >
        <ha-form
          .hass=${hass}
          .data=${groupOverrides(overrides)}
          .schema=${OVERRIDES_SCHEMA}
          .computeLabel=${this.computeOverrideLabel}
          .computeHelper=${(schema: HaFormSchema) => this.computeOverrideHelper(hass, inverter.prefix, schema)}
          @value-changed=${(event: ValueChangedEvent) => this.updateOverrides(inverter.prefix, event.detail.value)}
        ></ha-form>
      </section>
    </div>`;
  }

  private renderForm(
    hass: HomeAssistant,
    schema: readonly HaFormSchema[],
    data: FormData,
    onChange: (value: FormData) => void,
  ): TemplateResult {
    return html`<ha-form
      .hass=${hass}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${(event: ValueChangedEvent) => onChange(event.detail.value)}
    ></ha-form>`;
  }

  private readonly computeLabel = (schema: HaFormSchema): string => {
    const label = FIELD_LABELS[schema.name];

    if (label) {
      return label;
    }

    return isSectionId(schema.name) ? SECTION_LABELS[schema.name] : schema.name;
  };

  private readonly computeHelper = (schema: HaFormSchema): string | undefined =>
    FIELD_HELPERS[schema.name];

  private readonly computeOverrideLabel = (schema: HaFormSchema): string => {
    if (isSensorKey(schema.name)) {
      return getSensorDefinition(schema.name).label;
    }

    return isSectionId(schema.name) ? SECTION_LABELS[schema.name] : schema.name;
  };

  private computeOverrideHelper(
    hass: HomeAssistant,
    prefix: string,
    schema: HaFormSchema,
  ): string | undefined {
    if (!isSensorKey(schema.name)) {
      return undefined;
    }

    const auto = findAutoEntityId(hass.states, prefix, schema.name);

    return auto ? `Auto: ${auto}` : 'Not found automatically';
  }

  private patch(changes: Partial<MutableConfig>): void {
    if (!this.config) {
      return;
    }

    this.emit(withoutUndefined({ ...this.config, ...changes }));
  }

  private addInverter(detected: readonly string[]): void {
    const inverters = this.config?.inverters ?? [];
    const used = new Set(inverters.map((inverter) => inverter.prefix));
    const candidates = [...detected, DEFAULT_PREFIX];
    const prefix =
      candidates.find((candidate) => !used.has(candidate)) ?? `inverter_${inverters.length + 1}`;

    this.patch({ inverters: [...inverters, { prefix, name: suggestInverterName(prefix) }] });
    this.editingIndex = inverters.length;
  }

  private removeInverter(index: number): void {
    const inverters = this.config?.inverters ?? [];
    const removed = inverters[index];
    const entities = omitKey(this.config?.entities ?? {}, removed?.prefix);

    this.patch({
      inverters: inverters.filter((_, position) => position !== index),
      entities: emptyToUndefined(entities),
      master: this.config?.master === removed?.prefix ? undefined : this.config?.master,
    });
  }

  private updateInverter(index: number, prefix: string, name: string | undefined): void {
    const inverters = [...(this.config?.inverters ?? [])];
    const previous = inverters[index];

    if (!previous) {
      return;
    }

    const current = this.config?.entities ?? {};
    const moved = current[previous.prefix];
    const entities =
      previous.prefix !== prefix && moved
        ? { ...omitKey(current, previous.prefix), [prefix]: moved }
        : current;

    inverters[index] = name ? { prefix, name } : { prefix };

    this.patch({
      inverters,
      entities: emptyToUndefined(entities),
      master: this.config?.master === previous.prefix ? prefix : this.config?.master,
    });
  }

  private updateOverrides(prefix: string, data: FormData): void {
    const overrides = toOverrides(data);
    const others = omitKey(this.config?.entities ?? {}, prefix);
    const entities =
      Object.keys(overrides).length > 0 ? { ...others, [prefix]: overrides } : others;

    this.patch({ entities: emptyToUndefined(entities) });
  }

  private emit(config: DeyeInverterCardConfig): void {
    this.config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
  }
}
