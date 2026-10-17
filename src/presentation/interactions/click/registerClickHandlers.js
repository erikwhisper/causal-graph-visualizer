import { handleLinkCreation } from "./handleLinkCreation.js";
import { handleNodeMultiHighlight } from "./handleNodeMultiHighlight.js";
import { handleNodeSingleHighlight } from "./handleNodeSingleHighlight.js";
import { handleLinkMultiHighlight } from "./handleLinkMultiHighlight.js";
import { handleLinkSingleHighlight } from "./handleLinkSingleHighlight.js";
import { handleBackgroundClick } from "./handleBackgroundClick.js";
import { isPrimaryModifier } from "../../utils/platform.js";

export function registerClickHandlers(svg, graph, graphHistory, gridManager) {
  const linkCreationHandler = handleLinkCreation(
    svg,
    graph,
    graphHistory,
    gridManager,
  );

  const nodeLayer = svg.select("#node-layer");
  const linkLayer = svg.select("#link-layer");

  nodeLayer.on("click", function (event) {
    const target = event.target;

    if (target.classList.contains("node")) {
      if (isPrimaryModifier(event) && event.altKey) {
        linkCreationHandler.handleClick(target);
      } else if (isPrimaryModifier(event)) {
        handleNodeMultiHighlight(target, graph, svg, graphHistory);
      } else {
        handleNodeSingleHighlight(target, graph, svg, graphHistory);
      }
    }
  });

  linkLayer.on("click", function (event) {
    const target = event.target;

    if (target.classList.contains("link")) {
      if (isPrimaryModifier(event)) {
        handleLinkMultiHighlight(target, graph, svg, graphHistory);
      } else {
        handleLinkSingleHighlight(target, graph, svg, graphHistory);
      }
    }
  });

  handleBackgroundClick(svg, graph, linkCreationHandler);
}
