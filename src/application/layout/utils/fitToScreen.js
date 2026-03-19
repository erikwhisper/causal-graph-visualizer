import { rescaleToCanvas } from "./rescaleToCanvas.js";
import { redrawGraph } from "../../../visualization/redrawGraph.js";

export function fitToScreen(svg, graph, graphHistory, gridManager) {
  const nodes = graph.getAllNodes();
  if (nodes.length === 0) return;

  const svgEl = svg.node();
  const width = svgEl.clientWidth;
  const height = svgEl.clientHeight;

  const positions = nodes.map((node) => ({
    id: node.getNodeId(),
    x: node.getXValue(),
    y: node.getYValue(),
  }));

  const rescaled = rescaleToCanvas(positions, width, height, gridManager);

  const hasChanges = rescaled.some(({ id, x, y }) => {
    const node = graph.getNodeById(id);
    return node && (node.getXValue() !== x || node.getYValue() !== y);
  });

  if (!hasChanges) return;

  rescaled.forEach(({ id, x, y }) => {
    const node = graph.getNodeById(id);
    if (node) node.setPosition(x, y);
  });

  redrawGraph(svg, graph, graphHistory, gridManager);
}
