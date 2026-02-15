import { extractLabels } from "./utils/extractLabels.js";
import { checkCornerCell } from "./checks/checkCornerCell.js";
import { checkLabelSyntax } from "./checks/checkLabelSyntax.js";
import { checkSquare } from "./checks/checkSquare.js";
import { checkRowColumnMatch } from "./checks/checkRowColumnMatch.js";
import { checkAllCellsFilled } from "./checks/checkAllCellsFilled.js";
import { checkDiagonalZero } from "./checks/checkDiagonalZero.js";
import { checkAllowedPairs } from "./checks/checkAllowedPairs.js";

export function validateMatrixForMatrixImport(text) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(","));

  const labels = extractLabels(lines);

  checkCornerCell(lines);
  checkLabelSyntax(lines);
  checkSquare(lines);
  checkRowColumnMatch(lines, labels);
  checkAllCellsFilled(lines);
  checkDiagonalZero(lines);
  checkAllowedPairs(lines);
}
