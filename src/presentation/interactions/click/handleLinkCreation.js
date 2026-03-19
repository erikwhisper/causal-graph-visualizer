import * as d3 from "d3";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js";
import { ensureGhostArrowhead } from "./utils/ensureGhostArrowhead.js";
import { createGhostLink } from "./utils/createGhostLink.js";
import { updateGhostLink } from "./utils/updateGhostLink.js";
import { removeGhostLink } from "./utils/removeGhostLink.js";

export function handleLinkCreation(svg, graph, graphHistory, gridManager) {
  let firstNode = null;

  return {
    handleClick(element) {
      unhighlightAll(svg, graph);
      const clickedNode = d3.select(element).datum();

      if (!firstNode) {
        firstNode = clickedNode;
        ensureGhostArrowhead(svg);
        createGhostLink(svg, firstNode);
        svg.on("mousemove.ghost", function (event) {
          const [mx, my] = d3.pointer(event);
          updateGhostLink(svg, mx, my, firstNode);
        });
        return;
      }

      const secondNode = clickedNode;
      if (firstNode.getNodeId() === secondNode.getNodeId()) {
        removeGhostLink(svg);
        firstNode = null;
        return;
      }

      removeGhostLink(svg);
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
