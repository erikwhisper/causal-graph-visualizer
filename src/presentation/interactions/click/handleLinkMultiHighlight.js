import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderLinkPropertiesPanel } from "../../ui/renderLinkPropertiesPanel.js";

export function handleLinkMultiHighlight(element, graph, svg, graphHistory) {
  const link = d3.select(element).datum();
  link.setHighlighted(!link.getHighlighted());
  updateVisualStyles(svg, graph);

  const selectedLinks = graph.getAllLinks().filter((n) => n.getHighlighted());
  renderLinkPropertiesPanel(selectedLinks, svg, graph, graphHistory);
}
