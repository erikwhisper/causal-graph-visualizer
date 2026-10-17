import { generateNodePanelHTML } from "./utils/generateNodePanelHTML";
import { registerNodeInputListeners } from "./utils/registerNodeInputListeners";
import Coloris from "@melloware/coloris";

let cleanupListeners = null;

export function renderNodePropertiesPanel(
  selectedNodes,
  svg,
  graph,
  graphHistory,
) {
  const panel = document.getElementById("property-panel");

  if (selectedNodes.length === 0) {
    panel.innerHTML = `<p>No Node selected.</p>`;
    return;
  }

  if (cleanupListeners) {
    cleanupListeners();
  }


  panel.innerHTML = generateNodePanelHTML(selectedNodes);
  Coloris.wrap(".coloris");

  cleanupListeners = registerNodeInputListeners(
    selectedNodes,
    svg,
    graph,
    graphHistory,
  );
}