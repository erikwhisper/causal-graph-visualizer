export function checkSquare(lines) {
  const n = lines[0].length - 1;
  if (lines.length !== n + 1) {
    throw new Error(
      `Matrix has ${
        lines.length - 1
      } rows but ${n} columns (expected square matrix)`
    );
  }
  lines.forEach((row, i) => {
    if (row.length !== n + 1) {
      throw new Error(`Row ${i} has ${row.length - 1} values, expected ${n}`);
    }
  });
}
