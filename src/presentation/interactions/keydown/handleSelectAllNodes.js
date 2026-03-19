import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderNodePropertiesPanel } from "../../ui/renderNodePropertiesPanel.js";

export function handleSelectAllNodes(svg, graph, graphHistory) {
  const allNodes = graph.getAllNodes();
  if (allNodes.length === 0) return;

  allNodes.forEach((node) => node.setHighlighted(true));
  updateVisualStyles(svg, graph);
  renderNodePropertiesPanel(allNodes, svg, graph, graphHistory);
}
