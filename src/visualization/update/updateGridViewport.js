import * as d3 from "d3";

export function updateGridViewport(
  svg,
  transform = d3.zoomTransform(svg.node()),
) {
  const patternTransform =
    `translate(${transform.x}, ${transform.y}) scale(${transform.k})`;

  svg
    .selectAll("#grid-pattern-small, #grid-pattern-big")
    .attr("patternTransform", patternTransform);
}