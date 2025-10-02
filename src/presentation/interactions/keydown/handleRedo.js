import { drawNodes } from "../../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../../visualization/draw/drawLabels.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js";
export function handleRedo(svg, graph, graphHistory) {
  unhighlightAll(svg, graph);

  console.log("Redo!");
  graphHistory.redo();

  const state = graphHistory.getState();
  graph.setEverything(state);

  drawNodes(svg, graph, graphHistory);
  drawLabels(svg, graph);
  drawLinks(svg, graph, graphHistory);
  renderInfoPanel(graph);
}
