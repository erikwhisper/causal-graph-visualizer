import { escapeHtml } from "../../utils/escapeHtml.js";

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
      <span>Nodes: ${escapeHtml(nodeCount)}</span>
    </div>

    <div class="info-row">
      <i class="fas fa-long-arrow-alt-right"></i>
      <span>Edges: ${escapeHtml(linkCount)}</span>
    </div>
  `;
}
