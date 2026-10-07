import * as d3 from "d3";

export function initializeSvgCanvas() {
  const containerId = "#graph-container";

  d3.select(containerId).selectAll("*").remove();

  const width = d3.select(containerId).node().offsetWidth;
  const height = d3.select(containerId).node().offsetHeight;

  const svg = d3
    .select(containerId)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  //optional das browser contextmenü hier ausstellen

  //add an control layer for canvas navigation (like zoom etc)
  const viewport = svg.append("g").attr("id", "viewport");

  viewport.append("g").attr("id", "link-layer");
  viewport.append("g").attr("id", "node-layer");
  viewport.append("g").attr("id", "label-layer");

  return svg;
}
