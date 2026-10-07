import * as d3 from "d3";

let currentMousePos = [100, 100];

export function addMouseMoveListener(svg) {
  svg.on("mousemove.mousePosition", function (event) {
    currentMousePos = d3.pointer(event, svg.node());
  });
}

export function getCurrentMousePosition(svg) {
    return d3
    .zoomTransform(svg.node())
    .invert(currentMousePos);
}
