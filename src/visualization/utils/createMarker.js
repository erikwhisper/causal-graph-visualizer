export function createMarker(defs, { id, type, width, color, orientation }) {
  if (type === "normal") {
    defs
      .append("marker")
      .attr("id", id)
      .attr("viewBox", `0 -${width / 2} ${width} ${width}`)
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", width)
      .attr("markerHeight", width)
      .attr("orient", orientation)
      .attr("markerUnits", "userSpaceOnUse")
      .append("path")
      .attr("d", `M 0,-${width / 2} L ${width} 0 L 0,${width / 2}`)
      .attr("fill", color);
  } else if (type === "odot") {
    const circleStrokeWidth = 2;
    defs
      .append("marker")
      .attr("id", id)
      .attr("viewBox", `0 -${width / 2} ${width} ${width}`)
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", width)
      .attr("markerHeight", width)
      .attr("orient", orientation)
      .attr("markerUnits", "userSpaceOnUse")
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", 0)
      .attr("r", (width - circleStrokeWidth) / 2)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", circleStrokeWidth);
  } else if (type === "tail") {
    defs
      .append("marker")
      .attr("id", id)
      .attr("viewBox", "0 0 1 1")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 1)
      .attr("markerHeight", 1)
      .attr("orient", orientation)
      .attr("markerUnits", "userSpaceOnUse");
  }
}
