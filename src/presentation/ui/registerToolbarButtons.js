// presentation/ui/registerToolbarButtons.js

import { handleAddNode } from "../interactions/keydown/handleAddNode.js";
import { handleUndo } from "../interactions/keydown/handleUndo.js";
import { handleRedo } from "../interactions/keydown/handleRedo.js";
import { handleDelete } from "../interactions/keydown/handleDelete.js";
import { handleGridToggle } from "../interactions/keydown/handleGridToggle.js";

export function registerToolbarButtons(svg, graph, graphHistory) {
  const addNodeBtn = document.getElementById("add-node-btn");
  const undoBtn = document.getElementById("undo-btn");
  const redoBtn = document.getElementById("redo-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const gridToggleBtn = document.getElementById("grid-toggle-btn");

  if (addNodeBtn) {
    addNodeBtn.addEventListener("click", (event) => {
      const xCoor = 100;
      const yCoor = 100;
      handleAddNode(svg, graph, graphHistory, xCoor, yCoor);
    });
  }

  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      handleUndo(svg, graph, graphHistory);
    });
  }

  if (redoBtn) {
    redoBtn.addEventListener("click", () => {
      handleRedo(svg, graph, graphHistory);
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      handleDelete(svg, graph, graphHistory);
    });
  }
  if (gridToggleBtn) {
    gridToggleBtn.addEventListener("click", () => {
      handleGridToggle(svg);
    });
  }
}
