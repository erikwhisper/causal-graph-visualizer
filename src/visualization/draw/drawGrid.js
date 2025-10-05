export function drawGrid(svg, gridSpacing) {
  removeGrid(svg);

  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const refinedSpacing = gridSpacing / 2;

  let defs = svg.select("defs");
  if (defs.empty()) {
    defs = svg.insert("defs", ":first-child");
  }

  const smallPattern = defs
    .append("pattern")
    .attr("id", "grid-pattern-small")
    .attr("width", refinedSpacing)
    .attr("height", refinedSpacing)
    .attr("patternUnits", "userSpaceOnUse");

  smallPattern
    .append("path")
    .attr("d", `M ${refinedSpacing} 0 L 0 0 0 ${refinedSpacing}`)
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 0.5);

  const bigPattern = defs
    .append("pattern")
    .attr("id", "grid-pattern-big")
    .attr("width", gridSpacing)
    .attr("height", gridSpacing)
    .attr("patternUnits", "userSpaceOnUse");

  bigPattern
    .append("path")
    .attr("d", `M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`)
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1);

  const gridLayer = svg.insert("g", ":first-child").attr("class", "grid-layer");

  gridLayer
    .append("rect")
    .attr("class", "grid-fine")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#grid-pattern-small)")
    .style("pointer-events", "none");

  gridLayer
    .append("rect")
    .attr("class", "grid-coarse")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#grid-pattern-big)")
    .style("pointer-events", "none");
}

export function removeGrid(svg) {
  svg.select(".grid-layer").remove();
  svg.select("#grid-pattern-small").remove();
  svg.select("#grid-pattern-big").remove();
}
