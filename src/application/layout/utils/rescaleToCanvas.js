import { isGridEnabled } from "../../../presentation/utils/GridManager.js";
import { getGridSpacing } from "../../../presentation/utils/GridManager.js";

export function rescaleToCanvas(positions, width, height) {
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const marginX = width * 0.1;
  const marginY = height * 0.1;

  const availableWidth = width - 2 * marginX;
  const availableHeight = height - 2 * marginY;

  return positions.map((p) => {
    const nx = maxX > minX ? (p.x - minX) / (maxX - minX) : 0.5;
    const ny = maxY > minY ? (p.y - minY) / (maxY - minY) : 0.5;

    let x = marginX + nx * availableWidth;
    let y = marginY + ny * availableHeight;

    if (isGridEnabled()) {
      const spacing = getGridSpacing();
      x = Math.round(x / spacing) * spacing;
      y = Math.round(y / spacing) * spacing;
    }

    return { id: p.id, x, y };
  });
}
