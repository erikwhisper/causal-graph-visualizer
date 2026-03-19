import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderLinkPropertiesPanel } from "../../ui/renderLinkPropertiesPanel.js";

export function handleSelectAllLinks(svg, graph, graphHistory) {
  const allLinks = graph.getAllLinks();
  if (allLinks.length === 0) return;

  allLinks.forEach((link) => link.setHighlighted(true));
  updateVisualStyles(svg, graph);
  renderLinkPropertiesPanel(allLinks, svg, graph, graphHistory);
}
