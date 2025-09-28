import "@fortawesome/fontawesome-free/css/all.min.css";

import { addMouseMoveListener } from "./presentation/utils/mousePosition.js";
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

addMouseMoveListener(svg);

//wird für jeden neuen knoten und kante wieder aufgerufen
registerClickHandlers(svg, graph, graphHistory);

//das wird einmalig aufgerufen und festgelegt
registerMarqueeNodeSelection(svg, graph, graphHistory);

//das wird einmalig aufgerufen und festgelegt
registerMarqueeLinkSelection(svg, graph, graphHistory);

//das wird einmalig aufgerufen und festgelegt
registerKeydownHandlers(svg, graph, graphHistory);

//das wird einmalig aufgerufen und festgelegt
registerToolbarButtons(svg, graph, graphHistory);

//-----Hier nach ist erstmal irrelevant, das wird sich bestimmt noch paar mal ändern:

//not yet validated (just minor things to validate, due to standartwerte)
jsonFileUpload(svg, graph, graphHistory);

//validated
matrixFileUpload(svg, graph, graphHistory);

//not yet validated (nothing to validate rlly tho)
jsonFileDownload(graph);

//validated
matrixFileDownload(graph);

//for export, is it necessary to call it here?
setupPngExport();
setupPdfExport();
