export function validateGraphForMatrixExport(graphData) {
  const { nodes, links } = graphData;

  checkForDuplicateLabels(nodes);

  const nodeLabels = new Map(nodes.map((n) => [n.nodeId, n.label]));
  const linkPairs = groupLinksByPair(links);

  checkMaxTwoEdgesPerPair(linkPairs, nodeLabels);
  checkDualEdgeConfiguration(linkPairs, nodeLabels);
}

function checkForDuplicateLabels(nodes) {
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

function groupLinksByPair(links) {
  const pairs = new Map();

  links.forEach((link) => {
    const key = [link.sourceNodeId, link.targetNodeId].sort().join("_");
    if (!pairs.has(key)) pairs.set(key, []);
    pairs.get(key).push(link);
  });

  return pairs;
}

function checkMaxTwoEdgesPerPair(linkPairs, nodeLabels) {
  linkPairs.forEach((pairLinks, pairKey) => {
    if (pairLinks.length > 2) {
      const [id1, id2] = pairKey.split("_");
      const label1 = nodeLabels.get(id1);
      const label2 = nodeLabels.get(id2);

      throw new Error(
        `More than 2 edges between "${label1}" and "${label2}". Matrix format cannot represent this.`
      );
    }
  });
}

function checkDualEdgeConfiguration(linkPairs, nodeLabels) {
  linkPairs.forEach((pairLinks, pairKey) => {
    if (pairLinks.length !== 2) return;

    const hasBidirectional = pairLinks.some(
      (l) =>
        l.linkStyle === "dashed" &&
        l.arrowhead === "normal" &&
        l.arrowtail === "normal"
    );

    const hasDirected = pairLinks.some(
      (l) =>
        l.linkStyle !== "dashed" &&
        ((l.arrowhead === "normal" && l.arrowtail === "tail") ||
          (l.arrowhead === "tail" && l.arrowtail === "normal"))
    );

    if (!(hasBidirectional && hasDirected)) {
      const [id1, id2] = pairKey.split("_");
      const label1 = nodeLabels.get(id1);
      const label2 = nodeLabels.get(id2);

      throw new Error(
        `Invalid dual edge configuration between "${label1}" and "${label2}". ` +
          `Expected one bidirectional (<- - ->) and one directed (-> or <-) edge.`
      );
    }
  });
}
