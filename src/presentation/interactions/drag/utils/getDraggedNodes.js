export function getDraggedNodes(graph, draggedNode) {
  const highlightedNodes = graph
    .getAllNodes()
    .filter((n) => n.getHighlighted());
  const nodesToMove =
    highlightedNodes.length > 0 ? highlightedNodes : [draggedNode];
  return nodesToMove;
}