//Das würde ich gerne auch noch, falls möglich und vorallem nur falls sinvoll
//in Hilfsfunktionen unterteilen, wieder basierend auf meinen 3 Kategorien:
//(1.)Auswahl-Funktionen
//(2.)Zustands-Aenderungs-Funktionen
//(3.)Visualisierungs-Funktionen

import * as d3 from "d3";
import { computeLinkPath } from "../../../visualization/utils/computeLinkPath.js";
import { isGridEnabled, getGridSpacing } from "../../utils/GridManager.js";

export function handleLinkDrag(graph, graphHistory) {
  const nodes = graph.getAllNodes();

  return d3
    .drag()
    .on("start", function (event, d) {
      d.wasDragged = false; //reset bei start
    })
    .on("drag", function (event, d) {
      d.wasDragged = true;
      const mouseX = event.x;
      const mouseY = event.y;

      d.setLinkCurvature(mouseX, mouseY);

      d3.select(this).attr("d", computeLinkPath(d, nodes));
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;

      if (isGridEnabled()) {
        const spacing = getGridSpacing() / 2;
        const snappedX = Math.round(event.x / spacing) * spacing;
        const snappedY = Math.round(event.y / spacing) * spacing;

        d.setLinkCurvature(snappedX, snappedY);

        d3.select(this).attr("d", computeLinkPath(d, nodes));
      }

      graphHistory.setNewState(graph.getEverything());
    });
}
