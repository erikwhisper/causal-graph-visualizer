const colorLinkState = new Map([
  ["node:fill-border", false],
  ["node:border-text", false],
  ["link:head-line", true],
  ["link:line-tail", true],
]);

const linkTitle = (pressed) =>
  pressed
    ? "Linked: changing one color changes the other. Click to unlink."
    : "Unlinked. Click to link these colors.";

export function colorLinkButtonHTML(id, nameA, nameB) {
  const pressed = colorLinkState.get(id) ?? false;
  return `
    <button type="button" class="color-link" data-link-id="${id}"
            aria-pressed="${pressed}"
            aria-label="Link ${nameA} and ${nameB} colors"
            title="${linkTitle(pressed)}">
      <span class="color-link-chip">
        <svg class="color-link-icon--on" viewBox="0 0 20 10" aria-hidden="true">
          <path d="M8 1.5H5.5a3.5 3.5 0 0 0 0 7H8" />
          <path d="M12 1.5h2.5a3.5 3.5 0 0 1 0 7H12" />
          <path d="M7 5h6" />
        </svg>
        <svg class="color-link-icon--off" viewBox="0 0 20 10" aria-hidden="true">
          <path d="M7 1.5H5.5a3.5 3.5 0 0 0 0 7H7" />
          <path d="M13 1.5h1.5a3.5 3.5 0 0 1 0 7H13" />
        </svg>
      </span>
    </button>`;
}

let installed = false;
let propagating = false; // verhindert Endlosschleifen beim Weiterreichen

const isNumberInput = (el) =>
  el instanceof HTMLInputElement && el.type === "number";


function propagateColor(changedInput) {
  const chain = changedInput.closest(".color-chain");
  if (!chain) return;

  const inputs = [...chain.querySelectorAll("input.coloris")];
  const links = [...chain.querySelectorAll(".color-link")];
  const start = inputs.indexOf(changedInput);
  if (start === -1) return;

  const isActive = (link) => link.getAttribute("aria-pressed") === "true";
  const targets = [];

  for (let i = start; i < links.length && isActive(links[i]); i++) {
    targets.push(inputs[i + 1]);
  }
  for (let i = start - 1; i >= 0 && isActive(links[i]); i--) {
    targets.push(inputs[i]);
  }

  propagating = true;
  try {
    targets.forEach((target) => {
      target.value = changedInput.value;
      target.dispatchEvent(new Event("input", { bubbles: true }));
    });
  } finally {
    propagating = false;
  }
}

export function ensurePanelInteractions() {
  if (installed) return;
  const panel = document.getElementById("property-panel");
  if (!panel) return;
  installed = true;

  let pointerFocus = false;
  panel.addEventListener("mousedown", (event) => {
    pointerFocus =
      isNumberInput(event.target) && document.activeElement !== event.target;
  });
  panel.addEventListener("focusin", (event) => {
    if (isNumberInput(event.target)) event.target.select();
  });
  panel.addEventListener("mouseup", (event) => {
    if (pointerFocus) event.preventDefault();
    pointerFocus = false;
  });


  panel.addEventListener("input", (event) => {
    event.target.closest?.(".field--mixed")?.classList.remove("field--mixed");

    if (propagating) return;
    if (event.target.matches?.(".color-chain input.coloris")) {
      propagateColor(event.target);
    }
  });


  panel.addEventListener("click", (event) => {
    const button = event.target.closest?.(".color-link");
    if (!button) return;

    const pressed = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(pressed));
    button.title = linkTitle(pressed);
    colorLinkState.set(button.dataset.linkId, pressed);
  });
}