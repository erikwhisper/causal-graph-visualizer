//TODO: Die Funkton mal aufräumen und menschen leserlich machen.
//Kann man bestimmt hunderte utils funktionen machen, also maybe /validation/utils
//erstellen und da rein moven

//Variablen sinnvollere namen geben

/* ------------------  erlaubte Paar‑Kodierungen  ------------------ */
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
      "Der linke-obere Eintrag muss genau" +
        ' "" ' +
        "sein (leerer Label-Platzhalter)."
    );
  }
}

function checkLabelSyntax(lines) {
  //Kopfzeile: alle Zellen ausser dem ersten
  const header = lines[0];
  header.forEach((cell, i) => {
    if (!/^".*"$/.test(cell)) {
      throw new Error(
        "Kopfzeile: Label in Spalte " +
          `${i}` +
          ' muss in Anführungszeichen stehen (z.B. "A").'
      );
    }
  });

  //Erste Spalte jeder Zeile außer der Kopfzeile
  lines.slice(1).forEach((row, i) => {
    const cell = row[0];
    if (!/^".*"$/.test(cell)) {
      throw new Error(
        "Zeile " +
          `${i + 1}` +
          ': Label in erster Spalte muss in Anführungszeichen stehen (z.B. "A").'
      );
    }
  });
}

function checkSquare(lines) {
  const n = lines[0].length - 1; //Spaltenzahlen
  if (lines.length !== n + 1) {
    throw new Error(
      "Matrix hat " +
        `${lines.length - 1}` +
        "Zeilen, erwartet: " +
        `${n}` +
        "."
    );
  }
  lines.forEach((row, i) => {
    if (row.length !== n + 1) {
      //Anzahl zeileneinträge pro Zeile
      throw new Error(
        "Zeile " +
          `${i}` +
          " hat " +
          `${row.length - 1}` +
          " Werte, erwartet: " +
          `${n}` +
          "."
      );
    }
  });
}

function extractLabels(lines) {
  const raw = lines[0].slice(1); //erste Zeile,ohne erstes‑Feld
  const labels = raw.map(cleanLabel);

  const dup = labels.find((lab, i) => labels.indexOf(lab) !== i);
  if (dup) {
    throw new Error("Label " + `${dup}` + " kommt mehrfach vor.");
  }
  return labels;
}

function checkRowColumnMatch(lines, colLabels) {
  const rowLabels = lines.slice(1).map((row) => cleanLabel(row[0]));
  colLabels.forEach((lab, i) => {
    if (lab !== rowLabels[i]) {
      throw new Error(
        "Label-Mismatch an Index " +
          `${i}` +
          ": Spalte " +
          `${lab}` +
          ", Zeile " +
          `${rowLabels[i]}` +
          "."
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
        throw new Error(
          "Leeres Feld in Zeile " + `${r}` + ", Spalte " + `${c}` + "."
        );
      }
      const v = Number(cell);
      if (Number.isNaN(v) || !validNumbers.has(v)) {
        throw new Error(
          "Ungültiger Wert " +
            `${cell}` +
            " in Feld [" +
            `${r}` +
            "," +
            `${c}` +
            "]" +
            "."
        );
      }
    }
  }
}

function checkDiagonalZero(lines) {
  //Anzahl Zahlen pro Zeile = Spaltenzahl = n
  const n = lines[0].length - 1;

  for (let i = 0; i < n; i++) {
    const value = Number(lines[i + 1][i + 1]);
    if (value !== 0) {
      const label = lines[0][i + 1].replace(/"/g, "");
      throw new Error(
        "Diagonaleintrag für Knoten " +
          `${label}` +
          " (Zeile " +
          `${i + 1}` +
          ", Spalte " +
          `${i + 1}` +
          ") ist " +
          `${value}` +
          ", erwartet 0."
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
          "Ungültige Kombination (" +
            `${a}` +
            ", " +
            `${b}` +
            ") zwischen " +
            `${cleanLabel(lines[i][0])}` +
            " und " +
            `${cleanLabel(lines[j][0])}` +
            "."
        );
      }
    }
  }
}
