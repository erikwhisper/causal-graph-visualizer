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
import { isEditableTarget } from "../../utils/platform.js";
import {
  KEYBOARD_SHORTCUTS,
  applyShortcutTooltips,
} from "../../utils/shortcuts.js";

export function registerKeydownHandlers(svg, graph, graphHistory, gridManager) {
  addMouseMoveListener(svg);

  applyShortcutTooltips();

  const actions = {
    "add-node": () => {
      const [xCoor, yCoor] = getCurrentMousePosition(svg);
      handleAddNode(svg, graph, graphHistory, xCoor, yCoor, gridManager);
    },
    undo: () => handleUndo(svg, graph, graphHistory, gridManager),
    redo: () => handleRedo(svg, graph, graphHistory, gridManager),
    delete: () => handleDelete(svg, graph, graphHistory, gridManager),
    "toggle-grid": () => handleGridToggle(svg, gridManager),
    "fit-to-screen": () => handleFitToScreen(svg),
    "select-all-nodes": () => handleSelectAllNodes(svg, graph, graphHistory),
    "select-all-links": () => handleSelectAllLinks(svg, graph, graphHistory),
  };

  const handler = (event) => {
    if (isEditableTarget(event.target)) return;

    const shortcut = KEYBOARD_SHORTCUTS.find((s) => s.match(event));
    if (!shortcut) return;

    if (shortcut.preventDefault) event.preventDefault();
    actions[shortcut.id]?.();
  };

  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}
