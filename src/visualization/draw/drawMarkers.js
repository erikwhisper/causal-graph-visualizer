import { createMarker } from "../utils/createMarker";

export function drawMarkers(svg, links) {
  const defs = svg.select("defs").empty()
    ? svg.append("defs")
    : svg.select("defs");

  svg.select("defs").selectAll("marker").remove();

  links.forEach((link) => {
    const linkId = link.getLinkId();

    createMarker(defs, {
      id: `arrowhead-${linkId}`,
      type: link.getArrowhead(),
      width: link.getArrowheadWidth(),
      color: link.getArrowheadColor(),
      orientation: "auto",
    });

    createMarker(defs, {
      id: `arrowtail-${linkId}`,
      type: link.getArrowtail(),
      width: link.getArrowtailWidth(),
      color: link.getArrowtailColor(),
      orientation: "auto-start-reverse",
    });
  });
}
