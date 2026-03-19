import { handleAddNode } from "../interactions/keydown/handleAddNode.js";
import { handleUndo } from "../interactions/keydown/handleUndo.js";
import { handleRedo } from "../interactions/keydown/handleRedo.js";
import { handleDelete } from "../interactions/keydown/handleDelete.js";
import { handleGridToggle } from "../interactions/keydown/handleGridToggle.js";
import { handleFitToScreen } from "../interactions/keydown/handleFitToScreen.js";
import { handleSelectAllNodes } from "../interactions/keydown/handleSelectAllNodes.js";
import { handleSelectAllLinks } from "../interactions/keydown/handleSelectAllLinks.js";

export function registerToolbarButtons(svg, graph, graphHistory, gridManager) {
  const addNodeBtn = document.getElementById("add-node-btn");
  const undoBtn = document.getElementById("undo-btn");
  const redoBtn = document.getElementById("redo-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const gridToggleBtn = document.getElementById("grid-toggle-btn");
  const fitToScreenBtn = document.getElementById("fit-to-screen-btn");
  const selectAllNodesBtn = document.getElementById("select-all-nodes-btn");
  const selectAllLinksBtn = document.getElementById("select-all-links-btn");

  if (addNodeBtn) {
    addNodeBtn.addEventListener("click", () => {
      handleAddNode(svg, graph, graphHistory, 100, 100, gridManager);
    });
  }
  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      handleUndo(svg, graph, graphHistory, gridManager);
    });
  }
  if (redoBtn) {
    redoBtn.addEventListener("click", () => {
      handleRedo(svg, graph, graphHistory, gridManager);
    });
  }
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      handleDelete(svg, graph, graphHistory, gridManager);
    });
  }
  if (gridToggleBtn) {
    gridToggleBtn.addEventListener("click", () => {
      handleGridToggle(svg, gridManager);
    });
  }
  if (fitToScreenBtn) {
    fitToScreenBtn.addEventListener("click", () => {
      handleFitToScreen(svg, graph, graphHistory, gridManager);
    });
  }
  if (selectAllNodesBtn) {
    selectAllNodesBtn.addEventListener("click", () => {
      handleSelectAllNodes(svg, graph, graphHistory);
    });
  }
  if (selectAllLinksBtn) {
    selectAllLinksBtn.addEventListener("click", () => {
      handleSelectAllLinks(svg, graph, graphHistory);
    });
  }
}
