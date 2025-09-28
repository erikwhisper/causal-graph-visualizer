import * as d3 from "d3";
import { drawNodes } from "../../../visualization/draw/drawNodes.js";
import { drawLabels } from "../../../visualization/draw/drawLabels.js";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { registerClickHandlers } from "./registerClickHandlers.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js"; //RENDER_INFO_PANEL: experimentell

//OG VERSION:
let firstNode = null;

export function handleLinkCreation(element, svg, graph, graphHistory) {
  unhighlightAll(svg, graph);

  const clickedNode = d3.select(element).datum();

  if (!firstNode) {
    firstNode = clickedNode;
    return;
  }

  const secondNode = clickedNode;

  if (firstNode.getNodeId() === secondNode.getNodeId()) {
    firstNode = null;
    return;
  }

  graph.addLink({
    sourceNodeId: firstNode.getNodeId(),
    targetNodeId: secondNode.getNodeId(),
  });

  //PERFORMANCE ISSUE
  drawNodes(svg, graph, graphHistory);
  drawLabels(svg, graph);
  drawLinks(svg, graph, graphHistory);
  updateVisualStyles(svg, graph);
  renderInfoPanel(graph);

  registerClickHandlers(svg, graph, graphHistory);
  graphHistory.setNewState(graph.getEverything());

  firstNode = null;
}
