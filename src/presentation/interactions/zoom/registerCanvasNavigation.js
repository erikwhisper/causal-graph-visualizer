import * as d3 from "d3";
import Coloris from "@melloware/coloris";
import { updateGridViewport } from "../../../visualization/update/updateGridViewport.js";
import { isPrimaryModifier } from "../../utils/platform.js";


export function canvasZoomFilter(event) {
  if (event.type === "wheel") return !event.button;
  return !isPrimaryModifier(event) && !event.button;
}

const zoom = d3
  .zoom()
  .filter(canvasZoomFilter)
  .on("zoom", function (event) {
    const svg = d3.select(this);

    svg.select("#viewport").attr("transform", event.transform);
    updateGridViewport(svg, event.transform);
  });

export function registerCanvasNavigation(svg) {
  const svgEl = svg.node();

  const closeColorPicker = () => Coloris.close();
  svgEl.addEventListener("mousedown", closeColorPicker, true);

  svg.call(zoom);
  svg.on("dblclick.zoom", null);

  return () => {
    svgEl.removeEventListener("mousedown", closeColorPicker, true);
    svg.on(".zoom", null);
  };
}

export function resetCanvasNavigation(svg) {
  if (zoom) {
    svg.call(zoom.transform, d3.zoomIdentity);
  }
}

export function setCanvasTransform(svg, transform, duration = 0) {
  if (duration > 0) {
    svg.transition().duration(duration).call(zoom.transform, transform);
  } else {
    svg.call(zoom.transform, transform);
  }
}
