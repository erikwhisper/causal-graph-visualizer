import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ErrorHandler } from "../../../../utils/ErrorHandler";

export function setupPdfExport(buttonId = "download-pdf") {
  const downloadPdfBtn = document.getElementById(buttonId);

  downloadPdfBtn?.addEventListener("click", async () => {
    const container = document.querySelector("#graph-container");

    if (!container) {
      ErrorHandler.handle(new Error("SVG container not found"), "PDF Export", {
        customMessage: "Cannot find graph to export. Please try again.",
      });
      return;
    }

    try {
      const canvas = await html2canvas(container, {
        scale: 4,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      const yOffset = Math.max((pageHeight - imgHeight) / 2, 10);

      pdf.addImage(imgData, "JPEG", 0, yOffset, imgWidth, imgHeight);
      pdf.save("graph.pdf");

      ErrorHandler.info("PDF exported successfully", "PDF Export");
    } catch (error) {
      ErrorHandler.handle(error, "PDF Export", {
        customMessage: "Failed to generate PDF. Please try again.",
      });
    }
  });
}
