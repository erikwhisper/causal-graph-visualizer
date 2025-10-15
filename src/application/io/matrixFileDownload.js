import { convertGraphModelToMatrix } from "../conversion/convertGraphModelToMatrix.js";
import { validateGraphForMatrixExport } from "../validation/validateGraphForMatrixExport.js";

export function matrixFileDownload(graph) {
  document.getElementById("download-matrix").addEventListener("click", () => {
    const graphData = graph.getEverything();

    try {
      validateGraphForMatrixExport(graphData);

      const matrixCsv = convertGraphModelToMatrix(graphData);

      const blob = new Blob([matrixCsv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "graph-export.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Export fehlgeschlagen:\n${err.message}`);
    }
  });
}
