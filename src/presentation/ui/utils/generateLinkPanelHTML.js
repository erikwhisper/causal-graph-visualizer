export function generateLinkPanelHTML(link, isMultiple) {
  const getValue = (getter, defaultValue = "") =>
    isMultiple ? defaultValue : getter();
  const getColor = (getter) => (isMultiple ? "#000000" : getter());

  return `
    <h2>${isMultiple ? "Multi-Select" : "Single-Select"}</h2>

    <div class="panel-section-header">
      <i class="fas fa-palette"></i>
      <span>Color</span>
    </div>

    <div class="color-row">
      <span class="color-label">Edge Color</span>
      <input type="color" id="link-stroke" value="${getColor(() =>
        link.getStrokeColor()
      )}" class="color-circle" />
    </div>

    <div class="color-row">
      <span class="color-label">Arrowhead Color</span>
      <input type="color" id="arrowhead-color" value="${getColor(() =>
        link.getArrowheadColor()
      )}" class="color-circle" />
    </div>

    <div class="color-row">
      <span class="color-label">Arrowtail Color</span>
      <input type="color" id="arrowtail-color" value="${getColor(() =>
        link.getArrowtailColor()
      )}" class="color-circle" />
    </div>

    <div class="panel-section-header">
      <i class="fas fa-project-diagram"></i>
      <span>Edge Properties</span>
    </div>

    <div class="edge-controls">
      <div class="arrow-buttons" id="arrowhead-buttons">
        <button data-value="normal" title="Normal"><i class="fas fa-arrow-left"></i></button>
        <button data-value="odot" title="Odot"><i class="far fa-circle"></i></button>
        <button data-value="tail" title="Tail"><i class="fas fa-minus"></i></button>
      </div>

      <select id="link-style" class="link-style-select">
        <option value="solid" ${
          !isMultiple && link.getLinkStyle() === "solid" ? "selected" : ""
        }>───</option>
        <option value="dashed" ${
          !isMultiple && link.getLinkStyle() === "dashed" ? "selected" : ""
        }>- - -</option>
      </select>

      <div class="arrow-buttons" id="arrowtail-buttons">
        <button data-value="tail" title="Tail"><i class="fas fa-minus"></i></button>
        <button data-value="odot" title="Odot"><i class="far fa-circle"></i></button>
        <button data-value="normal" title="Normal"><i class="fas fa-arrow-right"></i></button>
      </div>
    </div>

    <div class="thickness-controls">
      <div class="thickness-item">
        <span class="thickness-label">Arrow</span>
        <input type="number" id="arrowhead-width" value="${getValue(() =>
          link.getArrowheadWidth()
        )}" step="0.5" min="5" max="999" />
      </div>

      <div class="thickness-item">
        <span class="thickness-label">Stroke</span>
        <input type="number" id="link-stroke-width" value="${getValue(() =>
          link.getStrokeWidth()
        )}" step="0.5" min="1" max="999" />
      </div>

      <div class="thickness-item">
        <span class="thickness-label">Arrow</span>
        <input type="number" id="arrowtail-width" value="${getValue(() =>
          link.getArrowtailWidth()
        )}" step="0.5" min="5" max="999" />
      </div>
    </div>

    <button id="reset-curvature">Reset curvature</button>
  `;
}
