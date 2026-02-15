import { ALLOWED_PAIR_KEYS } from "../utils/allowedPairKeys.js";
import { cleanLabel } from "../utils/cleanLabel.js";

export function checkAllowedPairs(lines) {
  const n = lines.length - 1;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      const a = Number(lines[i][j]);
      const b = Number(lines[j][i]);
      const key = `${a}_${b}`;
      if (!ALLOWED_PAIR_KEYS.has(key)) {
        throw new Error(
          `Invalid edge combination (${a}, ${b}) between "${cleanLabel(
            lines[i][0]
          )}" and "${cleanLabel(lines[j][0])}"`
        );
      }
    }
  }
}
