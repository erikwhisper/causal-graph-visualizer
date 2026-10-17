import {
  formatKeys,
  isKey,
  isMac,
  isPrimaryModifier as mod,
} from "./platform.js";

export const SHORTCUT_GROUPS = [
  { id: "create", title: "Create" },
  { id: "select", title: "Select" },
  { id: "edit", title: "Edit" },
  { id: "view", title: "View" },
];

export const SHORTCUTS = [
  // ---- Create
  {
    id: "add-node",
    group: "create",
    action: "Add node at cursor",
    combos: [["mod", "alt", "N"]],
    buttonId: "add-node-btn",
    tooltip: "Add Node",
    match: (e) => mod(e) && e.altKey && isKey(e, "n"),
  },
  {
    id: "create-edge",
    group: "create",
    action: "Create edge",
    hint: "Click the source node, then the target node",
    combos: [["mod", "alt", "Click"]],
  },

  // ---- Select
  {
    id: "select-all-nodes",
    group: "select",
    action: "Select all nodes",
    combos: [["mod", "A"]],
    buttonId: "select-all-nodes-btn",
    tooltip: "Select All Nodes",
    preventDefault: true,
    match: (e) => mod(e) && !e.shiftKey && !e.altKey && isKey(e, "a"),
  },
  {
    id: "select-all-links",
    group: "select",
    action: "Select all edges",
    combos: [["mod", "shift", "A"]],
    buttonId: "select-all-links-btn",
    tooltip: "Select All Edges",
    preventDefault: true,
    match: (e) => mod(e) && e.shiftKey && !e.altKey && isKey(e, "a"),
  },
  {
    id: "toggle-selection",
    group: "select",
    action: "Add or remove from selection",
    combos: [["mod", "Click"]],
  },
  {
    id: "marquee-nodes",
    group: "select",
    action: "Select nodes in a rectangle",
    hint: "Start on empty canvas",
    combos: [["mod", "Drag"]],
  },
  {
    id: "marquee-links",
    group: "select",
    action: "Select edges in a rectangle",
    hint: "Start on empty canvas",
    combos: [["mod", "shift", "Drag"]],
  },

  // ---- Edit
  {
    id: "undo",
    group: "edit",
    action: "Undo",
    combos: [["mod", "Z"]],
    buttonId: "undo-btn",
    tooltip: "Undo",
    match: (e) => mod(e) && !e.shiftKey && !e.altKey && isKey(e, "z"),
  },
  {
    id: "redo",
    group: "edit",
    action: "Redo",
    combos: [["mod", "Y"]],
    macCombos: [["mod", "shift", "Z"]],
    buttonId: "redo-btn",
    tooltip: "Redo",
    // ⌘⇧Z (Mac-Konvention) und Strg+Shift+Z werden zusätzlich zu ⌘Y / Strg+Y akzeptiert
    match: (e) =>
      mod(e) &&
      !e.altKey &&
      ((isKey(e, "y") && !e.shiftKey) || (isKey(e, "z") && e.shiftKey)),
  },
  {
    id: "delete",
    group: "edit",
    action: "Delete selection",
    combos: [["Delete"]],
    buttonId: "delete-btn",
    tooltip: "Delete Selection",
    // Auf dem Mac heißt die Löschtaste ⌫ (Backspace); "Delete" ist dort Fn+⌫
    match: (e) => e.key === "Delete" || (isMac && e.key === "Backspace"),
  },
  {
    id: "move-node",
    group: "edit",
    action: "Move node",
    combos: [["Drag"]],
  },
  {
    id: "bend-edge",
    group: "edit",
    action: "Bend an edge",
    hint: "Drag the edge",
    combos: [["Drag"]],
  },

  // ---- View
  {
    id: "toggle-grid",
    group: "view",
    action: "Toggle grid and snapping",
    combos: [["alt", "G"]],
    buttonId: "grid-toggle-btn",
    tooltip: "Toggle Grid",
    match: (e) => e.altKey && !e.ctrlKey && !e.metaKey && isKey(e, "g"),
  },
  {
    id: "fit-to-screen",
    group: "view",
    action: "Fit to screen",
    combos: [["mod", "shift", "F"]],
    buttonId: "fit-to-screen-btn",
    tooltip: "Fit to Screen",
    match: (e) => mod(e) && e.shiftKey && !e.altKey && isKey(e, "f"),
  },
  {
    id: "zoom",
    group: "view",
    action: "Zoom",
    combos: [["Scroll"], ["Pinch"]],
  },
  {
    id: "pan",
    group: "view",
    action: "Pan canvas",
    hint: "Drag on empty canvas",
    combos: [["Drag"]],
  },
];

export const KEYBOARD_SHORTCUTS = SHORTCUTS.filter((s) => s.match);

export function getCombos(shortcut) {
  return isMac && shortcut.macCombos ? shortcut.macCombos : shortcut.combos;
}

export function applyShortcutTooltips() {
  SHORTCUTS.forEach((shortcut) => {
    if (!shortcut.buttonId) return;
    const button = document.getElementById(shortcut.buttonId);
    if (button) {
      button.title = `${shortcut.tooltip} (${formatKeys(getCombos(shortcut)[0])})`;
    }
  });
}
