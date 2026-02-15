import { cleanLabel } from "../utils/cleanLabel";

export function checkRowColumnMatch(lines, colLabels) {
  const rowLabels = lines.slice(1).map((row) => cleanLabel(row[0]));
  colLabels.forEach((lab, i) => {
    if (lab !== rowLabels[i]) {
      throw new Error(
        `Label mismatch at index ${i}: Column="${lab}", Row="${rowLabels[i]}"`
      );
    }
  });
}
