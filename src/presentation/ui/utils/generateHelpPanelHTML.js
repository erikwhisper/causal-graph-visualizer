import { isMac, keyLabel } from "../../utils/platform.js";
import {
  SHORTCUT_GROUPS,
  SHORTCUTS,
  getCombos,
} from "../../utils/shortcuts.js";

const SHOW_IMPRESSUM = import.meta.env.VITE_SHOW_IMPRESSUM === "true";

const GESTURES = new Set(["Click", "Drag", "Scroll", "Pinch"]);

function renderCombo(tokens) {
  const parts = tokens.map((token) =>
    GESTURES.has(token)
      ? `<span class="gesture">${token}</span>`
      : `<kbd>${keyLabel(token)}</kbd>`,
  );
  return `<span class="combo">${parts.join(isMac ? "" : '<span class="plus">+</span>')}</span>`;
}

function comboOf(id) {
  return renderCombo(getCombos(SHORTCUTS.find((s) => s.id === id))[0]);
}

function renderShortcutGroups() {
  return SHORTCUT_GROUPS.map((group) => {
    const rows = SHORTCUTS.filter((s) => s.group === group.id)
      .map(
        (s) => `
        <li class="shortcut-row">
          <span class="shortcut-action">
            ${s.action}
            ${s.hint ? `<span class="shortcut-hint">${s.hint}</span>` : ""}
          </span>
          <span class="shortcut-keys">
            ${getCombos(s).map(renderCombo).join('<span class="or">or</span>')}
          </span>
        </li>`,
      )
      .join("");

    return `
      <h4 class="help-group-title">${group.title}</h4>
      <ul class="shortcut-list">${rows}</ul>`;
  }).join("");
}

export function generateHelpPanelHTML() {
  const impressumHTML = SHOW_IMPRESSUM
    ? `
      <div class="impressum">
        <div class="panel-section-header">
          <i class="fas fa-info-circle"></i>
          <span>Impressum</span>
        </div>
        <p>
            <a href="https://www.medizin.uni-muenster.de/imi/impressum.html" rel="noopener noreferrer" target="_blank"> Disclosure</a><br>
            <a href="https://www.medizin.uni-muenster.de/fakultaet/datenschutz.html" rel="noopener noreferrer" target="_blank"> Privacy Statement</a>
        </p>
      </div>`
    : "";

  return `
    <div class="help-panel-header">
      <h2>Help</h2>
      <button id="help-close-btn" aria-label="Close Help">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="help-panel-content">

      <div class="panel-section-header">
        <i class="fas fa-rocket"></i>
        <span>Quick start</span>
      </div>
      <ol class="help-steps">
        <li>
          <span class="help-step-title">Load or create a graph</span>
          <span class="help-step-text">
            Use <strong>Import</strong> to open a <code>.json</code> graph or a
            <code>.csv</code> matrix, or press ${comboOf("add-node")} to place a node at the cursor.
          </span>
        </li>
        <li>
          <span class="help-step-title">Edit</span>
          <span class="help-step-text">
            Click a node or edge to select it and style it in the panel.
            Drag nodes to move them, drag an edge to bend it.
          </span>
        </li>
        <li>
          <span class="help-step-title">Export</span>
          <span class="help-step-text">
            Use <strong>Export</strong> for PNG or PDF and <strong>Save</strong> for a <code>.json</code> graph or a <code>.csv</code> matrix.
          </span>
        </li>
      </ol>

      <div class="panel-section-header">
        <i class="fas fa-keyboard"></i>
        <span>Shortcuts</span>
      </div>
      ${renderShortcutGroups()}

      <details class="help-details">
        <summary class="panel-section-header">
          <i class="fas fa-file-lines"></i>
          <span>File formats</span>
          <i class="fas fa-chevron-down chevron"></i>
        </summary>
        <div class="help-details-body">
          <p>
            <strong>Graph (<code>.json</code>)</strong><br>
            Nodes and edges including positions and styles. Positions are kept exactly as saved.
          </p>
          <p>
            <strong>Matrix (<code>.csv</code>)</strong><br>
            Square adjacency matrix with the node labels in the first row and column.
            Cell values: <code>0</code> none, <code>1</code> circle, <code>2</code> arrow,
            <code>3</code> tail, <code>4</code>&ndash;<code>5</code> ADMG combinations.
            The layout is arranged automatically on import and snapped to the grid.
          </p>
        </div>
      </details>

      <div class="panel-section-header">
        <i class="fas fa-circle-info"></i>
        <span>About</span>
      </div>
      <p class="help-about">
        File format details and the full changelog are in the
        <a href="https://github.com/erikwhisper/causal-graph-visualizer" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
      </p>
      ${impressumHTML}
    </div>
  `;
}
