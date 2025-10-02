import { updateVisualStyles } from "../../visualization/update/updateVisualStyles.js";
import { renderInfoPanel } from "../ui/renderInfoPanel.js";

export function unhighlightAll(svg, graph) {
  graph.getAllNodes().forEach((node) => node.setHighlighted(false));
  graph.getAllLinks().forEach((link) => link.setHighlighted(false));

  updateVisualStyles(svg, graph);
  renderInfoPanel(graph);
}
