function applyCurvatureOffsets(links, nodes) {
  const nodeMap = new Map(nodes.map((n) => [n.getNodeId(), n]));
  const linkGroups = new Map();

  links.forEach((link) => {
    const key = [link.getSourceNodeId(), link.getTargetNodeId()]
      .sort()
      .join("_");
    if (!linkGroups.has(key)) linkGroups.set(key, []);
    linkGroups.get(key).push(link);
  });

  linkGroups.forEach((group) => {
    if (group.length < 2) return;

    const hasDirected = group.some((l) => l.getLinkStyle() !== "dashed");
    const hasBidirected = group.some((l) => l.getLinkStyle() === "dashed");

    if (!(hasDirected && hasBidirected)) return;

    const curved = group.filter((l) => l.getLinkStyle() === "dashed");

    curved.forEach((link, index) => {
      const source = nodeMap.get(link.getSourceNodeId());
      const target = nodeMap.get(link.getTargetNodeId());
      if (!source || !target) return;

      const mx = (source.getXValue() + target.getXValue()) / 2;
      const my = (source.getYValue() + target.getYValue()) / 2;

      const dx = target.getXValue() - source.getXValue();
      const dy = target.getYValue() - source.getYValue();
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) return;

      const nx = -dy / len;
      const ny = dx / len;
      const spacing = 100;
      const offset = (index + 1) * spacing;

      link.setLinkCurvatureX(mx + offset * nx);
      link.setLinkCurvatureY(my + offset * ny);
    });
  });
}
