import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderNodePropertiesPanel } from "../../ui/renderNodePropertiesPanel.js";
import { unhighlightAll } from "../../utils/unhighlightAll.js";

export function handleNodeSingleHighlight(element, graph, svg, graphHistory) {
  unhighlightAll(svg, graph);

  const node = d3.select(element).datum();
  node.setHighlighted(true);
  updateVisualStyles(svg, graph);

  const selectedNodes = graph.getAllNodes().filter((n) => n.getHighlighted());
  renderNodePropertiesPanel(selectedNodes, svg, graph, graphHistory);
}
