import { extractLabels } from "./utils/extractLabels.js";
import { checkCornerCell } from "./checks/checkCornerCell.js";
//import { checkLabelSyntax } from "./checks/checkLabelSyntax.js";
import { checkSquare } from "./checks/checkSquare.js";
import { checkRowColumnMatch } from "./checks/checkRowColumnMatch.js";
import { checkAllCellsFilled } from "./checks/checkAllCellsFilled.js";
import { checkDiagonalZero } from "./checks/checkDiagonalZero.js";
import { checkAllowedPairs } from "./checks/checkAllowedPairs.js";
import {csvParseRows} from "d3";

export function validateMatrixForMatrixImport(text) {
  const rows = csvParseRows(text.trim());

  const labels = extractLabels(rows);

  checkCornerCell(rows);
  //checkLabelSyntax(rows);
  checkSquare(rows);
  checkRowColumnMatch(rows, labels);
  checkAllCellsFilled(rows);
  checkDiagonalZero(rows);
  checkAllowedPairs(rows);

  return rows
}
