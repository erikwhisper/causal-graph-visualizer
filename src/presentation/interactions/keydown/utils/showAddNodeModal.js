export function showAddNodeModal(onConfirm) {
  const existingModal = document.getElementById("add-node-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "add-node-modal";
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <button id="add-node-close" class="modal-close">
        <i class="fa fa-times"></i>
      </button>
      <h3>Add New Node</h3>
      <label>
        <span>Please enter the name for the new node:</span>
        <input type="text" id="add-node-input" autofocus />
      </label>
      <div class="modal-actions">
        <button id="add-node-confirm" class="btn-export">
          OK
        </button>
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

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      confirmBtn.click();
    }
    if (event.key === "Escape") {
      cleanup();
    }
  });

  input.focus();
}
