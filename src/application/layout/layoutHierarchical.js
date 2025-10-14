import dagre from "dagre";
import { rescaleToCanvas } from "./utils/rescaleToCanvas";

export function layoutHierarchical(nodes, links, width, height) {
  const g = new dagre.graphlib.Graph();

  g.setGraph({
    rankdir: "TB",
    nodesep: 50,
    ranksep: 80,
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
  const scaledPositions = rescaleToCanvas(dagrePositions, width, height);

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
