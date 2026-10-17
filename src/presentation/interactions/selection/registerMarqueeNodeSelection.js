import { renderNodePropertiesPanel } from "../../ui/renderNodePropertiesPanel.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { createMarqueeRect } from "./utils/createMarqueeRect.js";
import { updateMarqueeRect } from "./utils/updateMarqueeRect.js";
import { getRectBounds } from "./utils/getRectBounds.js";
import { selectNodesInRect } from "./selectNodesInRect.js";
import * as d3 from "d3";
import { getCanvasPoint } from "@/presentation/utils/getCanvasPoint.js";
import { isPrimaryModifier } from "../../utils/platform.js";

export function registerMarqueeNodeSelection(svg, graph, graphHistory) {
  let isDragging = false;
  let start = [0, 0];
  let rect = null;

  svg.on("mousedown.marqueeNodes", function (event) {
    if (event.button !== 0) return;

    if (!isPrimaryModifier(event) || event.shiftKey) return; //⌘/Strg ohne Shift für Nodes

    const target = event.target;
    if (target.closest?.(".node") || target.closest?.(".link")) return;

    isDragging = true;
    start = getCanvasPoint(svg, event);

    const viewport = svg.select("#viewport");

    let layer = viewport.select("#marquee-layer-nodes");
    if (layer.empty())
      layer = viewport.append("g").attr("id", "marquee-layer-nodes");

    rect = createMarqueeRect(layer, start);

    const onMove = (ev) => {
      if (!isDragging) return;
      const current = getCanvasPoint(svg, ev);
      updateMarqueeRect(rect, start, current);
    };

    const onUp = (ev) => {
      if (!isDragging) return;

      const end = getCanvasPoint(svg, ev);
      const bounds = getRectBounds(start, end);

      const newlySelectedNodes = selectNodesInRect(graph, bounds, true);
      updateVisualStyles(svg, graph);
      renderNodePropertiesPanel(newlySelectedNodes, svg, graph, graphHistory);

      if (rect) rect.remove();
      rect = null;
      isDragging = false;

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    event.preventDefault();
  });
}
