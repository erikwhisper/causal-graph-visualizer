export function escapeHtml(str) {
  if (str === null || str === undefined) {
    return "";
  }

  const safeStr = String(str);

  return safeStr
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
