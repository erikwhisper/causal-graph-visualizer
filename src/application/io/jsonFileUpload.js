import { drawNodes } from "../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../visualization/draw/drawLabels.js";
import { renderInfoPanel } from "../../presentation/ui/renderInfoPanel.js";

export function jsonFileUpload(svg, graph, graphHistory) {
  const fileInput = document.getElementById("graph-file");

  if (!fileInput) {
    console.warn("Graph file input element not found");
    return;
  }

  const handler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data || typeof data !== "object") {
        throw new Error("Invalid file format: Expected JSON object");
      }

      const { nodes, links } = data;

      if (!Array.isArray(nodes) || !Array.isArray(links)) {
        throw new Error(
          "Invalid graph format: 'nodes' and 'links' must be arrays"
        );
      }

      graph.deleteEverything();

      nodes.forEach((node) => graph.addNode(node));
      links.forEach((link) => graph.addLink(link));

      /*
      nodes.forEach((nodeData) => {
        try {
          graph.addNode(nodeData);
        } catch (err) {
          console.warn("Skipping invalid node:", nodeData, err);
        }
      });

      links.forEach((linkData) => {
        try {
          graph.addLink(linkData);
        } catch (err) {
          console.warn("Skipping invalid link:", linkData, err);
        }
      });
      */

      drawNodes(svg, graph, graphHistory);
      drawLabels(svg, graph);
      drawLinks(svg, graph, graphHistory);
      renderInfoPanel(graph);

      graphHistory.setNewState(graph.getEverything());

      console.log(`Loaded ${nodes.length} nodes and ${links.length} links`);
      console.log(graph);
    } catch (error) {
      console.error("Error loading graph file:", error);
      alert(`Error loading file: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  };

  fileInput.addEventListener("change", handler);

  return () => fileInput.removeEventListener("change", handler);
}

/*
import { drawNodes } from "../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../visualization/draw/drawLabels.js";
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

        graphHistory.setNewState(graph.getEverything());
      } catch (error) {
        console.error("Fehler beim Laden des Graphen:", error);
        alert("Fehler beim Laden der Datei: " + error.message);
      }
    });
}
*/
