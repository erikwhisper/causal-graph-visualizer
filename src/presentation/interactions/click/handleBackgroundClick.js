import { unhighlightAll } from "../../utils/unhighlightAll.js";

export function handleBackgroundClick(svg, graph) {
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
      svg.select("#ghost-link").remove();
      svg.on("mousemove.ghost", null);
      unhighlightAll(svg, graph);
    }
  });
}