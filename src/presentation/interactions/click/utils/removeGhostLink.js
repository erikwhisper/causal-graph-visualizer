export function removeGhostLink(svg) {
  svg.select("#ghost-link").remove();
  svg.on("mousemove.ghost", null);
}
