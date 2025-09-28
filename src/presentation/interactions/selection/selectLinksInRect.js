export function selectLinksInRect(graph, bounds, toggleMode) {
  const { x0, y0, x1, y1 } = bounds;
  const nodes = graph.getAllNodes();
  const nodeInside = new Set();

  nodes.forEach((n) => {
    const nx = n.getXValue();
    const ny = n.getYValue();
    const inside = nx >= x0 && nx <= x1 && ny >= y0 && ny <= y1;
    if (inside) nodeInside.add(n.getNodeId());
  });

  const newlySelected = [];

  graph.getAllLinks().forEach((link) => {
    const src = link.getSourceNodeId();
    const tgt = link.getTargetNodeId();

    const inside = nodeInside.has(src) && nodeInside.has(tgt);

    if (inside) {
      if (toggleMode) {
        link.setHighlighted(!link.getHighlighted());
      } else {
        link.setHighlighted(true);
      }
    }

    if (link.getHighlighted()) newlySelected.push(link);
  });

  return newlySelected;
}
