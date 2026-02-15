import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { redrawGraph } from "../../../visualization/redrawGraph.js";
export function handleRedo(svg, graph, graphHistory, gridManager) {
  unhighlightAll(svg, graph);

  graphHistory.redo();

  const state = graphHistory.getState();
  graph.setEverything(state);

  redrawGraph(svg, graph, graphHistory,gridManager, { saveState: false });
}
