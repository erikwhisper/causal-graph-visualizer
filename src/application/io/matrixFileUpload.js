import { convertMatrixToGraphModel } from "../conversion/convertMatrixToGraphModel.js";
import { validateMatrixForMatrixImport } from "../validation/validateMatrixForMatrixImport.js";
import { layoutHierarchical } from "../layout/layoutHierarchical.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import { redrawGraph } from "../../visualization/redrawGraph.js";

export function matrixFileUpload(svg, graph, graphHistory, gridManager) {
  const fileInput = document.getElementById("pag-matrix-file");
  if (!fileInput) {
    ErrorHandler.warn(
      "Matrix file input element not found",
      "Matrix Upload Setup"
    );
    return;
  }

  const handler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      validateMatrixForMatrixImport(text);

      const { nodes, links } = convertMatrixToGraphModel(text);

      if (!Array.isArray(nodes) || !Array.isArray(links)) {
        throw new Error("Conversion failed: Invalid graph structure");
      }

      const width = +svg.attr("width");
      const height = +svg.attr("height");
      layoutHierarchical(nodes, links, width, height, gridManager);

      graph.deleteEverything();
      nodes.forEach((node) => graph.addNode(node));
      links.forEach((link) => graph.addLink(link));

      redrawGraph(svg, graph, graphHistory, gridManager);

      ErrorHandler.info(
        `Imported ${nodes.length} nodes and ${links.length} links from matrix`,
        "Matrix Upload"
      );
    } catch (error) {
      ErrorHandler.handle(error, "Matrix File Import");
    } finally {
      event.target.value = "";
    }
  };

  fileInput.addEventListener("change", handler);
  return () => fileInput.removeEventListener("change", handler);
}
