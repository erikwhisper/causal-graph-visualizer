import dagre from "dagre";
import { rescaleToCanvas } from "./utils/rescaleToCanvas";
import { applyCurvatureOffsets } from "./utils/applyCurvatureOffsets";
import {
  LAYOUT_NODESEP,
  LAYOUT_RANKSEP,
} from "../../utils/visualConstants.js";

export function layoutHierarchical(nodes, links, width, height, gridManager) {
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

  const dagrePositions = nodes.map((node) => {
    const n = g.node(node.getNodeId());
    return { id: node.getNodeId(), x: n.x, y: n.y };
  });

  //Rescale damit die von dagre berechneten Koordinaten auf meine aktuelle
  //SVG Canvas größe angepasst werden.
  const scaledPositions = rescaleToCanvas(dagrePositions, width, height, gridManager);

  scaledPositions.forEach((pos) => {
    const node = nodes.find((n) => n.getNodeId() === pos.id);
    if (node) {
      node.setXValue(pos.x);
      node.setYValue(pos.y);
    }
  });

  //Curvature apply damit wenn mehrere Kanten zwischen zwei Knoten sind eine mit
  //Offset gezeichnet wird, muss ich beim einfachen Link zeichnen auch noch adden.
  applyCurvatureOffsets(links, nodes);
}
