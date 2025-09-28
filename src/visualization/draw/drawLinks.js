//import { getCurrentMousePosition } from "../../presentation/utils/mousePosition.js";
//import { isGridEnabled } from "../../presentation/utils/GridManager.js";
//import { getGridSpacing } from "../../presentation/utils/GridManager.js";
import { drawMarkers } from "./drawMarkers.js";
import { computeLinkPath } from "../utils/computeLinkPath.js";
import { handleLinkDrag } from "../../presentation/interactions/drag/handleLinkDrag.js";

export function drawLinks(svg, graph, graphHistory) {
  const linkGroup = svg.select("#link-layer");

  linkGroup.selectAll(".link").remove();

  const nodes = graph.getAllNodes();

  const links = graph.getAllLinks();

  //zeichne marker (einmalig)
  drawMarkers(svg, links);

  linkGroup
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("id", (d) => `link-${d.getLinkId()}`)
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", (d) => d.getStrokeColor())
    .attr("stroke-width", (d) => d.getStrokeWidth())
    .attr("stroke-dasharray", (d) => {
      const style = d.getLinkStyle();
      switch (style) {
        case "dashed":
          return "6,4";
        case "solid":
        default: //lowkey kein fallback notwendig, da linkModel bereits validiert, einf if/else statement hier machen
          return "none"; //aber default als Fallback ist besser, falls LinkStyle fehlt, idk egal
      }
    })
    .attr("marker-start", (d) => `url(#arrowtail-${d.getLinkId()})`)
    .attr("marker-end", (d) => `url(#arrowhead-${d.getLinkId()})`)
    .attr("d", (d) => computeLinkPath(d, nodes))
    .call(handleLinkDrag(graph, graphHistory));
}
