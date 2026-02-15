export function checkDualEdgeConfiguration(linkPairs, nodeLabels) {
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
