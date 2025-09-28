//RENDER_INFO_PANEL: ganze funktion ist experimentell

//For it to work i need to call it everytime i add or remove a node/link and when i redo/undo or upload a file
//its fine ig whatever.
export function renderInfoPanel(graph) {
  const panel = document.getElementById("property-panel");
  if (!panel) return;

  const nodeCount = graph.getAllNodes().length;
  const linkCount = graph.getAllLinks().length;

  panel.innerHTML = `
    <h2>Information</h2>

    <div class="panel-section-header">
      <i class="fas fa-info-circle"></i>
      <span>Overview</span>
    </div>

    <div class="info-row">
      <i class="fas fa-circle"></i>
      <span>Nodes: ${nodeCount}</span>
    </div>

    <div class="info-row">
      <i class="fas fa-long-arrow-alt-right"></i>
      <span>Edges: ${linkCount}</span>
    </div>
  `;
}
