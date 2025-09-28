import * as d3 from "d3";

export function updateVisualStyles(svg, graph) {
  const highlightOffset = 2;

  svg.selectAll(".node").each(function () {
    const el = d3.select(this);
    const node = el.datum();
    const base = node.strokeWidth;
    el.attr(
      "stroke-width",
      node.getHighlighted() ? base + highlightOffset : base
    );
  });

  svg.selectAll(".link").each(function () {
    const el = d3.select(this);
    const link = el.datum();
    const base = link.strokeWidth;
    el.attr(
      "stroke-width",
      link.getHighlighted() ? base + highlightOffset : base
    );
  });
}
