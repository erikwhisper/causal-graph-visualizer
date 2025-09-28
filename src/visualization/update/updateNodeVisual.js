import { updateLinkVisual } from "./updateLinkVisual.js";

export function updateNodeVisual(node, svg, graph) {
  const nodeId = node.getNodeId();

  //update node (circle part)
  const circle = svg.select(`#node-${nodeId}`);
  circle
    .attr("r", node.getRadius())
    .attr("fill", node.getFillColor())
    .attr("stroke", node.getStrokeColor())
    .attr("stroke-width", node.getStrokeWidth())
    .attr("cx", node.getXValue())
    .attr("cy", node.getYValue());

  //update label
  const label = svg.select(`#label-${nodeId}`);
  label
    .text(node.getLabel())
    .attr("x", node.getXValue() + node.getLabelOffsetX())
    .attr("y", node.getYValue() + node.getLabelOffsetY())
    .attr("fill", node.getLabelColor())
    .style("font-size", `${node.getLabelFontSize()}px`);

  //iwann performanter besser machen:
  //Hier gibt es meines wissens nach aktuell in handleNodeDrag.js auch schon eine
  //passende Hilfsfunktion die ich hier nutzen kann!
  const affectedLinks = graph
    .getAllLinks()
    .filter(
      (link) =>
        link.getSourceNodeId() === nodeId || link.getTargetNodeId() === nodeId
    );

  //hier koennte man die updateLinkVisuals funktion aus aktuell handleNodeDrag.js nutzen
  affectedLinks.forEach((link) => {
    updateLinkVisual(link, svg, graph);
  });
}
