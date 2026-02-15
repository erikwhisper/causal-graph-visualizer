import { convertGraphModelToMatrix } from "../conversion/convertGraphModelToMatrix.js";
import { validateGraphForMatrixExport } from "../validation/validateGraphForMatrixExport.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export function matrixFileDownload(graph) {
  const button = document.getElementById("download-matrix");

  const handler = () => {
    try {
      const graphData = graph.getEverything();
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

      ErrorHandler.info("Matrix exported successfully", "Matrix Download");
    } catch (error) {
      ErrorHandler.handle(error, "Matrix Export");
    }
  };

  button.addEventListener("click", handler);
  return () => button.removeEventListener("click", handler);
}
