export function computeLinkPath(link, nodes) {
  function getNodePosition(nodeId) {
    const node = nodes.find((n) => n.getNodeId() === nodeId);
    return node ? { x: node.getXValue(), y: node.getYValue() } : { x: 0, y: 0 };
  }

  const source = getNodePosition(link.getSourceNodeId());
  const target = getNodePosition(link.getTargetNodeId());

  const sourceNode = nodes.find(
    (n) => n.getNodeId() === link.getSourceNodeId()
  );
  const targetNode = nodes.find(
    (n) => n.getNodeId() === link.getTargetNodeId()
  );

  const sourceRadius = sourceNode ? sourceNode.getRadius() : 0;
  const targetRadius = targetNode ? targetNode.getRadius() : 0;

  const sourceStrokeWidth = sourceNode ? sourceNode.getStrokeWidth() / 2 : 0;
  const targetStrokeWidth = targetNode ? targetNode.getStrokeWidth() / 2 : 0;

  const arrowheadWidth =
    link.getArrowhead() === "tail" ? 0 : link.getArrowheadWidth();
  const arrowtailWidth =
    link.getArrowtail() === "tail" ? 0 : link.getArrowtailWidth();

  const puffer = 1;

  const cx = link.getLinkCurvatureX();
  const cy = link.getLinkCurvatureY();

  let sourceX, sourceY, targetX, targetY;

  if (cx != null && cy != null) {
    const dx1 = cx - source.x;
    const dy1 = cy - source.y;
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const normX1 = dx1 / len1;
    const normY1 = dy1 / len1;

    sourceX =
      source.x +
      normX1 * (sourceRadius + sourceStrokeWidth + arrowtailWidth + puffer);
    sourceY =
      source.y +
      normY1 * (sourceRadius + sourceStrokeWidth + arrowtailWidth + puffer);

    const dx2 = cx - target.x;
    const dy2 = cy - target.y;
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const normX2 = dx2 / len2;
    const normY2 = dy2 / len2;

    targetX =
      target.x +
      normX2 * (targetRadius + targetStrokeWidth + arrowheadWidth + puffer);
    targetY =
      target.y +
      normY2 * (targetRadius + targetStrokeWidth + arrowheadWidth + puffer);

    return `M ${sourceX} ${sourceY} Q ${cx} ${cy} ${targetX} ${targetY}`;
  } else {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const normX = dx / length;
    const normY = dy / length;

    sourceX =
      source.x +
      normX * (sourceRadius + sourceStrokeWidth + arrowtailWidth + puffer);
    sourceY =
      source.y +
      normY * (sourceRadius + sourceStrokeWidth + arrowtailWidth + puffer);

    targetX =
      target.x -
      normX * (targetRadius + targetStrokeWidth + arrowheadWidth + puffer);
    targetY =
      target.y -
      normY * (targetRadius + targetStrokeWidth + arrowheadWidth + puffer);

    return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  }
}

//das mit der bezierkurve muss ich noch fixen, das geht immernoch nicht, aber sonst funktioniert gut
//also das muss ich mir nochmal angucken, so weit funktioniert erstmal alles
//aber dagitty benutzt diese kurve auch und die haben das selbe "problem"