import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function setupPdfExport(buttonId = "download-pdf") {
  const downloadPdfBtn = document.getElementById(buttonId);

  downloadPdfBtn?.addEventListener("click", async () => {
    const container = document.querySelector("#graph-container");

    if (!container) {
      alert("Kein SVG-Container gefunden.");
      return;
    }

    try {
      const canvas = await html2canvas(container, {
        scale: 4,
        backgroundColor: "#ffffff", //möglicherweise entfernen oder den nutzer auswählen lassen
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
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Fehler beim PDF-Export.");
    }
  });
}
