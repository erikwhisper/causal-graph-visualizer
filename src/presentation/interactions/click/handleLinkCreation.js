import * as d3 from "d3";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js";

export function handleLinkCreation(svg, graph, graphHistory, gridManager) {
  let firstNode = null;

  return {
    handleClick(element) {
      unhighlightAll(svg, graph);
      const clickedNode = d3.select(element).datum();

      if (!firstNode) {
        firstNode = clickedNode;
        return;
      }

      const secondNode = clickedNode;

      if (firstNode.getNodeId() === secondNode.getNodeId()) {
        firstNode = null;
        return;
      }

      graph.addLink({
        sourceNodeId: firstNode.getNodeId(),
        targetNodeId: secondNode.getNodeId(),
      });

      drawLinks(svg, graph, graphHistory, gridManager);
      renderInfoPanel(graph);
      graphHistory.setNewState(graph.getEverything());

      firstNode = null;
    },
  };
}
