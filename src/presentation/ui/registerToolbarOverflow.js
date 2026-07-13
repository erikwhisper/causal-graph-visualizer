const COLLAPSE_ORDER = [
  "group-help",
  "group-selection",
  "group-fileio",
  "group-canvas",
  "group-editing",
  "group-history",
];

export function registerToolbarOverflow() {
  const header = document.getElementById("header-bar");
  const overflowWrapper = document.getElementById("toolbar-overflow");
  const overflowSeparator = document.getElementById("overflow-separator");
  const overflowMenu = document.getElementById("overflow-menu");

  if (!header || !overflowWrapper || !overflowMenu) {
    return () => {};
  }

  const groups = COLLAPSE_ORDER.map((id) => {
    const el = document.getElementById(id);
    if (!el) return null;

    const prev = el.previousElementSibling;
    const separator =
      prev && prev.classList.contains("toolbar-separator") ? prev : null;

    return {
      id,
      el,
      separator,
      children: Array.from(el.children),
      collapsed: false,
    };
  }).filter(Boolean);

  const anyCollapsed = () => groups.some((g) => g.collapsed);

  const setOverflowVisible = (visible) => {
    overflowWrapper.hidden = !visible;
    if (overflowSeparator) overflowSeparator.hidden = !visible;
  };

  const collapseGroup = (group) => {
    if (group.collapsed) return;
    group.children.forEach((child) => overflowMenu.appendChild(child));
    group.el.hidden = true;
    if (group.separator) group.separator.hidden = true;
    group.collapsed = true;
  };

  const restoreGroup = (group) => {
    if (!group.collapsed) return;
    group.children.forEach((child) => group.el.appendChild(child));
    group.el.hidden = false;
    if (group.separator) group.separator.hidden = false;
    group.collapsed = false;
  };

  const fits = () => header.scrollWidth <= header.clientWidth;

  const recalculate = () => {
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      if (!group.collapsed) continue;

      restoreGroup(group);
      setOverflowVisible(anyCollapsed());

      if (!fits()) {
        // Passt doch nicht -> zurück und Wiederherstellung stoppen
        collapseGroup(group);
        setOverflowVisible(anyCollapsed());
        break;
      }
    }

    let safety = groups.length;
    while (!fits() && safety > 0) {
      const next = groups.find((g) => !g.collapsed);
      if (!next) break;
      collapseGroup(next);
      setOverflowVisible(true);
      safety--;
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    recalculate();
  });
  resizeObserver.observe(header);

  recalculate();

  return () => {
    resizeObserver.disconnect();
  };
}
