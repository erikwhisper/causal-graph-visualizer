import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderLinkPropertiesPanel } from "../../ui/renderLinkPropertiesPanel.js";

export function handleLinkMultiHighlight(element, graph, svg, graphHistory) {
  const link = d3.select(element).datum();
  link.setHighlighted(!link.getHighlighted());
  updateVisualStyles(svg, graph);

  //experimentell neu
  const selectedLinks = graph.getAllLinks().filter((n) => n.getHighlighted());
  renderLinkPropertiesPanel(selectedLinks, svg, graph, graphHistory);
}

export function handleLinkSingleHighlight(element, graph, svg, graphHistory) {
  d3.selectAll(".link").each(function () {
    d3.select(this).datum().setHighlighted(false);
  });

  const link = d3.select(element).datum();
  link.setHighlighted(true);
  updateVisualStyles(svg, graph);

  //experimentell neu
  const selectedLinks = graph.getAllLinks().filter((n) => n.getHighlighted());
  renderLinkPropertiesPanel(selectedLinks, svg, graph, graphHistory);
}
