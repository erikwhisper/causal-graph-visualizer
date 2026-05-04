import { LAYOUT_EDGE_PADDING } from "../../../utils/visualConstants.js";
import { getMargin } from "./getMargin.js";

export function rescaleToCanvas(positions, width, height, gridManager) {
  if (positions.length === 0) return [];

  let cMinX = Infinity,
    cMaxX = -Infinity;
  let cMinY = Infinity,
    cMaxY = -Infinity;
  let maxMargin = 0;

  positions.forEach((p) => {
    cMinX = Math.min(cMinX, p.x);
    cMaxX = Math.max(cMaxX, p.x);
    cMinY = Math.min(cMinY, p.y);
    cMaxY = Math.max(cMaxY, p.y);
    maxMargin = Math.max(maxMargin, getMargin(p));
  });

  const centerW = cMaxX - cMinX;
  const centerH = cMaxY - cMinY;

  const reservedX = LAYOUT_EDGE_PADDING + maxMargin;
  const reservedY = LAYOUT_EDGE_PADDING + maxMargin;
  const availW = Math.max(1, width - 2 * reservedX);
  const availH = Math.max(1, height - 2 * reservedY);

  const scale = Math.min(
    centerW > 0 ? availW / centerW : 1,
    centerH > 0 ? availH / centerH : 1,
  );

  const scaledW = centerW * scale;
  const scaledH = centerH * scale;
  const offsetX = reservedX + (availW - scaledW) / 2;
  const offsetY = reservedY + (availH - scaledH) / 2;

  return positions.map((p) => {
    let x = centerW > 0 ? offsetX + (p.x - cMinX) * scale : width / 2;
    let y = centerH > 0 ? offsetY + (p.y - cMinY) * scale : height / 2;

    if (gridManager.isGridEnabled()) {
      const spacing = gridManager.getGridSpacing();
      const margin = getMargin(p);

      const snappedX = Math.round(x / spacing) * spacing;
      if (
        snappedX - margin >= LAYOUT_EDGE_PADDING &&
        snappedX + margin <= width - LAYOUT_EDGE_PADDING
      ) {
        x = snappedX;
      }

      const snappedY = Math.round(y / spacing) * spacing;
      if (
        snappedY - margin >= LAYOUT_EDGE_PADDING &&
        snappedY + margin <= height - LAYOUT_EDGE_PADDING
      ) {
        y = snappedY;
      }
    }

    const margin = getMargin(p);
    x = Math.max(
      LAYOUT_EDGE_PADDING + margin,
      Math.min(width - LAYOUT_EDGE_PADDING - margin, x),
    );
    y = Math.max(
      LAYOUT_EDGE_PADDING + margin,
      Math.min(height - LAYOUT_EDGE_PADDING - margin, y),
    );

    return { id: p.id, x, y };
  });
}
