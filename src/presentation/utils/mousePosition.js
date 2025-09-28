import * as d3 from "d3";

let currentMousePos = { x: 0, y: 0 };

export function addMouseMoveListener(svg) {
  svg.on("mousemove", function (event) {
    currentMousePos = d3.pointer(event, this);
  });
}

export function getCurrentMousePosition() {
  return currentMousePos;
}

//optional könnte hier nur alle paar ms mit einer schedueled die position aktualisiert werden
//wäre eine idee performance zu verbessern.
