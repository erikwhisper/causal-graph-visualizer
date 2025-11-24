import { updateNodeVisual } from "../../../visualization/update/updateNodeVisual";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles";

export function registerNodeInputListeners(
  selectedNodes,
  svg,
  graph,
  graphHistory
) {
  const stringInputs = [
    { id: "node-label", setter: "setLabel" },
    { id: "node-fill", setter: "setFillColor" },
    { id: "node-stroke", setter: "setStrokeColor" },
    { id: "node-label-color", setter: "setLabelColor" },
    //{ id: "node-label-font-family", setter: "setLabelFontFamily" },
  ];

  const numberInputs = [
    { id: "node-radius", setter: "setRadius" },
    { id: "node-x", setter: "setXValue" },
    { id: "node-y", setter: "setYValue" },
    { id: "node-stroke-width", setter: "setStrokeWidth" },
    { id: "node-label-font-size", setter: "setLabelFontSize" },
    { id: "node-label-offset-x", setter: "setLabelOffsetX" },
    { id: "node-label-offset-y", setter: "setLabelOffsetY" },
  ];

  const listeners = [];

  //string eingabe
  stringInputs.forEach((config) => {
    const input = document.getElementById(config.id);
    if (!input) return;

    const handler = () => {
      selectedNodes.forEach((node) => {
        node[config.setter](input.value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    };

    const saveHandler = () => graphHistory.setNewState(graph.getEverything());

    input.addEventListener("input", handler);
    input.addEventListener("change", saveHandler);
    listeners.push(() => {
      input.removeEventListener("input", handler);
      input.removeEventListener("change", saveHandler);
    });
  });

  //number eingabe
  numberInputs.forEach((config) => {
    const input = document.getElementById(config.id);
    if (!input) return;

    const handler = () => {
      const value = parseFloat(input.value);
      if (isNaN(value)) return;

      selectedNodes.forEach((node) => {
        node[config.setter](value);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    };

    const saveHandler = () => graphHistory.setNewState(graph.getEverything());

    input.addEventListener("input", handler);
    input.addEventListener("change", saveHandler);
    listeners.push(() => {
      input.removeEventListener("input", handler);
      input.removeEventListener("change", saveHandler);
    });
  });

  return () => listeners.forEach((cleanup) => cleanup());
}
