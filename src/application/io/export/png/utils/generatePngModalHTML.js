export function generatePngModalHTML() {
  return `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="png-modal-title">
      <button id="png-close" class="modal-close" aria-label="Close">
        <i class="fa fa-times"></i>
      </button>
      <h3 id="png-modal-title">Export as PNG</h3>

      <label class="option">
        <span class="option-text">
          <span class="option-title">Transparent background</span>
          <span class="option-hint">Export without the white page background</span>
        </span>
        <input type="checkbox" id="png-transparent" />
      </label>

      <div class="option option--stacked">
        <div class="option-head">
          <label for="png-scale" class="option-title">Scale</label>
          <span id="png-dimensions"></span>
        </div>
        <input type="range" id="png-scale" min="1" max="20" step="1" value="10" />
      </div>

      <div class="modal-actions">
        <button id="png-confirm" class="btn-export btn-primary">
          <i class="fa fa-image"></i> Export
        </button>
      </div>
    </div>
  `;
}
