import {
  getCommon,
  normalizeColor,
  numberAttrs,
  swatchFieldHTML,
} from "./panelFieldHelpers.js";
import { colorLinkButtonHTML } from "./panelInteractions.js";

export function generateLinkPanelHTML(links) {
  const common = (getter, normalize) => getCommon(links, getter, normalize);

  const strokeColor = common((l) => l.getStrokeColor(), normalizeColor);
  const headColor = common((l) => l.getArrowheadColor(), normalizeColor);
  const tailColor = common((l) => l.getArrowtailColor(), normalizeColor);

  const strokeWidth = common((l) => l.getStrokeWidth());
  const headWidth = common((l) => l.getArrowheadWidth());
  const tailWidth = common((l) => l.getArrowtailWidth());
  const style = common((l) => l.getLinkStyle());

  const styleOption = (value, text) =>
    `<option value="${value}"${!style.mixed && style.value === value ? " selected" : ""}>${text}</option>`;

  return `
    <div class="panel-title">
      <span>Edge</span>
      ${links.length > 1 ? `<span class="panel-chip">${links.length} selected</span>` : ""}
    </div>

    <div class="panel-section-header">
      <i class="fas fa-palette"></i>
      <span>Colors</span>
    </div>
    <div class="field-row field-row--inline">
      <div class="color-chain">
        ${swatchFieldHTML({ id: "arrowhead-color", label: "Arrowhead", common: headColor })}
        ${colorLinkButtonHTML("link:head-line", "arrowhead", "line")}
        ${swatchFieldHTML({ id: "link-stroke", label: "Line", common: strokeColor })}
        ${colorLinkButtonHTML("link:line-tail", "line", "arrowtail")}
        ${swatchFieldHTML({ id: "arrowtail-color", label: "Arrowtail", common: tailColor })}
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-minus"></i>
      <span>Line</span>
    </div>
    <div class="field-row field-row--inline">
      <div class="field field--narrow">
        <label class="field-label" for="link-stroke-width">Width</label>
        <input type="number" id="link-stroke-width" ${numberAttrs(strokeWidth)} step="0.5" min="1" max="999" />
      </div>
      <div class="field field--grow">
        <label class="field-label" for="link-style">Style</label>
        <select id="link-style" class="link-style-select">
          ${style.mixed ? '<option value="" disabled selected hidden>Mixed</option>' : ""}
          ${styleOption("solid", "Solid")}
          ${styleOption("dashed", "Dashed")}
        </select>
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-shapes"></i>
      <span>Arrowhead</span>
    </div>
    <div class="field-row field-row--inline">
      <div class="field">
        <span class="field-label">Type</span>
        <div class="arrow-buttons" id="arrowhead-buttons">
          <button type="button" data-value="tail" title="None" aria-label="None"><i class="fas fa-minus"></i></button>
          <button type="button" data-value="odot" title="Circle" aria-label="Circle"><i class="far fa-circle"></i></button>
          <button type="button" data-value="normal" title="Arrow" aria-label="Arrow"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div class="field field--narrow">
        <label class="field-label" for="arrowhead-width">Size</label>
        <input type="number" id="arrowhead-width" ${numberAttrs(headWidth)} step="0.5" min="5" max="999" />
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-shapes"></i>
      <span>Arrowtail</span>
    </div>
    <div class="field-row field-row--inline">
      <div class="field">
        <span class="field-label">Type</span>
        <div class="arrow-buttons" id="arrowtail-buttons">
          <button type="button" data-value="tail" title="None" aria-label="None"><i class="fas fa-minus"></i></button>
          <button type="button" data-value="odot" title="Circle" aria-label="Circle"><i class="far fa-circle"></i></button>
          <button type="button" data-value="normal" title="Arrow" aria-label="Arrow"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div class="field field--narrow">
        <label class="field-label" for="arrowtail-width">Size</label>
        <input type="number" id="arrowtail-width" ${numberAttrs(tailWidth)} step="0.5" min="5" max="999" />
      </div>
    </div>

    <div class="panel-actions">
      <button type="button" id="reset-curvature" class="btn-secondary">
        <i class="fas fa-undo"></i> Reset curvature
      </button>
    </div>
  `;
}