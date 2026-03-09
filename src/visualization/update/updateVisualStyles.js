import * as d3 from "d3";
import { HIGHLIGHT_STROKE_OFFSET } from "../../utils/visualConstants.js";

export function updateVisualStyles(svg, graph) {
  const highlightOffset = HIGHLIGHT_STROKE_OFFSET;

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
