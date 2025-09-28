export function updateMarkerVisual(link, svg) {
  const defs = svg.select("defs").empty()
    ? svg.append("defs")
    : svg.select("defs");

  const linkId = link.getLinkId();

  //alte marker entfernen
  defs.select(`#arrowhead-${linkId}`).remove();
  defs.select(`#arrowtail-${linkId}`).remove();

  const arrowheadWidth = link.getArrowheadWidth();
  const arrowtailWidth = link.getArrowtailWidth();
  const arrowheadType = link.getArrowhead();
  const arrowtailType = link.getArrowtail();

  if (arrowheadType === "normal") {
    defs
      .append("marker")
      .attr("id", `arrowhead-${linkId}`)
      .attr(
        "viewBox",
        `0 -${arrowheadWidth / 2} ${arrowheadWidth} ${arrowheadWidth}`
      )
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", arrowheadWidth)
      .attr("markerHeight", arrowheadWidth)
      .attr("orient", "auto")
      .attr("markerUnits", "userSpaceOnUse")
      .append("path")
      .attr(
        "d",
        `M 0,-${arrowheadWidth / 2} L ${arrowheadWidth} 0 L 0,${
          arrowheadWidth / 2
        }`
      )
      .attr("fill", link.getArrowheadColor());
  }

  if (arrowtailType === "normal") {
    defs
      .append("marker")
      .attr("id", `arrowtail-${linkId}`)
      .attr(
        "viewBox",
        `0 -${arrowtailWidth / 2} ${arrowtailWidth} ${arrowtailWidth}`
      )
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", arrowtailWidth)
      .attr("markerHeight", arrowtailWidth)
      .attr("orient", "auto-start-reverse")
      .attr("markerUnits", "userSpaceOnUse")
      .append("path")
      .attr(
        "d",
        `M 0,-${arrowtailWidth / 2} L ${arrowtailWidth} 0 L 0,${
          arrowtailWidth / 2
        }`
      )
      .attr("fill", link.getArrowtailColor());
  }

  if (arrowheadType === "odot") {
    defs
      .append("marker")
      .attr("id", `arrowhead-${linkId}`)
      .attr(
        "viewBox",
        `0 -${arrowheadWidth / 2} ${arrowheadWidth} ${arrowheadWidth}`
      )
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", arrowheadWidth)
      .attr("markerHeight", arrowheadWidth)
      .attr("orient", "auto")
      .attr("markerUnits", "userSpaceOnUse")
      .append("circle")
      .attr("cx", arrowheadWidth / 2)
      .attr("cy", 0)
      //.attr("r", arrowheadWidth / 2)
      //.attr("fill", link.getArrowheadColor());
      .attr("r", (arrowheadWidth - 2) / 2)
      .attr("fill", "none")
      .attr("stroke", link.getArrowheadColor())
      .attr("stroke-width", 2);
  }

  if (arrowtailType === "odot") {
    defs
      .append("marker")
      .attr("id", `arrowtail-${linkId}`)
      .attr(
        "viewBox",
        `0 -${arrowtailWidth / 2} ${arrowtailWidth} ${arrowtailWidth}`
      )
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", arrowtailWidth)
      .attr("markerHeight", arrowtailWidth)
      .attr("orient", "auto-start-reverse")
      .attr("markerUnits", "userSpaceOnUse")
      .append("circle")
      .attr("cx", arrowtailWidth / 2)
      .attr("cy", 0)
      //.attr("r", arrowtailWidth / 2)
      //.attr("fill", link.getArrowtailColor());
      .attr("r", (arrowtailWidth - 2) / 2)
      .attr("fill", "none")
      .attr("stroke", link.getArrowtailColor())
      .attr("stroke-width", 2);
  }

  if (arrowheadType === "tail") {
    defs
      .append("marker")
      .attr("id", `arrowhead-${linkId}`)
      .attr("viewBox", "0 0 1 1")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 1)
      .attr("markerHeight", 1)
      .attr("orient", "auto")
      .attr("markerUnits", "userSpaceOnUse");
  }

  if (arrowtailType === "tail") {
    defs
      .append("marker")
      .attr("id", `arrowtail-${linkId}`)
      .attr("viewBox", "0 0 1 1")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 1)
      .attr("markerHeight", 1)
      .attr("orient", "auto-start-reverse")
      .attr("markerUnits", "userSpaceOnUse");
  }
}
