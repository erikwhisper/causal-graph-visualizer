import { convertMatrixToGraphModel } from "../utils/convertMatrixToGraphModel.js";
import { drawNodes } from "../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../visualization/draw/drawLabels.js";
import { registerClickHandlers } from "../../presentation/interactions/click/registerClickHandlers.js";
import { validateMatrixForMatrixImport } from "../validation/validateMatrixForMatrixImport.js";

import { layoutHierarchical } from "../../visualization/utils/layoutHierarchical.js";
import { renderInfoPanel } from "../../presentation/ui/renderInfoPanel.js";

export function matrixFileUpload(svg, graph, graphHistory) {
  document
    .getElementById("pag-matrix-file")
    .addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();

        validateMatrixForMatrixImport(text);

        const { nodes, links } = convertMatrixToGraphModel(text);

        if (!Array.isArray(nodes) || !Array.isArray(links)) {
          throw new Error(
            "Die Datei enthält kein gültiges GraphModel mit 'nodes' und 'links'."
          );
        }

        //width und height von svg canvas, anpassen wenn dynamisch auch hier
        const width = svg.attr("width");
        const height = svg.attr("height");

        layoutHierarchical(nodes, links, width, height);

        graph.deleteEverything();
        nodes.forEach((node) => graph.addNode(node));
        links.forEach((link) => graph.addLink(link));

        drawNodes(svg, graph, graphHistory);
        drawLabels(svg, graph);
        drawLinks(svg, graph, graphHistory);
        renderInfoPanel(graph);

        registerClickHandlers(svg, graph, graphHistory);

        graphHistory.setNewState(graph.getEverything());
      } catch (err) {
        alert(`Import fehlgeschlagen:\n${err.message}`);
      }
    });
}
