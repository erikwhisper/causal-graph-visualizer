import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { redrawGraph } from "../../../visualization/redrawGraph.js";
import { showAddNodeModal } from "./utils/showAddNodeModal.js";

export function handleAddNode(svg, graph, graphHistory, xCoor, yCoor, gridManager) {
  unhighlightAll(svg, graph);

  showAddNodeModal((nodeName) => {
    graph.addNode({
      x: xCoor,
      y: yCoor,
      label: nodeName,
    });
    redrawGraph(svg, graph, graphHistory, gridManager);
  });
}
