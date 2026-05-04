import { handleDropdownToggle } from "./handleDropdownToggle.js";
import { closeAllDropdowns } from "./closeAllDropdowns.js";

export function registerDropdownToggles() {
  const dropdowns = document.querySelectorAll(".toolbar-dropdown");

  dropdowns.forEach((dropdown) => {
    handleDropdownToggle(dropdown, dropdowns);
  });

  document.addEventListener("click", () => {
    closeAllDropdowns(dropdowns);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns(dropdowns);
    }
  });
}
