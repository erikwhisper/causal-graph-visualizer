import { drawGrid, removeGrid } from "../../../visualization/draw/drawGrid.js";

export function handleGridToggle(svg, gridManager) {
  gridManager.toggleGrid();
  const isEnabled = gridManager.isGridEnabled();

  if (isEnabled) {
    drawGrid(svg, gridManager.getGridSpacing());
  } else {
    removeGrid(svg);
  }
}
