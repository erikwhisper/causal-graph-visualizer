export function createGhostLink(svg, node) {
  svg
    .append("line")
    .attr("id", "ghost-link")
    .attr("x1", node.getXValue())
    .attr("y1", node.getYValue())
    .attr("x2", node.getXValue())
    .attr("y2", node.getYValue())
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("pointer-events", "none")
    .attr("marker-end", "url(#ghost-arrowhead)");
}
