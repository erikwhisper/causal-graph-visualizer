import * as d3 from "d3";

let currentMousePos = [100, 100];

export function addMouseMoveListener(svg) {
  svg.on("mousemove", function (event) {
    currentMousePos = d3.pointer(event, this);
  });
}

export function getCurrentMousePosition() {
  return currentMousePos;
}
