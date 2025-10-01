export function getAffectedLinks(links, movedNodeIds) {
  return links.filter(
    (link) =>
      movedNodeIds.has(link.getSourceNodeId()) ||
      movedNodeIds.has(link.getTargetNodeId())
  );
}
