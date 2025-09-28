import { drawNodes } from "./drawNodes.js";
import { drawLinks } from "./drawLinks.js";
import { drawLabels } from "./drawLabels.js";

export function drawGraph(svg, graph, graphHistory) {
  drawNodes(svg, graph, graphHistory);
  drawLabels(svg, graph);
  drawLinks(svg, graph, graphHistory);
}
