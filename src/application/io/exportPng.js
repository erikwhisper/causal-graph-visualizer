export function setupPngExport(buttonId = "download-png") {
  const downloadBtn = document.getElementById(buttonId);

  downloadBtn?.addEventListener("click", () => {
    showPngExportModal(({ transparent, scale }) => {
      performPngExport(transparent, scale);
    });
  });
}

function showPngExportModal(onConfirm) {
  const modal = document.createElement("div");
  modal.id = "png-export-modal";
  modal.classList.add("modal");

  modal.innerHTML = `
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

  document.body.appendChild(modal);

  const scaleInput = modal.querySelector("#png-scale");
  const dimLabel = modal.querySelector("#png-dimensions");
  const svg = document.querySelector("#graph-container svg");

  const updateDimensions = () => {
    const scale = parseInt(scaleInput.value, 10);
    const w = parseInt(svg?.getAttribute("width")) || 800;
    const h = parseInt(svg?.getAttribute("height")) || 600;
    dimLabel.textContent = `${w * scale} px × ${h * scale} px`;
  };

  scaleInput.addEventListener("input", updateDimensions);
  updateDimensions();

  modal.querySelector("#png-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#png-confirm").addEventListener("click", () => {
    const transparent = modal.querySelector("#png-transparent").checked;
    const scale = parseInt(scaleInput.value, 10) || 2;
    onConfirm({ transparent, scale });
    modal.remove();
  });
}

function performPngExport(transparent, scale = 2) {
  const svg = document.querySelector("#graph-container svg");

  if (!svg) {
    alert("Kein SVG zum Exportieren gefunden.");
    return;
  }

  const svgString = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  image.onload = () => {
    const originalWidth = parseInt(svg.getAttribute("width")) || 800;
    const originalHeight = parseInt(svg.getAttribute("height")) || 600;

    const canvas = document.createElement("canvas");
    canvas.width = originalWidth * scale;
    canvas.height = originalHeight * scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    if (!transparent) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(image, 0, 0);

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "graph.png";
    link.href = pngUrl;
    link.click();

    URL.revokeObjectURL(url);
  };

  image.onerror = () => {
    alert("Fehler beim Laden des SVGs.");
  };

  image.src = url;
}
