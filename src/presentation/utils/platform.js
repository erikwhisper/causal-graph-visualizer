const platformString =
  typeof navigator === "undefined"
    ? ""
    : navigator.userAgentData?.platform ||
      navigator.platform ||
      navigator.userAgent ||
      "";

export const isMac = /mac/i.test(platformString);

export function isPrimaryModifier(event) {
  return isMac ? !!event.metaKey : !!event.ctrlKey;
}


export function isKey(event, letter) {
  if (event.key?.toLowerCase() === letter) return true;
  return !!event.altKey && event.code === `Key${letter.toUpperCase()}`;
}

export function isEditableTarget(target) {
  if (!target || typeof target.closest !== "function") return false;
  return !!target.closest(
    'input, textarea, select, [contenteditable=""], [contenteditable="true"]',
  );
}

const KEY_LABELS_MAC = {
  mod: "⌘",
  alt: "⌥",
  shift: "⇧",
  Delete: "⌫",
  Enter: "↵",
};
const KEY_LABELS_OTHER = {
  mod: "Ctrl",
  alt: "Alt",
  shift: "Shift",
  Delete: "Del",
  Enter: "Enter",
};

export function keyLabel(token) {
  return (isMac ? KEY_LABELS_MAC : KEY_LABELS_OTHER)[token] ?? token;
}

export function formatKeys(tokens) {
  return tokens.map(keyLabel).join(isMac ? "" : "+");
}
