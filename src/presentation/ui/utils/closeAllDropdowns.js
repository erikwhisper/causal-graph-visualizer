export function closeAllDropdowns(dropdowns) {
  dropdowns.forEach((d) => {
    d.classList.remove("open");
    d.querySelector(".toolbar-dropdown-trigger").setAttribute(
      "aria-expanded",
      "false",
    );
  });
}
