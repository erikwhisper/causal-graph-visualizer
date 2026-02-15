export function checkAllCellsFilled(lines) {
  const validNumbers = new Set([0, 1, 2, 3, 4, 5]);
  for (let r = 1; r < lines.length; r++) {
    for (let c = 1; c < lines[r].length; c++) {
      const cell = lines[r][c].trim();
      if (cell === "") {
        throw new Error(`Empty cell at row ${r}, column ${c}`);
      }
      const v = Number(cell);
      if (Number.isNaN(v) || !validNumbers.has(v)) {
        throw new Error(`Invalid value "${cell}" at [${r}, ${c}]. Must be 0-5`);
      }
    }
  }
}