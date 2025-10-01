export function applySnapToLinkCurvatures(links, movedNodeIds, snapDeltas) {
  links.forEach((link) => {
    const sourceId = link.getSourceNodeId();
    const targetId = link.getTargetNodeId();
    const sourceMoved = movedNodeIds.has(sourceId);
    const targetMoved = movedNodeIds.has(targetId);

    if (
      (sourceMoved || targetMoved) &&
      link.getLinkCurvatureX() != null &&
      link.getLinkCurvatureY() != null
    ) {
      let dx = 0,
        dy = 0;

      if (sourceMoved && targetMoved) {
        const d1 = snapDeltas.get(sourceId);
        const d2 = snapDeltas.get(targetId);
        dx = (d1.dx + d2.dx) / 2;
        dy = (d1.dy + d2.dy) / 2;
      } else if (sourceMoved) {
        ({ dx, dy } = snapDeltas.get(sourceId));
      } else if (targetMoved) {
        ({ dx, dy } = snapDeltas.get(targetId));
      }

      link.setLinkCurvatureX(link.getLinkCurvatureX() + dx);
      link.setLinkCurvatureY(link.getLinkCurvatureY() + dy);
    }
  });
}
