export function generateNodePanelHTML(node, isMultiple) {
  const getValue = (getter, defaultValue = "") =>
    isMultiple ? defaultValue : getter();

  return `
    <h2>${isMultiple ? "Multi-Select" : "Single-Select"}</h2>

    <div class="panel-section-header">
      <i class="fas fa-arrows-alt"></i>
      <span>Bounds</span>
    </div>
    
    <div class="bounds-grid">
      <div class="bounds-field bounds-field--left">
        <span class="field-label">X-Position</span>
        <input type="number" id="node-x" value="${getValue(() =>
          node.getXValue()
        )}" />
      </div>

      <div class="bounds-field bounds-field--right">
        <span class="field-label">Y-Position</span>
        <input type="number" id="node-y" value="${getValue(() =>
          node.getYValue()
        )}" />
      </div>

      <div class="bounds-field radius-field">
        <span class="field-label">Radius</span>
        <input type="number" id="node-radius" value="${getValue(() =>
          node.getRadius()
        )}" />
      </div>
    </div>

    <div class="panel-section-header">
      <i class="fas fa-palette"></i>
      <span>Color</span>
    </div>

    <div class="color-row">
      <span class="color-label">Label Color</span>
      <input type="color" id="node-label-color" value="${getValue(
        () => node.getLabelColor(),
        "#000000"
      )}" class="color-circle" />
    </div>

    <div class="color-row">
      <span class="color-label">Fill Color</span>
      <input type="color" id="node-fill" value="${getValue(
        () => node.getFillColor(),
        "#FFFFFF"
      )}" class="color-circle" />
    </div>

    <div class="color-row">
      <span class="color-label">Stroke Color</span>
      <input type="color" id="node-stroke" value="${getValue(
        () => node.getStrokeColor(),
        "#000000"
      )}" class="color-circle" />
    </div>

    <div class="panel-section-header">
      <i class="fas fa-project-diagram"></i>
      <span>Node Properties</span>
    </div>

    <div class="node-stroke-field">
      <span class="field-label">Stroke</span>
      <input type="number" id="node-stroke-width" value="${getValue(() =>
        node.getStrokeWidth()
      )}" step="0.1" min="0.1" max="999" />
    </div>

    <div class="panel-section-header">
      <i class="fas fa-pencil"></i>
      <span>Label Properties</span>
    </div>

    <div class="label-grid">
      <div class="form-field form-field--label">
        <label for="node-label" class="field-label">Label</label>
        <input type="text" id="node-label" value="${getValue(() =>
          node.getLabel()
        )}" />
      </div>

      <div class="form-field form-field--size">
        <label for="node-label-font-size" class="field-label">Size</label>
        <input type="number" id="node-label-font-size" value="${getValue(() =>
          node.getLabelFontSize()
        )}" min="1" max="999" />
      </div>

      <div class="offsets-grid">
        <div class="form-field">
          <label for="node-label-offset-x" class="field-label">X-Offset</label>
          <input type="number" id="node-label-offset-x" value="${getValue(() =>
            node.getLabelOffsetX()
          )}" />
        </div>

        <div class="form-field">
          <label for="node-label-offset-y" class="field-label">Y-Offset</label>
          <input type="number" id="node-label-offset-y" value="${getValue(() =>
            node.getLabelOffsetY()
          )}" />
        </div>
      </div>
    </div>
  `;
}
