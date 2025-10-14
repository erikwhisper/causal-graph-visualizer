import "@fortawesome/fontawesome-free/css/all.min.css";

import { GraphHistoryManager } from "./domain/service/GraphHistoryManager.js";
import { registerClickHandlers } from "./presentation/interactions/click/registerClickHandlers.js";
import { registerKeydownHandlers } from "./presentation/interactions/keydown/registerKeydownHandlers.js";
import { registerToolbarButtons } from "./presentation/ui/registerToolbarButtons.js";
import { jsonFileUpload } from "./application/io/jsonFileUpload.js";
import { matrixFileUpload } from "./application/io/matrixFileUpload.js";
import { jsonFileDownload } from "./application/io/jsonFileDownload.js";
import { matrixFileDownload } from "./application/io/matrixFileDownload.js";
import { initializeSvgCanvas } from "./visualization/initializeSvgCanvas.js";
import { drawGraph } from "./visualization/draw/drawGraph.js";

import GraphModel from "./domain/model/GraphModel.js";

import { setupPngExport } from "./application/io/exportPng.js";
import { setupPdfExport } from "./application/io/exportPdf.js";

import { registerMarqueeNodeSelection } from "./presentation/interactions/selection/registerMarqueeNodeSelection.js";
import { registerMarqueeLinkSelection } from "./presentation/interactions/selection/registerMarqueeLinkSelection.js";

const graph = new GraphModel();

const graphHistory = new GraphHistoryManager(graph.getEverything());

let svg = initializeSvgCanvas();

drawGraph(svg, graph, graphHistory);

registerClickHandlers(svg, graph, graphHistory);

registerMarqueeNodeSelection(svg, graph, graphHistory);

registerMarqueeLinkSelection(svg, graph, graphHistory);

registerKeydownHandlers(svg, graph, graphHistory);

registerToolbarButtons(svg, graph, graphHistory);

//-----Ab hier weiter:

jsonFileUpload(svg, graph, graphHistory);

matrixFileUpload(svg, graph, graphHistory);

jsonFileDownload(graph);

matrixFileDownload(graph);

setupPngExport();
setupPdfExport();
