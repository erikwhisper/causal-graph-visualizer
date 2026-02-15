import { redrawGraph } from "../../../visualization/redrawGraph.js";

export function handleDelete(svg, graph, graphHistory, gridManager) {
  const highlightedNodes = graph
    .getAllNodes()
    .filter((n) => n.getHighlighted());

  const highlightedLinks = graph
    .getAllLinks()
    .filter((l) => l.getHighlighted());

  if (highlightedNodes.length === 0 && highlightedLinks.length === 0) return;

  highlightedNodes.forEach((node) => graph.deleteNode(node.getNodeId()));
  highlightedLinks.forEach((link) => graph.deleteLink(link.getLinkId()));

  redrawGraph(svg, graph, graphHistory, gridManager);
}
