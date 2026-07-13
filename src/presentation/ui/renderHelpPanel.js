import { generateHelpPanelHTML } from "./utils/generateHelpPanelHTML.js";

export function renderHelpPanel() {
  const helpBtn = document.getElementById("help-btn");
  const helpPanel = document.getElementById("help-panel");

  if (!helpBtn || !helpPanel) {
    return () => {};
  }

  helpPanel.innerHTML = generateHelpPanelHTML();

  const closeBtn = document.getElementById("help-close-btn");

  let isOpen = false;

  const setOpen = (open) => {
    isOpen = open;
    helpPanel.classList.toggle("open", open);
    helpPanel.setAttribute("aria-hidden", String(!open));
    helpBtn.setAttribute("aria-expanded", String(open));
  };

  const toggle = () => setOpen(!isOpen);
  const close = () => setOpen(false);

  const handleKeydown = (e) => {
    if (e.key === "Escape" && isOpen) {
      close();
    }
  };

  helpBtn.addEventListener("click", toggle);
  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }
  document.addEventListener("keydown", handleKeydown);

  return () => {
    helpBtn.removeEventListener("click", toggle);
    if (closeBtn) {
      closeBtn.removeEventListener("click", close);
    }
    document.removeEventListener("keydown", handleKeydown);
  };
}
