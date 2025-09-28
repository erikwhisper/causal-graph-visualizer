import * as d3 from "d3";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { renderNodePropertiesPanel } from "../../ui/renderNodePropertiesPanel.js";

export function handleNodeMultiHighlight(element, graph, svg, graphHistory) {
  const node = d3.select(element).datum();
  node.setHighlighted(!node.getHighlighted());
  updateVisualStyles(svg, graph);

  //experimentell neu
  const selectedNodes = graph.getAllNodes().filter((n) => n.getHighlighted());
  renderNodePropertiesPanel(selectedNodes, svg, graph, graphHistory);
}

export function handleNodeSingleHighlight(element, graph, svg, graphHistory) {
  d3.selectAll(".node").each(function () {
    d3.select(this).datum().setHighlighted(false);
  });

  const node = d3.select(element).datum();
  node.setHighlighted(true);
  updateVisualStyles(svg, graph);

  //experimentell neu
  const selectedNodes = graph.getAllNodes().filter((n) => n.getHighlighted());
  renderNodePropertiesPanel(selectedNodes, svg, graph, graphHistory);
}
