import { fitToScreen } from "../../../application/layout/utils/fitToScreen.js";
import {resetCanvasNavigation} from "@/presentation/interactions/zoom/registerCanvasNavigation.js";
export function handleFitToScreen(svg, graph, graphHistory, gridManager) {
  resetCanvasNavigation(svg);
  fitToScreen(svg, graph, graphHistory, gridManager);
}
