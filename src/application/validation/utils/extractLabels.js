import { cleanLabel } from "./cleanLabel.js";

export function extractLabels(lines) {
  const raw = lines[0].slice(1);
  const labels = raw.map(cleanLabel);

  const duplicate = labels.find((lab, i) => labels.indexOf(lab) !== i);
  if (duplicate) {
    throw new Error(`Duplicate label found: "${duplicate}"`);
  }
  return labels;
}
