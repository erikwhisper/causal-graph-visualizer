export function moveNodes(nodes, dx, dy) {
  nodes.forEach((node) => {
    const newX = node.getXValue() + dx;
    const newY = node.getYValue() + dy;
    node.setXValue(newX);
    node.setYValue(newY);
  });
}
