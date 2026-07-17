import * as d3 from "d3";

export function renderLabelLines(labels) {
    labels.each(function (node) {
        const lineHeight = node.getLabelLineHeight();
        const lines = String(node.getLabel() ?? "").split(/\r?\n/);
        const x = node.getXValue() + node.getLabelOffsetX();

        d3.select(this)
            .selectAll("tspan")
            .data(lines)
            .join("tspan")
            .attr("x", x)
            .attr("dy", (_, index) =>
                index === 0
                    ? `${-((lines.length -1) * lineHeight) / 2}em`
                    : `${lineHeight}em`)
            .text((line) => line);
    })
}
