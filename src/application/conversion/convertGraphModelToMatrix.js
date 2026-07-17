import { csvFormatRows } from "d3";

export function convertGraphModelToMatrix(graphData) {
  const { nodes, links } = graphData;
  const idToLabel = {};
  const labelToIndex = {};

  nodes.forEach((node, index) => {
    idToLabel[node.nodeId] = node.label;
    labelToIndex[node.label] = index;
  });

  const size = nodes.length;

  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const edgeMap = { none: 0, odot: 1, normal: 2, tail: 3 };

  links.forEach((link) => {
    const fromIndex = labelToIndex[idToLabel[link.sourceNodeId]];
    const toIndex = labelToIndex[idToLabel[link.targetNodeId]];
    matrix[fromIndex][toIndex] =
      matrix[fromIndex][toIndex] + edgeMap[link.arrowhead] ?? 0;
    matrix[toIndex][fromIndex] =
      matrix[toIndex][fromIndex] + edgeMap[link.arrowtail] ?? 0;
  });

  const csvRows = [
      ["", ...nodes.map((node) => node.label)],
      ...matrix.map((row, index) => [
          nodes[index].label, ...row
      ])
  ]

  return csvFormatRows(csvRows);
}
