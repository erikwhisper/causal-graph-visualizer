import { updateLinkVisual } from "../../visualization/update/updateLinkVisual.js";
import { updateVisualStyles } from "../../visualization/update/updateVisualStyles.js";

export function renderLinkPropertiesPanel(
  selectedLinks,
  svg,
  graph,
  graphHistory
) {
  const panel = document.getElementById("property-panel");

  if (selectedLinks.length === 0) {
    panel.innerHTML = `<p>Keine Links ausgewählt.</p>`;
    return;
  }

  const multiple = selectedLinks.length > 1;
  const link = selectedLinks[0];

  panel.innerHTML = `
    <h2>${multiple ? "Mutli-Select" : "Single-Select"}</h2>

    <div class="panel-section-header">
      <i class="fas fa-palette"></i>
      <span>Color</span>
    </div>

    <div class="color-row">
    <span class="color-label">Edge Color</span>
    <input type="color" id="link-stroke" value="${
      multiple ? "#000000" : link.getStrokeColor()
    }" class="color-circle" />
  </div>

  <div class="color-row">
    <span class="color-label">Arrowhead Color</span>
    <input type="color" id="arrowhead-color" value="${
      multiple ? "#000000" : link.getArrowheadColor()
    }" class="color-circle" />
  </div>

  <div class="color-row">
    <span class="color-label">Arrowtail Color</span>
    <input type="color" id="arrowtail-color" value="${
      multiple ? "#000000" : link.getArrowtailColor()
    }" class="color-circle" />
  </div>

  <div class="panel-section-header">
    <i class="fas fa-project-diagram"></i>
    <span>Edge Properties</span>
  </div>

  <!--<h4>Stroke</h4>-->

<div class="edge-controls">

  <div class="arrow-buttons" id="arrowhead-buttons">
    <button data-value="normal" title="Normal">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button data-value="odot" title="Odot">
      <i class="far fa-circle"></i>
    </button>
    <button data-value="tail" title="Tail">
      <i class="fas fa-minus"></i>
    </button>
  </div>

<select id="link-style" class="link-style-select">
  <option value="solid" ${
    !multiple && link.getLinkStyle() === "solid" ? "selected" : ""
  } class="solid-line">───</option>
  <option value="dashed" ${
    !multiple && link.getLinkStyle() === "dashed" ? "selected" : ""
  } class="dashed-line">- - -</option>
</select>

  <div class="arrow-buttons" id="arrowtail-buttons">
    <button data-value="tail" title="Tail">
      <i class="fas fa-minus"></i>
    </button>
    <button data-value="odot" title="Odot">
      <i class="far fa-circle"></i>
    </button>
    <button data-value="normal" title="Normal">
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
</div>


<!--<h4>Thickness</h4>-->

<div class="thickness-controls">
  <div class="thickness-item">
    <span class="thickness-label">Arrow</span>
    <input type="number" id="arrowhead-width" 
           value="${multiple ? "" : link.getArrowheadWidth()}" 
           step="0.5" min="5" max="999" />
  </div>

  <div class="thickness-item">
    <span class="thickness-label">Stroke</span>
    <input type="number" id="link-stroke-width" 
           value="${multiple ? "" : link.getStrokeWidth()}" 
           step="0.5" min="1" max="999" />
  </div>

  <div class="thickness-item">
    <span class="thickness-label">Arrow</span>
    <input type="number" id="arrowtail-width" 
           value="${multiple ? "" : link.getArrowtailWidth()}" 
           step="0.5" min="5" max="999" />
  </div>
</div>

    

    <button id="reset-curvature">Reset curvature</button>
  `;

  if (!multiple) {
    const currentHead = link.getArrowhead();
    const currentTail = link.getArrowtail();

    //Arrowhead Buttons
    document.querySelectorAll("#arrowhead-buttons button").forEach((btn) => {
      if (btn.dataset.value === currentHead) {
        btn.classList.add("active"); // grün markieren
      } else {
        btn.classList.remove("active");
      }
    });

    //Arrowtail Buttons
    document.querySelectorAll("#arrowtail-buttons button").forEach((btn) => {
      if (btn.dataset.value === currentTail) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  registerLinkInputListeners(selectedLinks, svg, graph, graphHistory);
}

function registerLinkInputListeners(selectedLinks, svg, graph, graphHistory) {
  const strokeInput = document.getElementById("link-stroke");
  const strokeWidthInput = document.getElementById("link-stroke-width");
  const styleSelect = document.getElementById("link-style");

  if (strokeInput) {
    strokeInput.addEventListener("input", () => {
      selectedLinks.forEach((link) => {
        link.setStrokeColor(strokeInput.value);
        updateLinkVisual(link, svg, graph);
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
        selectedLinks.forEach((link) => {
          link.setStrokeWidth(value);
          updateLinkVisual(link, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    strokeWidthInput.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (styleSelect) {
    styleSelect.addEventListener("change", () => {
      selectedLinks.forEach((link) => {
        link.setLinkStyle(styleSelect.value);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    });
  }

  //Marker: Arrowhead
  const arrowheadType = document.getElementById("arrowhead-type");
  const arrowheadColor = document.getElementById("arrowhead-color");
  const arrowheadWidth = document.getElementById("arrowhead-width");

  const resetCurvatureBtn = document.getElementById("reset-curvature");

  const arrowheadButtons = document.querySelectorAll(
    "#arrowhead-buttons button"
  );
  arrowheadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-value");
      arrowheadButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedLinks.forEach((link) => {
        link.setArrowhead(value);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    });
  });

  if (arrowheadColor) {
    arrowheadColor.addEventListener("input", () => {
      selectedLinks.forEach((link) => {
        link.setArrowheadColor(arrowheadColor.value);
        //updateMarkerVisual(link, svg);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });
    arrowheadColor.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (arrowheadWidth) {
    arrowheadWidth.addEventListener("input", () => {
      const value = parseFloat(arrowheadWidth.value);
      if (!isNaN(value)) {
        selectedLinks.forEach((link) => {
          link.setArrowheadWidth(value);
          //updateMarkerVisual(link, svg);
          updateLinkVisual(link, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    arrowheadWidth.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (resetCurvatureBtn) {
    resetCurvatureBtn.addEventListener("click", () => {
      selectedLinks.forEach((link) => {
        link.setLinkCurvature(null, null);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    });
  }

  //Marker: Arrowtail
  const arrowtailType = document.getElementById("arrowtail-type");
  const arrowtailColor = document.getElementById("arrowtail-color");
  const arrowtailWidth = document.getElementById("arrowtail-width");

  const arrowtailButtons = document.querySelectorAll(
    "#arrowtail-buttons button"
  );
  arrowtailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-value");
      arrowtailButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedLinks.forEach((link) => {
        link.setArrowtail(value);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    });
  });

  if (arrowtailColor) {
    arrowtailColor.addEventListener("input", () => {
      selectedLinks.forEach((link) => {
        link.setArrowtailColor(arrowtailColor.value);
        //updateMarkerVisual(link, svg);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
    });
    arrowtailColor.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }

  if (arrowtailWidth) {
    arrowtailWidth.addEventListener("input", () => {
      const value = parseFloat(arrowtailWidth.value);
      if (!isNaN(value)) {
        selectedLinks.forEach((link) => {
          link.setArrowtailWidth(value);
          //updateMarkerVisual(link, svg);
          updateLinkVisual(link, svg, graph);
        });
      }
      updateVisualStyles(svg, graph);
    });
    arrowtailWidth.addEventListener("change", () => {
      graphHistory.setNewState(graph.getEverything());
    });
  }
}
