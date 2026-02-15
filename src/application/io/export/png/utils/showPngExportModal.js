import { performPngExport } from "./performPngExport.js";
import { generatePngModalHTML } from "./generatePngModalHTML.js";

export function showPngExportModal() {
  const modal = document.createElement("div");
  modal.id = "png-export-modal";
  modal.classList.add("modal");
  modal.innerHTML = generatePngModalHTML(); // ← Ausgelagert!

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
    performPngExport(transparent, scale);
    modal.remove();
  });
}
