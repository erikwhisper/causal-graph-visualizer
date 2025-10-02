import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles";
import { renderNodePropertiesPanel } from "../../ui/renderNodePropertiesPanel.js";

export function handleNodeMultiHighlight(element, graph, svg, graphHistory) {
  const node = d3.select(element).datum();
  node.setHighlighted(!node.getHighlighted());
  updateVisualStyles(svg, graph);

  const selectedNodes = graph.getAllNodes().filter((n) => n.getHighlighted());
  renderNodePropertiesPanel(selectedNodes, svg, graph, graphHistory);
}
