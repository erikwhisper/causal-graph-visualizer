import { updateLinkVisual } from "./updateLinkVisual.js";
import { updateLabelVisual } from "./updateLabelVisual.js";
import { getLinksForNodes } from "../../utils/getLinksForNodes.js";

export function updateNodeVisual(node, svg, graph) {
  const nodeId = node.getNodeId();

  const circle = svg.select(`#node-${nodeId}`);
  circle
    .attr("r", node.getRadius())
    .attr("fill", node.getFillColor())
    .attr("stroke", node.getStrokeColor())
    .attr("stroke-width", node.getStrokeWidth())
    .attr("cx", node.getXValue())
    .attr("cy", node.getYValue());

  updateLabelVisual(node, svg);

  const affectedLinks = getLinksForNodes(graph, nodeId);

  affectedLinks.forEach((link) => {
    updateLinkVisual(link, svg, graph);
  });
}
