import { convertMatrixToGraphModel } from "../conversion/convertMatrixToGraphModel.js";
import { drawNodes } from "../../visualization/draw/drawNodes.js";
import { drawLinks } from "../../visualization/draw/drawLinks.js";
import { drawLabels } from "../../visualization/draw/drawLabels.js";
import { validateMatrixForMatrixImport } from "../validation/validateMatrixForMatrixImport.js";
import { layoutHierarchical } from "../layout/layoutHierarchical.js";
import { renderInfoPanel } from "../../presentation/ui/renderInfoPanel.js";

export function matrixFileUpload(svg, graph, graphHistory) {
  const fileInput = document.getElementById("pag-matrix-file");

  if (!fileInput) {
    console.warn("Matrix file input element not found");
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
      layoutHierarchical(nodes, links, width, height);

      graph.deleteEverything();
      nodes.forEach((node) => graph.addNode(node));
      links.forEach((link) => graph.addLink(link));

      drawNodes(svg, graph, graphHistory);
      drawLabels(svg, graph);
      drawLinks(svg, graph, graphHistory);
      renderInfoPanel(graph);

      graphHistory.setNewState(graph.getEverything());
    } catch (error) {
      console.error("Matrix import error:", error);
      alert(`Import failed:\n${error.message}`);
    } finally {
      event.target.value = "";
    }
  };

  fileInput.addEventListener("change", handler);
  return () => fileInput.removeEventListener("change", handler);
}
