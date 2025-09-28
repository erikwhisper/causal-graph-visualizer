import { updateVisualStyles } from "../../visualization/update/updateVisualStyles.js";
import { renderNodePropertiesPanel } from "../ui/renderNodePropertiesPanel.js";
import { renderLinkPropertiesPanel } from "../ui/renderLinkPropertiesPanel.js";
import { renderInfoPanel } from "../ui/renderInfoPanel.js"; //RENDER_INFO_PANEL: experimentell

export function unhighlightAll(svg, graph) {
  graph.getAllNodes().forEach((node) => node.setHighlighted(false));
  graph.getAllLinks().forEach((link) => link.setHighlighted(false));

  updateVisualStyles(svg, graph);
  //renderNodePropertiesPanel([], svg, graph); //RENDER_INFO_PANEL: experimentell entfernt
  //renderLinkPropertiesPanel([], svg, graph); // RENDER_INFO_PANEL:experimentell entfernt
  renderInfoPanel(graph);
}

