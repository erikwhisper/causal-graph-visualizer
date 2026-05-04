export function handleCanvasResize(svg) {
  const container = document.querySelector("#graph-container");
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  svg.attr("width", width).attr("height", height);

  const gridFine = svg.select(".grid-fine");
  if (!gridFine.empty()) {
    gridFine.attr("width", width).attr("height", height);
  }
  const gridCoarse = svg.select(".grid-coarse");
  if (!gridCoarse.empty()) {
    gridCoarse.attr("width", width).attr("height", height);
  }
}
