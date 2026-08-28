import * as d3 from "d3";
import { computeLinkPath } from "../../../visualization/utils/computeLinkPath.js";
import { computeCurvatureSnapCandidates } from "../../../visualization/utils/computeCurvatureSnapCandidates.js";
import { CURVATURE_SNAP_TOLERANCE } from "../../../utils/visualConstants.js";

export function handleLinkDrag(svg, graph, graphHistory, gridManager) {
  const nodes = graph.getAllNodes();

  function updateLinkPaths(d) {
    const path = computeLinkPath(d, nodes);
    svg.select(`#link-${d.getLinkId()}`).attr("d", path);
    svg.select(`#link-hit-${d.getLinkId()}`).attr("d", path);
  }

  function findNearestSnapCandidate(d, x, y) {
    const sourceNode = nodes.find((n) => n.getNodeId() === d.getSourceNodeId());
    const targetNode = nodes.find((n) => n.getNodeId() === d.getTargetNodeId());
    if (!sourceNode || !targetNode) return null;

    const source = { x: sourceNode.getXValue(), y: sourceNode.getYValue() };
    const target = { x: targetNode.getXValue(), y: targetNode.getYValue() };
    const candidates = computeCurvatureSnapCandidates(source, target);

    let best = null;
    let bestDist = Infinity;
    candidates.forEach((c) => {
      const dist = Math.hypot(c.x - x, c.y - y);
      if (dist <= CURVATURE_SNAP_TOLERANCE && dist < bestDist) {
        best = c;
        bestDist = dist;
      }
    });
    return best;
  }

  return d3
    .drag()
    .on("start", function (event, d) {
      d.wasDragged = false;
    })
    .on("drag", function (event, d) {
      d.wasDragged = true;
      d.setLinkCurvature(event.x, event.y);
      updateLinkPaths(d);
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;

      if (gridManager.isGridEnabled()) {
        const magnetMatch = findNearestSnapCandidate(d, event.x, event.y);

        if (magnetMatch) {
          d.setLinkCurvature(magnetMatch.x, magnetMatch.y);
        } else {
          const spacing = gridManager.getGridSpacing() / 2;
          const snappedX = Math.round(event.x / spacing) * spacing;
          const snappedY = Math.round(event.y / spacing) * spacing;
          d.setLinkCurvature(snappedX, snappedY);
        }

        updateLinkPaths(d);
      }

      graphHistory.setNewState(graph.getEverything());
    });
}
