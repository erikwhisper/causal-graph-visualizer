import { ErrorHandler } from "../../../../../utils/ErrorHandler";

export function performPngExport(transparent, scale = 2) {
  const svg = document.querySelector("#graph-container svg");

  if (!svg) {
    ErrorHandler.handle(new Error("No SVG found for export"), "PNG Export", {
      customMessage: "Cannot find graph to export. Please try again.",
    });
    return;
  }

  try {
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();

    image.onload = () => {
      try {
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

        ErrorHandler.info(
          `PNG exported: ${canvas.width}×${canvas.height}px`,
          "PNG Export"
        );
      } catch (error) {
        ErrorHandler.handle(error, "PNG Canvas Rendering", {
          customMessage: "Failed to create PNG image. Please try again.",
        });
      }
    };

    image.onerror = () => {
      ErrorHandler.handle(new Error("Failed to load SVG image"), "PNG Export", {
        customMessage: "Failed to convert graph to image. Please try again.",
      });
      URL.revokeObjectURL(url);
    };

    image.src = url;
  } catch (error) {
    ErrorHandler.handle(error, "PNG Export", {
      customMessage: "Failed to export PNG. Please try again.",
    });
  }
}
