import { showPngExportModal } from "./utils/showPngExportModal";

export function setupPngExport(buttonId = "download-png") {
  const downloadBtn = document.getElementById(buttonId);
  downloadBtn?.addEventListener("click", () => {
    showPngExportModal();
  });
}
