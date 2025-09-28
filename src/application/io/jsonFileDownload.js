export function jsonFileDownload(graph) {
  document.getElementById("download-graph").addEventListener("click", () => {
    const graphData = graph.getEverything();

    const jsonStr = JSON.stringify(graphData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "graph-export.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  });
}
