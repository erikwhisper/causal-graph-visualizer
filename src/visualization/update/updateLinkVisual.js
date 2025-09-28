import { computeLinkPath } from "../utils/computeLinkPath.js";
import { updateMarkerVisual } from "./updateMarkerVisual.js";

export function updateLinkVisual(link, svg, graph) {
  const path = svg.select(`#link-${link.getLinkId()}`);
  if (path.empty()) return;

  updateMarkerVisual(link, svg);

  const nodes = graph.getAllNodes();

  path
    .attr("stroke", link.getStrokeColor())
    .attr("stroke-width", link.getStrokeWidth())
    .attr("stroke-dasharray", link.getLinkStyle() === "dashed" ? "6,4" : "none")
    .attr("marker-start", `url(#arrowtail-${link.getLinkId()})`)
    .attr("marker-end", `url(#arrowhead-${link.getLinkId()})`)
    .attr("d", computeLinkPath(link, nodes));
}
