const SHOW_IMPRESSUM = import.meta.env.VITE_SHOW_IMPRESSUM === 'true'

export function generateHelpPanelHTML() {
  const impressumHTML = SHOW_IMPRESSUM ? `
      <div class="impressum">
        <div class="panel-section-header">
          <i class="fas fa-info-circle"></i>
          <span>Impressum</span>
        </div>
        <p>
            <a href="https://www.medizin.uni-muenster.de/imi/impressum.html " rel="noopener noreferrer" target="_blank"> Disclosure</a><br>
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
        <i class="fas fa-circle"></i>
        <span>Creating Nodes</span>
      </div>
      <ol>
        <li>Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>N</kbd></li>
        <li>Enter a name in the popup</li>
      </ol>
      <p>A new node is added to the canvas.</p>

      <div class="panel-section-header">
        <i class="fas fa-project-diagram"></i>
        <span>Creating Edges</span>
      </div>
      <ol>
        <li>Hold <kbd>Ctrl</kbd> + <kbd>Alt</kbd></li>
        <li>Click the source node</li>
        <li>Click the target node</li>
      </ol>
      <p>A directed edge is created from the first to the second node you click.</p>

      <div class="panel-section-header">
        <i class="fas fa-keyboard"></i>
        <span>Keyboard Shortcuts</span>
      </div>
      <table class="help-shortcut-table">
        <tbody>
          <tr><td>Undo</td><td><kbd>Ctrl</kbd>+<kbd>Z</kbd></td></tr>
          <tr><td>Redo</td><td><kbd>Ctrl</kbd>+<kbd>Y</kbd></td></tr>
          <tr><td>Delete Selection</td><td><kbd>Delete</kbd></td></tr>
          <tr><td>Select All Nodes</td><td><kbd>Ctrl</kbd>+<kbd>A</kbd></td></tr>
          <tr><td>Select All Edges</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd></td></tr>
          <tr><td>Multi-select Nodes</td><td><kbd>Ctrl</kbd>+Click / <kbd>Ctrl</kbd>+Drag</td></tr>
          <tr><td>Multi-select Edges</td><td><kbd>Ctrl</kbd>+Click / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+Drag</td></tr>
          <tr><td>Toggle Grid &amp; Snapping</td><td><kbd>G</kbd></td></tr>
          <tr><td>Fit to Screen</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd></td></tr>
        </tbody>
      </table>

      <p>
        More details, file formats, and the full changelog are in the
        <a href="https://github.com/erikwhisper/causal-graph-visualizer" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
      ${impressumHTML}
    </div>
  `;
}