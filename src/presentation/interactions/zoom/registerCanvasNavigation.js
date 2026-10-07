import * as d3 from "d3";
import { updateGridViewport } from "../../../visualization/update/updateGridViewport.js";


const zoom = d3
    .zoom()
    .on("zoom", function (event) {
        const svg = d3.select(this);

        svg.select("#viewport").attr("transform", event.transform);
        updateGridViewport(svg, event.transform);
    });

export function registerCanvasNavigation(svg) {
    svg.call(zoom);
    svg.on("dblclick.zoom", null);
}

export function resetCanvasNavigation(svg) {
  if (zoom) {
    svg.call(zoom.transform, d3.zoomIdentity);
  }
}