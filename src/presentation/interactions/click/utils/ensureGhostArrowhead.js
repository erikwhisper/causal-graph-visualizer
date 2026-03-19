import { createMarker } from "../../../../visualization/utils/createMarker.js";

export function ensureGhostArrowhead(svg) {
  const defs = svg.select("defs");
  if (defs.select("#ghost-arrowhead").empty()) {
    createMarker(defs, {
      id: "ghost-arrowhead",
      type: "normal",
      width: 10,
      color: "gray",
      orientation: "auto",
    });
  }
}
