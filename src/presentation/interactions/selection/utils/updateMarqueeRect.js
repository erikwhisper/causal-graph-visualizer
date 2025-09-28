export function updateMarqueeRect(rect, start, current) {
  const [sx, sy] = start;
  const [mx, my] = current;
  const x = Math.min(sx, mx);
  const y = Math.min(sy, my);
  const w = Math.abs(mx - sx);
  const h = Math.abs(my - sy);
  rect.attr("x", x).attr("y", y).attr("width", w).attr("height", h);
}
