import { generateLinkPanelHTML } from "./utils/generateLinkPanelHTML.js";
import { registerLinkInputListeners } from "./utils/registerLinkInputListeners.js";
import Coloris from "@melloware/coloris";

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


  panel.innerHTML = generateLinkPanelHTML(selectedLinks);
  Coloris.wrap(".coloris");

  cleanupListeners = registerLinkInputListeners(
    selectedLinks,
    svg,
    graph,
    graphHistory,
  );
}