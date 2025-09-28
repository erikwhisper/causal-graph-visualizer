export function selectNodesInRect(graph, bounds, toggleMode) {
  const { x0, y0, x1, y1 } = bounds;
  const newlySelected = [];

  graph.getAllNodes().forEach((n) => {
    const nx = n.getXValue();
    const ny = n.getYValue();
    const inside = nx >= x0 && nx <= x1 && ny >= y0 && ny <= y1;

    if (inside) {
      if (toggleMode) {
        n.setHighlighted(!n.getHighlighted());
      } else {
        n.setHighlighted(true);
      }
    }

    if (n.getHighlighted()) newlySelected.push(n);
  });

  return newlySelected;
}
