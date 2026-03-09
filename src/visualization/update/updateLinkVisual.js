import { computeLinkPath } from "../utils/computeLinkPath.js";
import { updateMarkerVisual } from "./updateMarkerVisual.js";
import { LINK_DASH_ARRAY } from "../../utils/visualConstants.js";

export function updateLinkVisual(link, svg, graph) {
  const path = svg.select(`#link-${link.getLinkId()}`);
  if (path.empty()) return;

  updateMarkerVisual(link, svg);

  const nodes = graph.getAllNodes();

  path
    .attr("stroke", link.getStrokeColor())
    .attr("stroke-width", link.getStrokeWidth())
    .attr(
      "stroke-dasharray",
      link.getLinkStyle() === "dashed" ? LINK_DASH_ARRAY : "none"
    )
    .attr("marker-start", `url(#arrowtail-${link.getLinkId()})`)
    .attr("marker-end", `url(#arrowhead-${link.getLinkId()})`)
    .attr("d", computeLinkPath(link, nodes));
}
