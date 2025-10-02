import { drawNodes } from "../../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../../visualization/draw/drawLabels.js";
import { renderInfoPanel } from "../../ui/renderInfoPanel.js";

export function handleDelete(svg, graph, graphHistory) {
  const highlightedNodes = graph
    .getAllNodes()
    .filter((n) => n.getHighlighted());

  const highlightedLinks = graph
    .getAllLinks()
    .filter((l) => l.getHighlighted());

  if (highlightedNodes.length === 0 && highlightedLinks.length === 0) return;

  highlightedNodes.forEach((node) => graph.deleteNode(node.getNodeId()));
  highlightedLinks.forEach((link) => graph.deleteLink(link.getLinkId()));

  drawNodes(svg, graph, graphHistory);
  drawLabels(svg, graph);
  drawLinks(svg, graph, graphHistory);
  renderInfoPanel(graph);

  graphHistory.setNewState(graph.getEverything());
}
