import { unhighlightAll } from "../../utils/unhighlightAll.js";

export function registerBackgroundClick(svg, graph) {
  svg.on("click", function (event) {
    if (event.ctrlKey) return;

    const target = event.target;
    const clickedNode = target.closest?.(".node");
    const clickedLink = target.closest?.(".link");

    //idee: hier könnte ich auch unhighlightAll verwenden.
    if (!clickedNode && !clickedLink) {
      unhighlightAll(svg, graph);
    }
  });
}
