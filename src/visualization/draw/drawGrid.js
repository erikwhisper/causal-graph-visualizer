

export function drawGrid(svg, gridSpacing) {
  svg.selectAll(".grid-line").remove();

  const width = parseInt(svg.attr("width"), 10);
  const height = parseInt(svg.attr("height"), 10);
  const refinedSpacing = gridSpacing / 2;

  const gridGroup = svg.append("g").attr("class", "grid");

  for (let x = 0; x < width; x += refinedSpacing) {
    gridGroup
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", x)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", height)
      .attr("stroke", "#ccc")
      .attr("stroke-width", x % gridSpacing === 0 ? 1 : 0.5);
  }

  for (let y = 0; y < height; y += refinedSpacing) {
    gridGroup
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("y1", y)
      .attr("x2", width)
      .attr("y2", y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", y % gridSpacing === 0 ? 1 : 0.5);
  }

  gridGroup.lower();
}

export function removeGrid(svg) {
  svg.selectAll(".grid-line").remove();
}
