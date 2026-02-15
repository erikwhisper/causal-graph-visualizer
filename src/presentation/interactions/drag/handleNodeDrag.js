import { updateLinkVisual } from "../../../visualization/update/updateLinkVisual.js";
import { updateNodeVisual } from "../../../visualization/update/updateNodeVisual.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";

import { getDraggedNodes } from "./utils/getDraggedNodes.js";
import { getLinksForNodes } from "../../../utils/getLinksForNodes.js";
import { moveNodes } from "./utils/moveNodes.js";
import { moveLinkCurvatures } from "./utils/moveLinkCurvatures.js";
import { snapNodePositionsToGrid } from "./utils/snapNodePositionsToGrid.js";
import { applySnapToLinkCurvatures } from "./utils/applySnapToLinkCurvatures.js";

import * as d3 from "d3";

export function handleNodeDrag(svg, graph, graphHistory, gridManager) {
  return d3
    .drag()
    .on("start", function (event, d) {
      d.wasDragged = false;
      d.initalX = event.x;
      d.initalY = event.y;
    })
    .on("drag", function (event, d) {
      d.wasDragged = true;
      const dx = event.x - d.initalX;
      const dy = event.y - d.initalY;

      const nodesToMove = getDraggedNodes(graph, d);
      const movedNodeIds = new Set(nodesToMove.map((n) => n.getNodeId()));
      const linksToUpdate = getLinksForNodes(graph, movedNodeIds);

      moveNodes(nodesToMove, dx, dy);
      moveLinkCurvatures(linksToUpdate, dx, dy);

      nodesToMove.forEach((node) => updateNodeVisual(node, svg, graph));
      linksToUpdate.forEach((link) => updateLinkVisual(link, svg, graph));
      updateVisualStyles(svg, graph);

      d.initalX = event.x;
      d.initalY = event.y;
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;

      if (gridManager.isGridEnabled()) {
        const nodesToSnap = getDraggedNodes(graph, d);
        const movedNodeIds = new Set(nodesToSnap.map((n) => n.getNodeId()));
        const linksToUpdate = getLinksForNodes(graph, movedNodeIds);

        const snapDeltas = snapNodePositionsToGrid(nodesToSnap, gridManager);
        applySnapToLinkCurvatures(linksToUpdate, movedNodeIds, snapDeltas);

        nodesToSnap.forEach((node) => updateNodeVisual(node, svg, graph));
        linksToUpdate.forEach((link) => updateLinkVisual(link, svg, graph));
        updateVisualStyles(svg, graph);
      }

      graphHistory.setNewState(graph.getEverything());
    });
}
