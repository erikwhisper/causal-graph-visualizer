export function drawLabels(svg, graph) {
  const labelGroup = svg.select("#label-layer");

  labelGroup.selectAll(".node-label").remove();

  const nodes = graph.getAllNodes();

  labelGroup
    .selectAll(".node-label")
    .data(nodes)
    .enter()
    .append("text")
    .attr("id", (d) => `label-${d.getNodeId()}`)
    .attr("class", "node-label")
    .attr("x", (d) => d.getXValue() + d.getLabelOffsetX())
    .attr("y", (d) => d.getYValue() + d.getLabelOffsetY())
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .text((d) => d.getLabel())
    .attr("fill", (d) => d.getLabelColor())
    .style("font-size", (d) => `${d.getLabelFontSize()}px`)
    //.style("font-family", (d) => d.getLabelFontFamily())
    .style("pointer-events", "none")
    .style("user-select", "none");
}
