import { drawNodes } from "../../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../../visualization/draw/drawLabels.js";
import { registerClickHandlers } from "../click/registerClickHandlers.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js"; //RENDER_INFO_PANEL: experimentell

export function handleDelete(svg, graph, graphHistory) {
  //hier muss kein unhighlightAll, da alles highlighted gelöscht wird.

  const highlightedNodes = graph
    .getAllNodes()
    .filter((n) => n.getHighlighted());

  const highlightedLinks = graph
    .getAllLinks()
    .filter((l) => l.getHighlighted());

  if (highlightedNodes.length === 0 && highlightedLinks.length === 0) return;

  highlightedNodes.forEach((node) => graph.deleteNode(node.getNodeId()));
  highlightedLinks.forEach((link) => graph.deleteLink(link.getLinkId()));

  //PERFORMANCE ISSUE //FRONTEND
  drawNodes(svg, graph, graphHistory);
  drawLabels(svg, graph);
  drawLinks(svg, graph, graphHistory);
  renderInfoPanel(graph);

  registerClickHandlers(svg, graph, graphHistory);
  graphHistory.setNewState(graph.getEverything());
}
