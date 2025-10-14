//Erlaubte Paar‑Kodierungen
const allowedPairKeys = new Set([
  //Keine Kante
  "0_0",
  //PAG Kanten
  "1_1",
  "1_2",
  "1_3",
  "2_1",
  "2_2",
  "2_3",
  "3_1",
  "3_2",
  "3_3",
  //ADMG Kanten
  "4_5",
  "5_4",
]);

const cleanLabel = (str) => str.replace(/"/g, "").trim();

export function validateMatrixForMatrixImport(text) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(","));

  const labels = extractLabels(lines);

  //Check if the matrix cotains, the hardcoded ' "" '-field.
  checkCornerCell(lines);

  //Check if the Labels are defined as ' "label name" '.
  checkLabelSyntax(lines);

  //Check if the matrix is "n x n", where n is the number of labels
  checkSquare(lines);

  //Check if the labels are horizontally and vertically in the same order.
  checkRowColumnMatch(lines, labels);

  //Check if every Number cell is filled with a value from 0 to 5.
  checkAllCellsFilled(lines);

  //Check if the diagonal is only filled with zeros (nodes cant have edges to themselfes).
  checkDiagonalZero(lines);

  //Check if the Matrix only includes pairs suported for conversion to json.
  checkAllowedPairs(lines);
}

function checkCornerCell(lines) {
  if (lines[0][0] !== '""') {
    throw new Error(
      `Top-left cell must be exactly "" (empty label placeholder), got: ${lines[0][0]}`
    );
  }
}

function checkLabelSyntax(lines) {
  const header = lines[0];
  header.forEach((cell, i) => {
    if (!/^".*"$/.test(cell)) {
      throw new Error(
        `Header column ${i}: Label must be quoted (e.g., "A"), got: ${cell}`
      );
    }
  });

  lines.slice(1).forEach((row, i) => {
    const cell = row[0];
    if (!/^".*"$/.test(cell)) {
      throw new Error(
        `Row ${
          i + 1
        }: Label in first column must be quoted (e.g., "A"), got: ${cell}`
      );
    }
  });
}

function checkSquare(lines) {
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

function extractLabels(lines) {
  const raw = lines[0].slice(1);
  const labels = raw.map(cleanLabel);

  const duplicate = labels.find((lab, i) => labels.indexOf(lab) !== i);
  if (duplicate) {
    throw new Error(`Duplicate label found: "${duplicate}"`);
  }
  return labels;
}

function checkRowColumnMatch(lines, colLabels) {
  const rowLabels = lines.slice(1).map((row) => cleanLabel(row[0]));
  colLabels.forEach((lab, i) => {
    if (lab !== rowLabels[i]) {
      throw new Error(
        `Label mismatch at index ${i}: Column="${lab}", Row="${rowLabels[i]}"`
      );
    }
  });
}

function checkAllCellsFilled(lines) {
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

function checkDiagonalZero(lines) {
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

function checkAllowedPairs(lines) {
  const n = lines.length - 1;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      const a = Number(lines[i][j]);
      const b = Number(lines[j][i]);
      const key = `${a}_${b}`;
      if (!allowedPairKeys.has(key)) {
        throw new Error(
          `Invalid edge combination (${a}, ${b}) between "${cleanLabel(
            lines[i][0]
          )}" and "${cleanLabel(lines[j][0])}"`
        );
      }
    }
  }
}
