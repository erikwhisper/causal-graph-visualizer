import { MULTI_EDGE_CURVATURE_STEP } from "../../../../utils/visualConstants.js";

export function computeMultiEdgeCurvature(graph, sourceNode, targetNode) {
  const sourceNodeId = sourceNode.getNodeId();
  const targetNodeId = targetNode.getNodeId();

  const existing = graph.links.filter(
    (l) =>
      (l.sourceNodeId === sourceNodeId && l.targetNodeId === targetNodeId) ||
      (l.sourceNodeId === targetNodeId && l.targetNodeId === sourceNodeId),
  );

  if (existing.length === 0) {
    return { linkCurvatureX: null, linkCurvatureY: null };
  }

  const hasStraight = existing.some(
    (l) => l.linkCurvatureX === null && l.linkCurvatureY === null,
  );

  if (!hasStraight) {
    return { linkCurvatureX: null, linkCurvatureY: null };
  }

  const curvedCount = existing.filter(
    (l) => l.linkCurvatureX !== null || l.linkCurvatureY !== null,
  ).length;

  const sign = curvedCount % 2 === 0 ? 1 : -1;
  const amplitude =
    (Math.floor(curvedCount / 2) + 1) * MULTI_EDGE_CURVATURE_STEP * 2;

  const mx = (sourceNode.getXValue() + targetNode.getXValue()) / 2;
  const my = (sourceNode.getYValue() + targetNode.getYValue()) / 2;

  const dx = targetNode.getXValue() - sourceNode.getXValue();
  const dy = targetNode.getYValue() - sourceNode.getYValue();
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) {
    return { linkCurvatureX: mx + sign * amplitude, linkCurvatureY: my };
  }

  const px = (-dy / len) * sign * amplitude;
  const py = (dx / len) * sign * amplitude;

  return {
    linkCurvatureX: mx + px,
    linkCurvatureY: my + py,
  };
}
