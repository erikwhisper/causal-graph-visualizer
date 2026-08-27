import * as d3 from "d3";
import { computeLinkPath } from "../../../visualization/utils/computeLinkPath.js";

export function handleLinkDrag(svg, graph, graphHistory, gridManager) {
  const nodes = graph.getAllNodes();

  function updateLinkPaths(d) {
    const path = computeLinkPath(d, nodes);
    svg.select(`#link-${d.getLinkId()}`).attr("d", path);
    svg.select(`#link-hit-${d.getLinkId()}`).attr("d", path);
  }

  return d3
    .drag()
    .on("start", function (event, d) {
      d.wasDragged = false; //reset bei start
    })
    .on("drag", function (event, d) {
      d.wasDragged = true;
      d.setLinkCurvature(event.x, event.y);
      updateLinkPaths(d);
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;

      if (gridManager.isGridEnabled()) {
        const spacing = gridManager.getGridSpacing() / 2;
        const snappedX = Math.round(event.x / spacing) * spacing;
        const snappedY = Math.round(event.y / spacing) * spacing;

        d.setLinkCurvature(snappedX, snappedY);
        updateLinkPaths(d);
      }

      graphHistory.setNewState(graph.getEverything());
    });
}
