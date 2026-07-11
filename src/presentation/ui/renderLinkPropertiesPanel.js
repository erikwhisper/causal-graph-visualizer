import { generateLinkPanelHTML } from "./utils/generateLinkPanelHTML.js";
import { registerLinkInputListeners } from "./utils/registerLinkInputListeners.js";

let cleanupListeners = null;

export function renderLinkPropertiesPanel(
  selectedLinks,
  svg,
  graph,
  graphHistory,
) {
  const panel = document.getElementById("property-panel");

  if (selectedLinks.length === 0) {
    panel.innerHTML = `<p>No Link selected.</p>`;
    return;
  }

  if (cleanupListeners) {
    cleanupListeners();
  }

  const isMultiple = selectedLinks.length > 1;
  const link = selectedLinks[0];

  panel.innerHTML = generateLinkPanelHTML(link, isMultiple);

  cleanupListeners = registerLinkInputListeners(
    selectedLinks,
    svg,
    graph,
    graphHistory,
  );
}
