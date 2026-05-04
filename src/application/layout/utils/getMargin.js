export function getMargin(p) {
  const radius = typeof p.radius === "number" ? p.radius : 0;
  const strokeWidth = typeof p.strokeWidth === "number" ? p.strokeWidth : 0;
  return radius + strokeWidth / 2;
}
