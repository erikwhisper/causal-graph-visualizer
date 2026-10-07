import * as d3 from "d3";

export function getCanvasPoint(svg, event) {
  const viewport = svg.select("#viewport");
  const coordinateSpace = viewport.empty() ? svg.node() : viewport.node();

  return d3.pointer(event, coordinateSpace);
}