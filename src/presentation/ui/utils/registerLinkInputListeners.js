import { updateLinkVisual } from "../../../visualization/update/updateLinkVisual.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { ensurePanelInteractions } from "./panelInteractions.js";
import { getCommon } from "./panelFieldHelpers.js";

export function registerLinkInputListeners(
  selectedLinks,
  svg,
  graph,
  graphHistory
) {
  // Farb-Connectoren, Select-on-Focus, Mixed-Zustand (einmalig, delegiert)
  ensurePanelInteractions();

  const colorInputs = [
    { id: "link-stroke", setter: "setStrokeColor" },
    { id: "arrowhead-color", setter: "setArrowheadColor" },
    { id: "arrowtail-color", setter: "setArrowtailColor" },
  ];

  const numberInputs = [
    { id: "link-stroke-width", setter: "setStrokeWidth" },
    { id: "arrowhead-width", setter: "setArrowheadWidth" },
    { id: "arrowtail-width", setter: "setArrowtailWidth" },
  ];

  const listeners = [];

  //string eingame
  colorInputs.forEach((config) => {
    const input = document.getElementById(config.id);
    if (!input) return;

    const handler = () => {
      selectedLinks.forEach((link) => {
        link[config.setter](input.value);
        updateLinkVisual(link, svg, graph);
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

    const inputHandler = () => {
      const value = input.value;
      const parsedValue = parseFloat(value);
      const isValid = !isNaN(parsedValue) && value.trim() !== "";
      input.classList.toggle("input-invalid", !isValid);
      if (!isValid) return;
      selectedLinks.forEach((link) => {
        link[config.setter](parsedValue);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
    };

    const changeHandler = () => {

      if (input.classList.contains("input-invalid")) return;
      graphHistory.setNewState(graph.getEverything());
    };

    input.addEventListener("input", inputHandler);
    input.addEventListener("change", changeHandler);
    listeners.push(() => {
      input.removeEventListener("input", inputHandler);
      input.removeEventListener("change", changeHandler);
    });
  });

  //link style select (weder string noch number)
  const styleSelect = document.getElementById("link-style");
  if (styleSelect) {
    const handler = () => {
      selectedLinks.forEach((link) => {
        link.setLinkStyle(styleSelect.value);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    };

    styleSelect.addEventListener("change", handler);
    listeners.push(() => styleSelect.removeEventListener("change", handler));
  }

  //fuer arrowhead
  registerArrowButtons(
    "#arrowhead-buttons",
    "setArrowhead",
    selectedLinks,
    svg,
    graph,
    graphHistory,
    listeners,
  );

  //fuer arrowtail
  registerArrowButtons(
    "#arrowtail-buttons",
    "setArrowtail",
    selectedLinks,
    svg,
    graph,
    graphHistory,
    listeners,
  );

  //reset curvature (weder string noch number)
  const resetBtn = document.getElementById("reset-curvature");
  if (resetBtn) {
    const handler = () => {
      selectedLinks.forEach((link) => {
        link.setLinkCurvature(null, null);
        updateLinkVisual(link, svg, graph);
      });
      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    };

    resetBtn.addEventListener("click", handler);
    listeners.push(() => resetBtn.removeEventListener("click", handler));
  }

  // Aktiven Pfeiltyp markieren: bei Mehrfachauswahl nur, wenn alle Links denselben haben
  setActiveButtonIfCommon("#arrowhead-buttons", selectedLinks, (l) =>
    l.getArrowhead(),
  );
  setActiveButtonIfCommon("#arrowtail-buttons", selectedLinks, (l) =>
    l.getArrowtail(),
  );

  return () => listeners.forEach((cleanup) => cleanup());
}

function registerArrowButtons(
  selector,
  setter,
  selectedLinks,
  svg,
  graph,
  graphHistory,
  listeners,
) {
  const buttons = document.querySelectorAll(`${selector} button`);

  buttons.forEach((btn) => {
    const handler = () => {
      const value = btn.getAttribute("data-value");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      selectedLinks.forEach((link) => {
        link[setter](value);
        updateLinkVisual(link, svg, graph);
      });

      updateVisualStyles(svg, graph);
      graphHistory.setNewState(graph.getEverything());
    };

    btn.addEventListener("click", handler);
    listeners.push(() => btn.removeEventListener("click", handler));
  });
}

function setActiveButtonIfCommon(selector, links, getter) {
  const { value, mixed } = getCommon(links, getter);
  setActiveButton(selector, mixed ? null : value);
}

function setActiveButton(selector, activeValue) {
  document.querySelectorAll(`${selector} button`).forEach((btn) => {
    if (btn.getAttribute("data-value") === activeValue) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}