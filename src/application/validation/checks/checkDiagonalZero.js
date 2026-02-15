export function checkDiagonalZero(lines) {
  const n = lines[0].length - 1;

  for (let i = 0; i < n; i++) {
    const value = Number(lines[i + 1][i + 1]);
    if (value !== 0) {
      const label = lines[0][i + 1].replace(/"/g, "");
      throw new Error(
        `Diagonal entry for node "${label}" at [${i + 1}, ${
          i + 1
        }] is ${value}, expected 0 (no self-loops)`
      );
    }
  }
}
