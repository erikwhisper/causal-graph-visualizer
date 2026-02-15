export function checkForDuplicateLabels(nodes) {
  const labelSet = new Set();

  nodes.forEach((node) => {
    if (labelSet.has(node.label)) {
      throw new Error(
        `Duplicate label "${node.label}" found. Matrix export requires unique node labels.`
      );
    }
    labelSet.add(node.label);
  });
}
