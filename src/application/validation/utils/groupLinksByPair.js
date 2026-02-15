export function groupLinksByPair(links) {
  const pairs = new Map();

  links.forEach((link) => {
    const key = [link.sourceNodeId, link.targetNodeId].sort().join("_");
    if (!pairs.has(key)) pairs.set(key, []);
    pairs.get(key).push(link);
  });

  return pairs;
}
