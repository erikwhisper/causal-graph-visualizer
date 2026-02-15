export function checkCornerCell(lines) {
  if (lines[0][0] !== '""') {
    throw new Error(
      `Top-left cell must be exactly "" (empty label placeholder), got: ${lines[0][0]}`
    );
  }
}
