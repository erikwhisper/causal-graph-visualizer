import { toggleGrid } from "../../utils/GridManager.js";
import { isGridEnabled } from "../../utils/GridManager.js";
import { getGridSpacing } from "../../utils/GridManager.js";
import { drawGrid, removeGrid } from "../../../visualization/draw/drawGrid.js";

export function handleGridToggle(svg) {
  toggleGrid(); //Zustand umschalten
  const isEnabled = isGridEnabled(); //Danach Zustand abfragen
  console.log(`Grid is now ${isEnabled ? "enabled" : "disabled"}`);

  if (isEnabled) {
    drawGrid(svg, getGridSpacing());
  } else {
    removeGrid(svg);
  }
}
