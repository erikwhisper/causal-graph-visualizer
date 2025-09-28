import { handleLinkCreation } from "./handleLinkCreation.js";
import { handleNodeSingleHighlight } from "./nodeClickHandlers.js";
import { handleNodeMultiHighlight } from "./nodeClickHandlers.js";
import { handleLinkSingleHighlight } from "./linkClickHandlers.js";
import { handleLinkMultiHighlight } from "./linkClickHandlers.js";
import { registerBackgroundClick } from "./backgroundClickHandler.js";

export function registerClickHandlers(svg, graph, graphHistory) {
  svg.selectAll(".node").on("click", null);
  svg.selectAll(".link").on("click", null);

  svg.selectAll(".node").on("click", function (event) {
    if (event.altKey) {
      handleLinkCreation( this, svg, graph, graphHistory);
    } else if (event.ctrlKey) {
      handleNodeMultiHighlight(this, graph, svg, graphHistory);
    } else {
      handleNodeSingleHighlight(this, graph, svg, graphHistory);
    }
  });

  svg.selectAll(".link").on("click", function (event) {
    if (event.ctrlKey) {
      handleLinkMultiHighlight(this, graph, svg, graphHistory);
    } else {
      handleLinkSingleHighlight(this, graph, svg, graphHistory);
    }
  });

  registerBackgroundClick(svg, graph);
}

