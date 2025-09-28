//----------EXPERIMENTAL LAYOUT--------//
import * as d3 from "d3";
import { isGridEnabled } from "../../presentation/utils/GridManager.js";
import { getGridSpacing } from "../../presentation/utils/GridManager.js";

export function layoutHierarchical(nodes, links, width, height) {
  const depthMap = computeDepthMap(nodes, links);
  const simNodes = simulateLayout(nodes, links, depthMap, width, height);
  const normalizedNodes = rescaleToCanvas(simNodes, width, height);
  applyLayoutToNodes(normalizedNodes, nodes);
  applyCurvatureOffsets(links, normalizedNodes);
}

//Node Depth mit topological traversal (Kahns algorithm) berechnen
function computeDepthMap(nodes, links) {
  const incoming = new Map(nodes.map((n) => [n.nodeId, []]));
  links.forEach((l) => incoming.get(l.targetNodeId).push(l.sourceNodeId));

  const depth = {};
  const queue = [];

  nodes.forEach((n) => {
    if (!incoming.get(n.nodeId).length) {
      depth[n.nodeId] = 0;
      queue.push(n.nodeId);
    }
  });

  while (queue.length) {
    const u = queue.shift();
    links
      .filter((l) => l.sourceNodeId === u)
      .forEach((l) => {
        const v = l.targetNodeId;
        const d = (depth[u] || 0) + 1;
        if (depth[v] === undefined || d > depth[v]) {
          depth[v] = d;
          queue.push(v);
        }
      });
  }

  return depth;
}

//Layout mit D3 force simulation simulieren
function simulateLayout(nodes, links, depthMap, width, height) {
  const maxDepth = Math.max(...Object.values(depthMap));
  const layerSpacing = maxDepth > 0 ? height / (maxDepth + 1) : height / 2;

  const simNodes = nodes.map((n) => ({ ...n, id: n.nodeId }));
  const simLinks = links.map((l) => ({
    source: l.sourceNodeId,
    target: l.targetNodeId,
  }));

  const simulation = d3
    .forceSimulation(simNodes)
    .force(
      "link",
      d3
        .forceLink(simLinks)
        .id((d) => d.id)
        .distance(80)
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force(
      "y",
      d3
        .forceY((d) => (depthMap[d.id] || 0) * layerSpacing + layerSpacing / 2)
        .strength(1)
    )
    .force("x", d3.forceX(width / 2).strength(0.1))
    .force(
      "collide",
      d3.forceCollide().radius((d) => d.radius + 5)
    )
    .stop();

  for (let i = 0; i < 100; ++i) simulation.tick();

  return simNodes;
}

//Simulation resaclen damit alles auf canvas passt.
function rescaleToCanvas(simNodes, width, height) {
  const xs = simNodes.map((n) => n.x);
  const ys = simNodes.map((n) => n.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const marginX = width * 0.1;
  const marginY = height * 0.1;

  return simNodes.map((d) => {
    const nx = maxX > minX ? (d.x - minX) / (maxX - minX) : 0.5;
    const ny = maxY > minY ? (d.y - minY) / (maxY - minY) : 0.5;

    let x = marginX + nx * (width - 2 * marginX);
    let y = marginY + ny * (height - 2 * marginY);

    if (isGridEnabled()) {
      const spacing = getGridSpacing();
      x = Math.round(x / spacing) * spacing;
      y = Math.round(y / spacing) * spacing;
    }

    return { id: d.id, x, y };
  });
}

//berechnete position auf "richtiges" nodeModel uebertragen
function applyLayoutToNodes(positionedNodes, originalNodes) {
  positionedNodes.forEach((p) => {
    const node = originalNodes.find((n) => n.nodeId === p.id);
    if (node) {
      node.setXValue(p.x);
      node.setYValue(p.y);
    }
  });
}

//Curvature fuer doppelte links hinzufuegen
function applyCurvatureOffsets(links, positionedNodes) {
  const nodeMap = new Map(positionedNodes.map((n) => [n.id, n]));
  const linkGroups = new Map();

  links.forEach((link) => {
    const key = [link.sourceNodeId, link.targetNodeId].sort().join("_");
    if (!linkGroups.has(key)) linkGroups.set(key, []);
    linkGroups.get(key).push(link);
  });

  linkGroups.forEach((group) => {
    if (group.length < 2) return;

    const hasDirected = group.some(
      (l) => !l.linkStyle || l.linkStyle !== "dashed"
    );
    const hasBidirected = group.some(
      (l) => l.linkStyle && l.linkStyle === "dashed"
    );

    if (!(hasDirected && hasBidirected)) return;

    const curved = group.filter((l) => l.linkStyle === "dashed");

    curved.forEach((link, index) => {
      const source = nodeMap.get(link.sourceNodeId);
      const target = nodeMap.get(link.targetNodeId);
      if (!source || !target) return;

      const mx = (source.x + target.x) / 2;
      const my = (source.y + target.y) / 2;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) return;

      const nx = -dy / len;
      const ny = dx / len;
      const spacing = 100;
      const offset = (index + 1) * spacing;

      link.linkCurvatureX = mx + offset * nx;
      link.linkCurvatureY = my + offset * ny;
    });
  });
}
