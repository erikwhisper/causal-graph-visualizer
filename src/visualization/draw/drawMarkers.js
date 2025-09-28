//Wenn ich hier "tail" hinzugefügt hab wird der kack genau wie drawLinks erstmal refactored
//das geht bestimmt ordentlicher und ohne die ganzen if/else-fehlerbehandlung wenn nicht
//vorhanden, digga es ist immer alles vorhanden, im GraphModel werden immer dummy-Werte
//gesetzt falls ein Wert nicht übergeben wurde.

export function drawMarkers(svg, links) {
  const defs = svg.select("defs").empty()
    ? svg.append("defs")
    : svg.select("defs");

  //entferne alle alten Marker vor dem neu zeichnen
  svg.select("defs").selectAll("marker").remove();

  links.forEach((link) => {
    const linkId = link.getLinkId();
    const arrowheadWidth = link.getArrowheadWidth();
    const arrowtailWidth = link.getArrowtailWidth();
    const arrowheadType = link.getArrowhead();
    const arrowtailType = link.getArrowtail();

    //Arrowhead: normal
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

    //Arrowtail: normal
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

    //Arrowhead: odot
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

    //arrowtail: doto
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

    //arrowhead: tail
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

    //arrowtail: tail
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
      //unsichtbar, aber vorhanden tail und head.
    }
  });
}
