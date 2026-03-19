export function updateGhostLink(svg, x2, y2, node) {
  const nodeX = node.getXValue();
  const nodeY = node.getYValue();
  const dx = x2 - nodeX;
  const dy = y2 - nodeY;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return;

  const offset = node.getRadius() + node.getStrokeWidth() / 2;
  const x1 = nodeX + (dx / len) * offset;
  const y1 = nodeY + (dy / len) * offset;

  svg
    .select("#ghost-link")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2);
}
