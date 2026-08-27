import { drawMarkers } from "./drawMarkers.js";
import { computeLinkPath } from "../utils/computeLinkPath.js";
import { handleLinkDrag } from "../../presentation/interactions/drag/handleLinkDrag.js";
import { LINK_DASH_ARRAY, LINK_HIT_AREA_PADDING } from "../../utils/visualConstants.js";

export function drawLinks(svg, graph, graphHistory, gridManager) {
  const linkGroup = svg.select("#link-layer");

  linkGroup.selectAll(".link").remove();

  const nodes = graph.getAllNodes();
  const links = graph.getAllLinks();

  //draw marker (once)
  drawMarkers(svg, links);

  linkGroup
    .selectAll(".link-visible")
    .data(links)
    .enter()
    .append("path")
    .attr("id", (d) => `link-${d.getLinkId()}`)
    .attr("class", "link link-visible")
    .attr("fill", "none")
    .attr("stroke", (d) => d.getStrokeColor())
    .attr("stroke-width", (d) => d.getStrokeWidth())
    .attr("stroke-dasharray", (d) => {
      const style = d.getLinkStyle();
      switch (style) {
        case "dashed":
          return LINK_DASH_ARRAY;
        case "solid":
        default:
          return "none";
      }
    })
    .attr("marker-start", (d) => `url(#arrowtail-${d.getLinkId()})`)
    .attr("marker-end", (d) => `url(#arrowhead-${d.getLinkId()})`)
    .attr("pointer-events", "none")
    .attr("d", (d) => computeLinkPath(d, nodes));

  linkGroup
    .selectAll(".link-hit")
    .data(links)
    .enter()
    .append("path")
    .attr("id", (d) => `link-hit-${d.getLinkId()}`)
    .attr("class", "link link-hit")
    .attr("fill", "none")
    .attr("stroke", "transparent")
    .attr("stroke-width", (d) => d.getStrokeWidth() + LINK_HIT_AREA_PADDING)
    .attr("pointer-events", "stroke")
    .attr("d", (d) => computeLinkPath(d, nodes))
    .call(handleLinkDrag(svg, graph, graphHistory, gridManager));
}
