import { handleAddNode } from "./handleAddNode.js";
import { handleDelete } from "./handleDelete.js";
import { handleUndo } from "./handleUndo.js";
import { handleRedo } from "./handleRedo.js";
import { handleGridToggle } from "./handleGridToggle.js";

import { getCurrentMousePosition } from "../../utils/mousePosition.js";

export function registerKeydownHandlers(svg, graph, graphHistory) {
  document.addEventListener("keydown", (event) => {
    const currentMousePos = getCurrentMousePosition();
    const xCoor = currentMousePos[0];
    const yCoor = currentMousePos[1];

    //if (event.altKey && event.key.toLowerCase() === "n") {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "n") {
      handleAddNode(svg, graph, graphHistory, xCoor, yCoor);
    }

    if (event.ctrlKey && event.key.toLowerCase() === "z") {
      handleUndo(svg, graph, graphHistory);
    }

    if (event.ctrlKey && event.key.toLowerCase() === "y") {
      handleRedo(svg, graph, graphHistory);
    }

    if (event.key === "Delete") {
      handleDelete(svg, graph, graphHistory);
    }

    if (event.altKey && event.key.toLowerCase() === "g") {
      handleGridToggle(svg);
    }
  });
}
