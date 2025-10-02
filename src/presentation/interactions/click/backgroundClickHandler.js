import { unhighlightAll } from "../../utils/unhighlightAll.js";

export function registerBackgroundClick(svg, graph) {
  svg.on("click", function (event) {
    if (event.ctrlKey) return;

    const target = event.target;

    if (
      !(
        target.classList.contains("node") ||
        target.classList.contains("link") ||
        target.classList.contains("node-label")
      )
    ) {
      unhighlightAll(svg, graph);
    }
  });
}
