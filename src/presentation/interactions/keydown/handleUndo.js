import { unhighlightAll } from "../../utils/unhighlightAll.js";
import { redrawGraph } from "../../../visualization/redrawGraph.js";
export function handleUndo(svg, graph, graphHistory) {
  unhighlightAll(svg, graph);

  graphHistory.undo();

  const state = graphHistory.getState();
  graph.setEverything(state);

  redrawGraph(svg, graph, graphHistory, { saveState: false });
}
