import { handleNodeDrag } from "../../presentation/interactions/drag/handleNodeDrag.js";

export function drawNodes(svg, graph, graphHistory, gridManager) {
  const nodeGroup = svg.select("#node-layer");

  nodeGroup.selectAll(".node").remove();

  const nodes = graph.getAllNodes();

  nodeGroup
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("id", (d) => `node-${d.getNodeId()}`)
    .attr("class", "node")
    .attr("r", (d) => d.getRadius())
    .attr("fill", (d) => d.getFillColor())
    .attr("stroke", (d) => d.getStrokeColor())
    .attr("stroke-width", (d) => d.getStrokeWidth())
    .attr("cx", (d) => d.getXValue())
    .attr("cy", (d) => d.getYValue())
    .call(handleNodeDrag(svg, graph, graphHistory, gridManager));
}
