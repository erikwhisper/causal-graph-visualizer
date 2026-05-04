import { closeAllDropdowns } from "./closeAllDropdowns.js";

export function handleDropdownToggle(dropdown, dropdowns) {
  const trigger = dropdown.querySelector(".toolbar-dropdown-trigger");
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    closeAllDropdowns(dropdowns);
    if (!isOpen) {
      dropdown.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
}
