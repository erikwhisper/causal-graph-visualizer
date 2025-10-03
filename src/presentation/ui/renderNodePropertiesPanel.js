import { generateNodePanelHTML } from "./utils/generateNodePanelHTML";
import { registerNodeInputListeners } from "./utils/registerNodeInputListeners";

let cleanupListeners = null;

export function renderNodePropertiesPanel(
  selectedNodes,
  svg,
  graph,
  graphHistory
) {
  const panel = document.getElementById("property-panel");

  //kann weg da eigentlich immer infoPanel angezeigt wird wenn nodes oder link length === 0 ist
  //nomma checken
  if (selectedNodes.length === 0) {
    panel.innerHTML = `<p>Keine Knoten ausgewählt.</p>`;
    return;
  }

  if (cleanupListeners) {
    cleanupListeners();
  }

  const isMultiple = selectedNodes.length > 1;
  const node = selectedNodes[0];

  panel.innerHTML = generateNodePanelHTML(node, isMultiple);

  cleanupListeners = registerNodeInputListeners(
    selectedNodes,
    svg,
    graph,
    graphHistory
  );
}
