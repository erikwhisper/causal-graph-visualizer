export function checkMaxTwoEdgesPerPair(linkPairs, nodeLabels) {
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
