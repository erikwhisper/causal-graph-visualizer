import { updateNodeVisual } from "../../visualization/update/updateNodeVisual.js";
import { unhighlightAll } from "../utils/unhighlightAll.js";
import { updateVisualStyles } from "../../visualization/update/updateVisualStyles.js";

export function renderNodePropertiesPanel(
  selectedNodes,
  svg,
  graph,
  graphHistory
) {
  const panel = document.getElementById("property-panel");

  if (selectedNodes.length === 0) {
    panel.innerHTML = `<p>Keine Knoten ausgewählt.</p>`;
    return;
  }

  const multiple = selectedNodes.length > 1;
  const node = selectedNodes[0];

  panel.innerHTML = `
  <h2>${multiple ? "Mutli-Select" : "Single-Select"}</h2>

  <div class="panel-section-header">
    <i class="fas fa-arrows-alt"></i>
    <span>Bounds</span>
  </div>
  
<div class="bounds-grid">
  <!-- Row 1: X left, Y right, with equal space left / between / right -->
  <div class="bounds-field bounds-field--left">
    <span class="field-label">X-Position</span>
    <input type="number" id="node-x" value="${
      multiple ? "" : node.getXValue()
    }" />
  </div>

  <div class="bounds-field bounds-field--right">
    <span class="field-label">Y-Position</span>
    <input type="number" id="node-y" value="${
      multiple ? "" : node.getYValue()
    }" />
  </div>

  <!-- Row 2: Radius under X column (left aligned) -->
  <div class="bounds-field radius-field">
    <span class="field-label">Radius</span>
    <input type="number" id="node-radius" value="${
      multiple ? "" : node.getRadius()
    }" />
  </div>
</div>

  <div class="panel-section-header">
    <i class="fas fa-palette"></i>
    <span>Color</span>
  </div>

  <div class="color-row">
    <span class="color-label">Label Color</span>
    <input type="color" id="node-label-color"
           value="${multiple ? "#000000" : node.getLabelColor()}"
           class="color-circle" />
  </div>

  <div class="color-row">
    <span class="color-label">Fill Color</span>
    <input type="color" id="node-fill"
           value="${multiple ? "#000000" : node.getFillColor()}"
           class="color-circle" />
  </div>

  <div class="color-row">
    <span class="color-label">Stroke Color</span>
    <input type="color" id="node-stroke"
           value="${multiple ? "#000000" : node.getStrokeColor()}"
           class="color-circle" />
  </div>

<div class="panel-section-header">
  <i class="fas fa-project-diagram"></i>
  <span>Node Properties</span>
</div>

<div class="node-stroke-field">
  <span class="field-label">Stroke</span>
  <input 
    type="number" 
    id="node-stroke-width" 
    value="${multiple ? "" : node.getStrokeWidth()}" 
    step="0.1" 
    min="0.1" 
    max="999" 
  />
</div>

  <div class="panel-section-header">
    <i class="fas fa-pencil"></i>
    <span>Label Properties</span>
  </div>

  <div class="label-grid">
    <!-- Row 1: Label (flexible) | Size (narrow) -->
    <div class="form-field form-field--label">
      <label for="node-label" class="field-label">Label</label>
      <input type="text" id="node-label" value="${
        multiple ? "" : node.getLabel()
      }" />
    </div>

    <div class="form-field form-field--size">
      <label for="node-label-font-size" class="field-label">Size</label>
      <input type="number" id="node-label-font-size" value="${
        multiple ? "" : node.getLabelFontSize()
      }" min="1" max="999" />
    </div>

    <!-- Row 2: offsets -->
    <div class="offsets-grid">
      <div class="form-field">
        <label for="node-label-offset-x" class="field-label">X-Offset</label>
        <input type="number" id="node-label-offset-x" value="${
          multiple ? "" : node.getLabelOffsetX()
        }" />
      </div>

      <div class="form-field">
        <label for="node-label-offset-y" class="field-label">Y-Offset</label>
        <input type="number" id="node-label-offset-y" value="${
          multiple ? "" : node.getLabelOffsetY()
        }" />
      </div>
    </div>
  </div>

  
`;

  registerPanelInputListeners(selectedNodes, svg, graph, graphHistory);
}

//nicht Panel sondern in Node umbenennen
function registerPanelInputListeners(selectedNodes, svg, graph, graphHistory) {
  const labelInput = document.getElementById("node-label");
  const radiusInput = document.getElementById("node-radius");
  const xInput = document.getElementById("node-x");
  const yInput = document.getElementById("node-y");
  const fillInput = document.getElementById("node-fill");
  const strokeInput = document.getElementById("node-stroke");
  const strokeWidthInput = document.getElementById("node-stroke-width");
  const fontSizeInput = document.getElementById("node-label-font-size");
  const offsetXInput = document.getElementById("node-label-offset-x");
  const offsetYInput = document.getElementById("node-label-offset-y");
  const labelColorInput = document.getElementById("node-label-color");

  if (labelInput) {
    //live update beim Tippen (aber kein History-Eintrag)
    labelInput.addEventListener("input", () => {
      selectedNodes.forEach((node) => {
        node.setLabel(labelInput.value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });

    //Commit erst, wenn Eingabe abgeschlossen ist (Enter z.b.)
    labelInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (radiusInput) {
    radiusInput.addEventListener("input", () => {
      const value = parseFloat(radiusInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setRadius(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });

    //Commit erst, wenn Eingabe abgeschlossen ist (Enter z.B.)
    radiusInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (xInput) {
    xInput.addEventListener("input", () => {
      const value = parseFloat(xInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setXValue(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    // Commit erst, wenn Eingabe abgeschlossen ist (Enter z.B.)
    xInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (yInput) {
    yInput.addEventListener("input", () => {
      const value = parseFloat(yInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setYValue(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    yInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (fillInput) {
    fillInput.addEventListener("input", () => {
      selectedNodes.forEach((node) => {
        node.setFillColor(fillInput.value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });
    fillInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (strokeInput) {
    strokeInput.addEventListener("input", () => {
      selectedNodes.forEach((node) => {
        node.setStrokeColor(strokeInput.value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });
    strokeInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (strokeWidthInput) {
    strokeWidthInput.addEventListener("input", () => {
      const value = parseFloat(strokeWidthInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setStrokeWidth(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    strokeWidthInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (fontSizeInput) {
    fontSizeInput.addEventListener("input", () => {
      const value = parseFloat(fontSizeInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setLabelFontSize(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    fontSizeInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (offsetXInput) {
    offsetXInput.addEventListener("input", () => {
      const value = parseFloat(offsetXInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setLabelOffsetX(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    offsetXInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (offsetYInput) {
    offsetYInput.addEventListener("input", () => {
      const value = parseFloat(offsetYInput.value);
      if (!isNaN(value)) {
        selectedNodes.forEach((node) => {
          node.setLabelOffsetY(value);
          updateNodeVisual(node, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    offsetYInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (labelColorInput) {
    labelColorInput.addEventListener("input", () => {
      selectedNodes.forEach((node) => {
        node.setLabelColor(labelColorInput.value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });
    labelColorInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }
}
