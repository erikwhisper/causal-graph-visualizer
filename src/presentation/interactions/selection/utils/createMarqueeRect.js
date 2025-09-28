export function createMarqueeRect(layer, start) {
  const [sx, sy] = start;
  return layer
    .append("rect")
    .attr("class", "marquee-rect")
    .attr("x", sx)
    .attr("y", sy)
    .attr("width", 0)
    .attr("height", 0)
    .style("pointer-events", "none");
}
