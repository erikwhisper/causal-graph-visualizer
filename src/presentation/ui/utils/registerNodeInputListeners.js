import { updateNodeVisual } from "../../../visualization/update/updateNodeVisual";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles";

export function registerNodeInputListeners(
  selectedNodes,
  svg,
  graph,
  graphHistory,
) {
  const stringInputs = [
    { id: "node-label", setter: "setLabel" },
    { id: "node-fill", setter: "setFillColor" },
    { id: "node-stroke", setter: "setStrokeColor" },
    { id: "node-label-color", setter: "setLabelColor" },
    { id: "node-label-font-family", setter: "setLabelFontFamily" },
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

  numberInputs.forEach((config) => {
    const input = document.getElementById(config.id);
    if (!input) return;

    const inputHandler = () => {
      const value = input.value;
      const parsedValue = parseFloat(value);
      const isValid = !isNaN(parsedValue) && value.trim() !== "";
      input.classList.toggle("input-invalid", !isValid);
      if (!isValid) return;
      selectedNodes.forEach((node) => {
        node[config.setter](parsedValue);
        updateNodeVisual(node, svg, graph);
      });
      updateVisualStyles(svg, graph);
    };

    const changeHandler = () => {
      input.classList.remove("input-invalid");
      graphHistory.setNewState(graph.getEverything());
    };

    input.addEventListener("input", inputHandler);
    input.addEventListener("change", changeHandler);
    listeners.push(() => {
      input.removeEventListener("input", inputHandler);
      input.removeEventListener("change", changeHandler);
    });
  });

  return () => listeners.forEach((cleanup) => cleanup());
}
