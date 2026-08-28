import { CURVATURE_SNAP_MAX_EXTENSION_FACTOR } from "../../utils/visualConstants.js";

const COMPASS_DIRECTIONS = [
  { x: 1, y: 0 }, // E
  { x: Math.SQRT1_2, y: Math.SQRT1_2 }, // SE
  { x: 0, y: 1 }, // S
  { x: -Math.SQRT1_2, y: Math.SQRT1_2 }, // SW
  { x: -1, y: 0 }, // W
  { x: -Math.SQRT1_2, y: -Math.SQRT1_2 }, // NW
  { x: 0, y: -1 }, // N
  { x: Math.SQRT1_2, y: -Math.SQRT1_2 }, // NE
];

export function computeCurvatureSnapCandidates(source, target) {
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const maxExtension =
    Math.sqrt(dx * dx + dy * dy) * CURVATURE_SNAP_MAX_EXTENSION_FACTOR;

  const candidates = [];

  COMPASS_DIRECTIONS.forEach((u) => {
    COMPASS_DIRECTIONS.forEach((w) => {
      const det = w.x * u.y - u.x * w.y;
      if (Math.abs(det) < 1e-9) return;

      const Dx = target.x - source.x;
      const Dy = target.y - source.y;

      const t = (-Dx * w.y + w.x * Dy) / det;
      const s = (u.x * Dy - u.y * Dx) / det;

      if (t <= 0 || s <= 0) return;
      if (t > maxExtension || s > maxExtension) return;

      const actualCx = source.x + t * u.x;
      const actualCy = source.y + t * u.y;

      candidates.push({
        x: (actualCx + midX) / 2,
        y: (actualCy + midY) / 2,
      });
    });
  });

  return candidates;
}
