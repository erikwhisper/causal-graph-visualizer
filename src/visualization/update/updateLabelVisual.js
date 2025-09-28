export function updateLabelVisual(node, svg) {
  const nodeId = node.getNodeId();

  const label = svg.select(`#label-${nodeId}`);
  label
    .text(node.getLabel())
    .attr("x", node.getXValue() + node.getLabelOffsetX())
    .attr("y", node.getYValue() + node.getLabelOffsetY())
    .attr("fill", node.getLabelColor())
    .style("font-size", `${node.getLabelFontSize()}px`);
}
