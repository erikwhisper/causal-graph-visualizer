export function handleCanvasResize(svg) {
  const container = document.querySelector("#graph-container");
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  svg.attr("width", width).attr("height", height);
}
