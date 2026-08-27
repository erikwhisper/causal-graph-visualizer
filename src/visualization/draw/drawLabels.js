import {renderLabelLines} from "@/visualization/utils/renderLabelLines.js";

export function drawLabels(svg, graph) {
  const labelGroup = svg.select("#label-layer");

  labelGroup.selectAll(".node-label").remove();

  const nodes = graph.getAllNodes();

  const labels = labelGroup
    .selectAll(".node-label")
    .data(nodes)
    .enter()
    .append("text")
    .attr("id", (d) => `label-${d.getNodeId()}`)
    .attr("class", "node-label")
    .attr("x", (d) => d.getXValue() + d.getLabelOffsetX())
    .attr("y", (d) => d.getYValue() + d.getLabelOffsetY())
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("fill", (d) => d.getLabelColor())
    .style("font-size", (d) => `${d.getLabelFontSize()}px`)
    .style("font-family", (d) => d.getLabelFontFamily())
    .style("pointer-events", "none")
    .style("user-select", "none");

  renderLabelLines(labels)
}