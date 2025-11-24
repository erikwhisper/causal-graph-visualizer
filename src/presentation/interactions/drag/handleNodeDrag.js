import { updateLabelVisual } from "../../../visualization/update/updateLabelVisual.js";
import { updateLinkVisual } from "../../../visualization/update/updateLinkVisual.js";
import { updateNodeVisual } from "../../../visualization/update/updateNodeVisual.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";

import { getDraggedNodes } from "./utils/getDraggedNodes.js";
import { getAffectedLinks } from "./utils/getAffectedLinks.js";
import { moveNodes } from "./utils/moveNodes.js";
import { moveLinkCurvatures } from "./utils/moveLinkCurvatures.js";
import { snapNodePositionsToGrid } from "./utils/snapNodePositionsToGrid.js";
import { applySnapToLinkCurvatures } from "./utils/applySnapToLinkCurvatures.js";

import { isGridEnabled } from "../../utils/GridManager.js";
import * as d3 from "d3";

export function handleNodeDrag(svg, graph, graphHistory) {
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
      const linksToUpdate = getAffectedLinks(graph.getAllLinks(), movedNodeIds);

      moveNodes(nodesToMove, dx, dy);
      moveLinkCurvatures(linksToUpdate, dx, dy);

      updateNodeVisuals(nodesToMove, svg, graph);
      updateLinkVisuals(linksToUpdate, svg, graph);
      updateLabelVisuals(nodesToMove, svg);
      updateVisualStyles(svg, graph);

      d.initalX = event.x;
      d.initalY = event.y;
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;

      if (isGridEnabled()) {
        const nodesToSnap = getDraggedNodes(graph, d);
        const movedNodeIds = new Set(nodesToSnap.map((n) => n.getNodeId()));
        const linksToUpdate = getAffectedLinks(
          graph.getAllLinks(),
          movedNodeIds
        );

        const snapDeltas = snapNodePositionsToGrid(nodesToSnap);
        applySnapToLinkCurvatures(linksToUpdate, movedNodeIds, snapDeltas);

        updateNodeVisuals(nodesToSnap, svg, graph);
        updateLinkVisuals(linksToUpdate, svg, graph);
        updateLabelVisuals(nodesToSnap, svg);
        updateVisualStyles(svg, graph);
      }

      graphHistory.setNewState(graph.getEverything());
    });
}

//----------Visualisierungs-Funktionen-----------//

export function updateNodeVisuals(nodes, svg, graph) {
  nodes.forEach((node) => updateNodeVisual(node, svg, graph));
}

export function updateLinkVisuals(links, svg, graph) {
  links.forEach((link) => updateLinkVisual(link, svg, graph));
}

export function updateLabelVisuals(nodes, svg) {
  nodes.forEach((node) => updateLabelVisual(node, svg));
}

//----------Visualisierungs-Funktionen-----------//
