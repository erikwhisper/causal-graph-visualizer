import { renderInfoPanel } from "../presentation/ui/renderInfoPanel.js";
import { drawGraph } from "./draw/drawGraph.js";

export function redrawGraph(svg, graph, graphHistory, gridManager, options = {}) {
  const { saveState = true, updatePanel = true } = options;

  drawGraph(svg, graph, graphHistory, gridManager);

  if (updatePanel) {
    renderInfoPanel(graph);
  }

  if (saveState) {
    graphHistory.setNewState(graph.getEverything());
  }
}
