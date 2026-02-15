export function snapNodePositionsToGrid(nodes, gridManager) {
  const spacing = gridManager.getGridSpacing();
  const deltas = new Map();

  nodes.forEach((node) => {
    const oldX = node.getXValue();
    const oldY = node.getYValue();

    const snappedX = Math.round(oldX / spacing) * spacing;
    const snappedY = Math.round(oldY / spacing) * spacing;

    const dx = snappedX - oldX;
    const dy = snappedY - oldY;

    node.setXValue(snappedX);
    node.setYValue(snappedY);

    deltas.set(node.getNodeId(), { dx: dx, dy: dy });
  });

  return deltas;
}
