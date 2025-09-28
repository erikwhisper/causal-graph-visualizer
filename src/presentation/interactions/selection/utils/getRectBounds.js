export function getRectBounds(start, end) {
  const [sx, sy] = start;
  const [ex, ey] = end;
  return {
    x0: Math.min(sx, ex),
    y0: Math.min(sy, ey),
    x1: Math.max(sx, ex),
    y1: Math.max(sy, ey),
  };
}
