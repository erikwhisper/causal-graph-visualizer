import {
  esc,
  getCommon,
  normalizeColor,
  numberAttrs,
  swatchFieldHTML,
} from "./panelFieldHelpers.js";
import { colorLinkButtonHTML } from "./panelInteractions.js";

const FONT_FAMILY_OPTIONS = [
  "sans-serif",
  "serif",
  "monospace",
  "Inter",
  "Lora",
  "Merriweather",
  "Source Code Pro",
  "Roboto Mono",
];

export function generateNodePanelHTML(nodes) {
  const common = (getter, normalize) => getCommon(nodes, getter, normalize);

  const x = common((n) => n.getXValue());
  const y = common((n) => n.getYValue());
  const radius = common((n) => n.getRadius());

  const fill = common((n) => n.getFillColor(), normalizeColor);
  const stroke = common((n) => n.getStrokeColor(), normalizeColor);
  const labelColor = common((n) => n.getLabelColor(), normalizeColor);
  const strokeWidth = common((n) => n.getStrokeWidth());

  const label = common((n) => n.getLabel());
  const fontFamily = common((n) => n.getLabelFontFamily());
  const fontSize = common((n) => n.getLabelFontSize());
  const lineHeight = common((n) => n.getLabelLineHeight());
  const offsetX = common((n) => n.getLabelOffsetX());
  const offsetY = common((n) => n.getLabelOffsetY());

  return `
    <div class="panel-title">
      <span>Node</span>
      ${nodes.length > 1 ? `<span class="panel-chip">${nodes.length} selected</span>` : ""}
    </div>

    <div class="panel-section-header">
      <i class="fas fa-arrows-alt"></i>
      <span>Geometry</span>
    </div>
    <div class="field-row field-row--3">
      <div class="field">
        <label class="field-label" for="node-x">X</label>
        <input type="number" id="node-x" ${numberAttrs(x)} />
      </div>
      <div class="field">
        <label class="field-label" for="node-y">Y</label>
        <input type="number" id="node-y" ${numberAttrs(y)} />
      </div>
      <div class="field">
        <label class="field-label" for="node-radius">Radius</label>
        <input type="number" id="node-radius" ${numberAttrs(radius)} />
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-palette"></i>
      <span>Style</span>
    </div>
    <div class="field-row field-row--inline">
      <div class="color-chain">
        ${swatchFieldHTML({ id: "node-fill", label: "Fill", common: fill })}
        ${colorLinkButtonHTML("node:fill-border", "fill", "border")}
        ${swatchFieldHTML({ id: "node-stroke", label: "Border", common: stroke })}
        ${colorLinkButtonHTML("node:border-text", "border", "text")}
        ${swatchFieldHTML({ id: "node-label-color", label: "Text", common: labelColor })}
      </div>
      <div class="field field--narrow">
        <label class="field-label" for="node-stroke-width">Border width</label>
        <input type="number" id="node-stroke-width" ${numberAttrs(strokeWidth)} step="0.1" min="0.1" max="999" />
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-pencil"></i>
      <span>Label</span>
    </div>
    <div class="field-row field-row--single">
      <div class="field">
        <label class="field-label" for="node-label">Text</label>
        <textarea id="node-label" rows="2"${label.mixed ? ' placeholder="Mixed"' : ""}>${label.mixed ? "" : esc(label.value)}</textarea>
      </div>
    </div>
    <div class="field-row field-row--font">
      <div class="field">
        <label class="field-label" for="node-label-font-family">Font</label>
        <select id="node-label-font-family">
          ${fontFamily.mixed ? '<option value="" disabled selected hidden>Mixed</option>' : ""}
          ${FONT_FAMILY_OPTIONS.map(
            (font) =>
              `<option value="${font}"${!fontFamily.mixed && fontFamily.value === font ? " selected" : ""}>${font}</option>`,
          ).join("")}
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="node-label-font-size">Size</label>
        <input type="number" id="node-label-font-size" ${numberAttrs(fontSize)} min="1" max="999" />
      </div>
    </div>
    <div class="field-row field-row--3">
      <div class="field">
        <label class="field-label" for="node-label-line-height">Line height</label>
        <input type="number" id="node-label-line-height" ${numberAttrs(lineHeight)} min="0.1" step="0.1" />
      </div>
      <div class="field">
        <label class="field-label" for="node-label-offset-x">Offset X</label>
        <input type="number" id="node-label-offset-x" ${numberAttrs(offsetX)} />
      </div>
      <div class="field">
        <label class="field-label" for="node-label-offset-y">Offset Y</label>
        <input type="number" id="node-label-offset-y" ${numberAttrs(offsetY)} />
      </div>
    </div>
  `;
}