import { drawNodes } from "../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../visualization/draw/drawLabels.js";
import { registerClickHandlers } from "../../presentation/interactions/click/registerClickHandlers.js";
import { renderInfoPanel } from "../../presentation/ui/renderInfoPanel.js";

export function jsonFileUpload(svg, graph, graphHistory) {
  document
    .getElementById("graph-file")
    .addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        const { nodes, links } = data;

        if (!Array.isArray(nodes) || !Array.isArray(links)) {
          throw new Error(
            "Die Datei enthält kein gültiges GraphModel mit 'nodes' und 'links'."
          );
        }

        graph.deleteEverything();

        nodes.forEach((node) => graph.addNode(node));
        links.forEach((link) => graph.addLink(link));

        drawNodes(svg, graph, graphHistory);
        drawLabels(svg, graph);
        drawLinks(svg, graph, graphHistory);
        renderInfoPanel(graph);

        registerClickHandlers(svg, graph, graphHistory);

        graphHistory.setNewState(graph.getEverything());
      } catch (error) {
        console.error("Fehler beim Laden des Graphen:", error);
        alert("Fehler beim Laden der Datei: " + error.message);
      }
    });
}
