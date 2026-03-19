import { handleAddNode } from "./handleAddNode.js";
import { handleDelete } from "./handleDelete.js";
import { handleUndo } from "./handleUndo.js";
import { handleRedo } from "./handleRedo.js";
import { handleGridToggle } from "./handleGridToggle.js";
import { handleFitToScreen } from "./handleFitToScreen.js";
import { handleSelectAllNodes } from "./handleSelectAllNodes.js";
import { handleSelectAllLinks } from "./handleSelectAllLinks.js";
import {
  addMouseMoveListener,
  getCurrentMousePosition,
} from "./utils/mousePosition.js";

export function registerKeydownHandlers(svg, graph, graphHistory, gridManager) {
  addMouseMoveListener(svg);

  document.addEventListener("keydown", (event) => {
    const currentMousePos = getCurrentMousePosition();
    const xCoor = currentMousePos[0];
    const yCoor = currentMousePos[1];

    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "n") {
      handleAddNode(svg, graph, graphHistory, xCoor, yCoor, gridManager);
    }

    if (event.ctrlKey && event.key.toLowerCase() === "z") {
      handleUndo(svg, graph, graphHistory, gridManager);
    }

    if (event.ctrlKey && event.key.toLowerCase() === "y") {
      handleRedo(svg, graph, graphHistory, gridManager);
    }

    if (event.key === "Delete") {
      handleDelete(svg, graph, graphHistory, gridManager);
    }

    if (event.altKey && event.key.toLowerCase() === "g") {
      handleGridToggle(svg, gridManager);
    }

    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "f") {
      handleFitToScreen(svg, graph, graphHistory, gridManager);
    }

    if (event.ctrlKey && !event.shiftKey && event.key.toLowerCase() === "a") {
      event.preventDefault();
      handleSelectAllNodes(svg, graph, graphHistory);
    }

    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
      event.preventDefault();
      handleSelectAllLinks(svg, graph, graphHistory);
    }
  });
}
