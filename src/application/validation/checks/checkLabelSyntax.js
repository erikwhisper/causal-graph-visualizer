export function checkLabelSyntax(lines) {
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
