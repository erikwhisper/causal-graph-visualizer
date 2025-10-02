import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderLinkPropertiesPanel } from "../../ui/renderLinkPropertiesPanel.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";

export function handleLinkSingleHighlight(element, graph, svg, graphHistory) {
  unhighlightAll(svg, graph);

  const link = d3.select(element).datum();
  link.setHighlighted(true);
  updateVisualStyles(svg, graph);

  const selectedLinks = graph.getAllLinks().filter((n) => n.getHighlighted());
  renderLinkPropertiesPanel(selectedLinks, svg, graph, graphHistory);
}
