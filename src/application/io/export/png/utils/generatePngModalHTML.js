export function generatePngModalHTML() {
  return `
    <div class="modal-content">
      <button id="png-close" class="modal-close">
        <i class="fa fa-times"></i>
      </button>
      <h3>PNG Export Options</h3>
      <label class="option">
        <i class="fa fa-square"></i>
        <span>Transparent Background</span>
        <input type="checkbox" id="png-transparent" />
      </label>
      <label class="option scale-option">
        <i class="fa fa-expand-arrows-alt"></i>
        <span>Scale</span>
      </label>
      <div class="scale-control">
        <input type="range" id="png-scale" min="1" max="20" step="1" value="10" />
        <span id="png-dimensions"></span>
      </div>
      <div class="modal-actions">
        <button id="png-confirm" class="btn-export">
          <i class="fa fa-image"></i> Export
        </button>
      </div>
    </div>
  `;
}
