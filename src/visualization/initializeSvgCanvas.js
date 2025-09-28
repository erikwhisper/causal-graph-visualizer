//Canvas vorbereiten

//hier muss ich mir iwann mal nen richtigen eigenen import raussuchen
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

  svg.append("g").attr("id", "link-layer");
  svg.append("g").attr("id", "node-layer");
  svg.append("g").attr("id", "label-layer");

  return svg;
}
