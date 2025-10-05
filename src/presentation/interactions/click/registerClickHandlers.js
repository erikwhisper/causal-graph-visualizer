import { handleLinkCreation } from "./handleLinkCreation.js";
import { handleNodeMultiHighlight } from "./handleNodeMultiHighlight.js";
import { handleNodeSingleHighlight } from "./handleNodeSingleHighlight.js";
import { handleLinkMultiHighlight } from "./handleLinkMultiHighlight.js";
import { handleLinkSingleHighlight } from "./handleLinkSingleHighlight.js";
import { handleBackgroundClick } from "./handleBackgroundClick.js";

//Damit die Funktion nur einmalig aufgerufen werden muss, werden clickHandler nun auf den
//jeweiligen Event Layers regestriert und nicht auf den einzelnen zum aktuellen Zeitpunkt
//des Aufrufs vorhandenen nodes/links. Dadurch werden ne menge Functioncalls gespart.
export function registerClickHandlers(svg, graph, graphHistory) {
  const linkCreationHandler = handleLinkCreation(svg, graph, graphHistory);

  const nodeLayer = svg.select("#node-layer");
  const linkLayer = svg.select("#link-layer");

  nodeLayer.on("click", function (event) {
    const target = event.target;

    if (target.classList.contains("node")) {
      if (event.altKey) {
        linkCreationHandler.handleClick(target);
      } else if (event.ctrlKey) {
        handleNodeMultiHighlight(target, graph, svg, graphHistory);
      } else {
        handleNodeSingleHighlight(target, graph, svg, graphHistory);
      }
    }
  });

  linkLayer.on("click", function (event) {
    const target = event.target;

    if (target.classList.contains("link")) {
      if (event.ctrlKey) {
        handleLinkMultiHighlight(target, graph, svg, graphHistory);
      } else {
        handleLinkSingleHighlight(target, graph, svg, graphHistory);
      }
    }
  });

  handleBackgroundClick(svg, graph);
}
