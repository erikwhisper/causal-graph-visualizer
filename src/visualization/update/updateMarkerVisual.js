import { createMarker } from "../utils/createMarker";

export function updateMarkerVisual(link, svg) {
  const defs = svg.select("defs").empty()
    ? svg.append("defs")
    : svg.select("defs");

  const linkId = link.getLinkId();

  //alten marker entfernen
  defs.select(`#arrowhead-${linkId}`).remove();
  defs.select(`#arrowtail-${linkId}`).remove();

  //neuen marker erstellen
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
}
