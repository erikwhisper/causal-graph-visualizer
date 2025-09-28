import { updateLabelVisual } from "../../../visualization/update/updateLabelVisual.js";
import { updateLinkVisual } from "../../../visualization/update/updateLinkVisual.js";
import { updateNodeVisual } from "../../../visualization/update/updateNodeVisual.js";
import { updateVisualStyles } from "../../../visualization/update/updateVisualStyles.js";
import { isGridEnabled, getGridSpacing } from "../../utils/GridManager.js";
import * as d3 from "d3";

//TODO 1: Gucken wo ich die Hilfsfunktionen unterbringe am besten.

//TODO 2: Für handleLinkDrag auch alles aufteilen.

//TODO 3: Hier in Zukunft noch den HistoryManager iwie korrekt einbauen.

export function handleNodeDrag(svg, graph, links, graphHistory) {
  return d3
    .drag()
    .on("start", function (event, d) {
      d.wasDragged = false;
      d.initalX = event.x;
      d.initalY = event.y;
    })
    .on("drag", function (event, d) {
      d.wasDragged = true;
      const dx = event.x - d.initalX;
      const dy = event.y - d.initalY;

      //Auswahl-Funktionen
      const nodesToMove = getDraggedNodes(graph, d);
      const movedNodeIds = new Set(nodesToMove.map((n) => n.getNodeId()));
      const linksToUpdate = getAffectedLinks(links, movedNodeIds);

      //Zustands-Aenderungs-Funktionen
      moveNodes(nodesToMove, dx, dy);
      moveLinkCurvatures(linksToUpdate, dx, dy);

      //Visualisierungs-Funktionen
      updateNodeVisuals(nodesToMove, svg, graph);
      updateLinkVisuals(linksToUpdate, svg, graph);
      updateLabelVisuals(nodesToMove, svg);

      //expertimental, maybe move into updateNodeVisual for nodes and updateLinkVisual for links...
      updateVisualStyles(svg, graph);

      d.initalX = event.x;
      d.initalY = event.y;
    })
    .on("end", function (event, d) {
      if (!d.wasDragged) return;
      //hier NICHT "!isGridEnabled()", denn in zukunft will
      //ich hier ja auch den historyManager einbauen, der braucht auch "end", auch
      //wenn das grid nicht aktiviert ist!

      if (isGridEnabled()) {
        //Auswahl-Funktionen
        const nodesToSnap = getDraggedNodes(graph, d);
        const movedNodeIds = new Set(nodesToSnap.map((n) => n.getNodeId()));
        const linksToUpdate = getAffectedLinks(links, movedNodeIds);

        //Zustands-Aenderungs-Funktionen
        const snapDeltas = snapNodePositionsToGrid(nodesToSnap);
        applySnapToLinkCurvatures(linksToUpdate, movedNodeIds, snapDeltas);

        //Visualisierungs-Funktionen
        updateNodeVisuals(nodesToSnap, svg, graph);
        updateLinkVisuals(linksToUpdate, svg, graph);
        updateLabelVisuals(nodesToSnap, svg);

        //expertimental, maybe move into updateNodeVisual for nodes and updateLinkVisual for links...
        updateVisualStyles(svg, graph);
      }

      graphHistory.setNewState(graph.getEverything());
    });
}

//-------------------Auswahl-Funktionen---------------------//

export function getDraggedNodes(graph, draggedNode) {
  const highlightedNodes = graph
    .getAllNodes()
    .filter((n) => n.getHighlighted());
  const nodesToMove =
    highlightedNodes.length > 0 ? highlightedNodes : [draggedNode];
  return nodesToMove;
}

export function getAffectedLinks(links, movedNodeIds) {
  return links.filter(
    (link) =>
      movedNodeIds.has(link.getSourceNodeId()) ||
      movedNodeIds.has(link.getTargetNodeId())
  );
}

//-------------------Auswahl-Funktionen---------------------//

//----------------------------------------------------//

//---------------Zustands-Aenderungs-Funktionen-------------------//

export function moveNodes(nodes, dx, dy) {
  nodes.forEach((node) => {
    const newX = node.getXValue() + dx;
    const newY = node.getYValue() + dy;
    node.setXValue(newX);
    node.setYValue(newY);
  });
}

export function moveLinkCurvatures(links, dx, dy) {
  links.forEach((link) => {
    if (link.getLinkCurvatureX() != null && link.getLinkCurvatureY() != null) {
      link.setLinkCurvatureX(link.getLinkCurvatureX() + dx);
      link.setLinkCurvatureY(link.getLinkCurvatureY() + dy);
    }
  });
}

export function snapNodePositionsToGrid(nodes) {
  const spacing = getGridSpacing();
  const deltas = new Map();

  nodes.forEach((node) => {
    const oldX = node.getXValue();
    const oldY = node.getYValue();

    const snappedX = Math.round(oldX / spacing) * spacing;
    const snappedY = Math.round(oldY / spacing) * spacing;

    const dx = snappedX - oldX;
    const dy = snappedY - oldY;

    node.setXValue(snappedX);
    node.setYValue(snappedY);

    deltas.set(node.getNodeId(), { dx: dx, dy: dy });
  });

  return deltas;
}

export function applySnapToLinkCurvatures(links, movedNodeIds, snapDeltas) {
  links.forEach((link) => {
    const sourceId = link.getSourceNodeId();
    const targetId = link.getTargetNodeId();
    const sourceMoved = movedNodeIds.has(sourceId);
    const targetMoved = movedNodeIds.has(targetId);

    if (
      (sourceMoved || targetMoved) &&
      link.getLinkCurvatureX() != null &&
      link.getLinkCurvatureY() != null
    ) {
      let dx = 0,
        dy = 0;

      if (sourceMoved && targetMoved) {
        const d1 = snapDeltas.get(sourceId);
        const d2 = snapDeltas.get(targetId);
        dx = (d1.dx + d2.dx) / 2;
        dy = (d1.dy + d2.dy) / 2;
      } else if (sourceMoved) {
        ({ dx, dy } = snapDeltas.get(sourceId));
      } else if (targetMoved) {
        ({ dx, dy } = snapDeltas.get(targetId));
      }

      link.setLinkCurvatureX(link.getLinkCurvatureX() + dx);
      link.setLinkCurvatureY(link.getLinkCurvatureY() + dy);
    }
  });
}

//---------------Zustands-Aenderungs-Funktionen-------------------//

//----------------------------------------------------//

//----------Visualisierungs-Funktionen-----------//

export function updateNodeVisuals(nodes, svg, graph) {
  nodes.forEach((node) => updateNodeVisual(node, svg, graph));
}

export function updateLinkVisuals(links, svg, graph) {
  links.forEach((link) => updateLinkVisual(link, svg, graph));
}

export function updateLabelVisuals(nodes, svg) {
  nodes.forEach((node) => updateLabelVisual(node, svg));
}

//----------Visualisierungs-Funktionen-----------//
