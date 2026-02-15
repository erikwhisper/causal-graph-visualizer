import { ErrorHandler } from "../../utils/ErrorHandler.js";
import { redrawGraph } from "../../visualization/redrawGraph.js";

export function jsonFileUpload(svg, graph, graphHistory) {
  const fileInput = document.getElementById("graph-file");
  if (!fileInput) {
    ErrorHandler.warn(
      "Graph file input element not found",
      "JSON Upload Setup"
    );
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

      redrawGraph(svg, graph, graphHistory);

      ErrorHandler.info(
        `Loaded ${nodes.length} nodes and ${links.length} links`,
        "JSON Upload"
      );
    } catch (error) {
      ErrorHandler.handle(error, "JSON File Upload");
    } finally {
      event.target.value = "";
    }
  };

  fileInput.addEventListener("change", handler);
  return () => fileInput.removeEventListener("change", handler);
}
