export function getLinksForNodes(graph, nodeIds) {
  const nodeIdSet = nodeIds instanceof Set ? nodeIds : new Set([nodeIds]);

  return graph
    .getAllLinks()
    .filter(
      (link) =>
        nodeIdSet.has(link.getSourceNodeId()) ||
        nodeIdSet.has(link.getTargetNodeId()),
    );
}
