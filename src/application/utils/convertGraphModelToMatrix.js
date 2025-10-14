//utils sollte eher eine /io/utils sein und keine /application/utils
//denn für validation wäre auch eien /validation/utils keine schlechte idee

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

  const header = [`""`, ...nodes.map((n) => `"${n.label}"`)].join(",");
  const rows = matrix.map((row, i) =>
    [`"${nodes[i].label}"`, ...row].join(",")
  );

  return [header, ...rows].join("\n");
}
