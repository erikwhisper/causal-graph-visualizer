import { escapeHtml } from "../../../utils/escapeHtml.js";

export function esc(value) {
  return escapeHtml(String(value ?? ""));
}

export const normalizeColor = (value) => String(value).trim().toLowerCase();


export function getCommon(items, getter, normalize = (v) => v) {
  if (items.length === 0) return { value: "", mixed: false };

  const first = getter(items[0]);
  const firstKey = normalize(first);
  const mixed = items.some((item) => normalize(getter(item)) !== firstKey);

  return mixed ? { value: "", mixed: true } : { value: first, mixed: false };
}

export function numberAttrs({ value, mixed }) {
  return mixed ? 'value="" placeholder="Mixed"' : `value="${esc(value)}"`;
}

export function swatchFieldHTML({ id, label, common }) {
  return `
    <div class="field field--swatch${common.mixed ? " field--mixed" : ""}">
      <label class="field-label" for="${id}">${label}</label>
      <input type="text" id="${id}" value="${common.mixed ? "" : esc(common.value)}" class="color-circle coloris" />
    </div>`;
}