import dagre from "dagre";
import { applyCurvatureOffsets } from "./utils/applyCurvatureOffsets";
import { LAYOUT_NODESEP, LAYOUT_RANKSEP } from "../../utils/visualConstants.js";

export function layoutHierarchical(nodes, links, gridManager) {
  const g = new dagre.graphlib.Graph();

  g.setGraph({
    rankdir: "TB",
    nodesep: LAYOUT_NODESEP,
    ranksep: LAYOUT_RANKSEP,
  });

  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.getNodeId(), {
      width: node.getRadius() * 2,
      height: node.getRadius() * 2,
    });
  });

  links.forEach((link) => {
    g.setEdge(link.getSourceNodeId(), link.getTargetNodeId());
  });

  dagre.layout(g);

  const spacing = gridManager.getGridSpacing();

  nodes.forEach((node) => {
    const pos = g.node(node.getNodeId());
    node.setXValue(Math.round(pos.x / spacing) * spacing);
    node.setYValue(Math.round(pos.y / spacing) * spacing);
  });

  applyCurvatureOffsets(links, nodes);
}
