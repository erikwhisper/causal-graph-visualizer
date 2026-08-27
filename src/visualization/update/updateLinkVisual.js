import { computeLinkPath } from "../utils/computeLinkPath.js";
import { updateMarkerVisual } from "./updateMarkerVisual.js";
import {
  LINK_DASH_ARRAY,
  LINK_HIT_AREA_PADDING,
} from "../../utils/visualConstants.js";

export function updateLinkVisual(link, svg, graph) {
  const path = svg.select(`#link-${link.getLinkId()}`);
  if (path.empty()) return;

  updateMarkerVisual(link, svg);

  const nodes = graph.getAllNodes();
  const d = computeLinkPath(link, nodes);

  path
    .attr("stroke", link.getStrokeColor())
    .attr("stroke-width", link.getStrokeWidth())
    .attr(
      "stroke-dasharray",
      link.getLinkStyle() === "dashed" ? LINK_DASH_ARRAY : "none",
    )
    .attr("marker-start", `url(#arrowtail-${link.getLinkId()})`)
    .attr("marker-end", `url(#arrowhead-${link.getLinkId()})`)
    .attr("d", d);

  svg
    .select(`#link-hit-${link.getLinkId()}`)
    .attr("d", d)
    .attr("stroke-width", link.getStrokeWidth() + LINK_HIT_AREA_PADDING);
}
