import { keyLabel } from "../../../utils/platform.js";

export function showAddNodeModal(onConfirm) {
  const existingModal = document.getElementById("add-node-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "add-node-modal";
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="add-node-title">
      <button id="add-node-close" class="modal-close" aria-label="Close">
        <i class="fa fa-times"></i>
      </button>
      <h3 id="add-node-title">Add node</h3>
      <div class="field">
        <label class="field-label" for="add-node-input">Label</label>
        <textarea id="add-node-input" rows="3" placeholder="e.g. X1"></textarea>
      </div>
      <p class="modal-hint">
        Press <kbd>${keyLabel("mod")}</kbd><kbd>${keyLabel("Enter")}</kbd> to confirm.
      </p>
      <div class="modal-actions">
        <button id="add-node-confirm" class="btn-primary">Add node</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = modal.querySelector("#add-node-input");
  const confirmBtn = modal.querySelector("#add-node-confirm");
  const closeBtn = modal.querySelector("#add-node-close");

  function cleanup() {
    modal.remove();
  }

  confirmBtn.addEventListener("click", () => {
    const nodeName = input.value.trim();
    if (!nodeName) {
      cleanup();
      return;
    }
    onConfirm(nodeName);
    cleanup();
  });

  closeBtn.addEventListener("click", cleanup);

  // Klick auf den abgedunkelten Hintergrund schließt den Dialog
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) cleanup();
  });

  // Esc schließt unabhängig davon, welches Element im Dialog den Fokus hat
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      cleanup();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      confirmBtn.click();
    }
  });

  input.focus();
}
