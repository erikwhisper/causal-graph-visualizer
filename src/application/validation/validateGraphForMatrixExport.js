//hier kann ich dann theoretisch die fehlercheckings machen ob überhaupt in eine
//matrix umgewandelt werden kann, oder auch eine ebene höher, das geht ja nicht wenn
//(1.)Labels mehrfach vorkommen, da matrix nur eindeutige Knotennamen darstellen kann.
//(2.)Mehr als 2 Kanten zwischen zwei Knoten
//(3.)Wenn 2 Kanten zwischen zwei Knoten dann nur genau eine bidirektionale (gestrichelt) Kante
//und genau eine gerichetete Kante
//

//---------------------------------------------------//

//Okay, man kann das ganze jetzt noch in jeweils eine Hilfsfunktion pro Errorcase
//unterteilen und dann gib ihm, passt so.
//Dann kann man auch leicht neue validations hinzufügen falls einem noch welche einfallen

export function validateGraphForMatrixExport(graphData) {
  const { nodes, links } = graphData;

  //doppelte labels
  const labelSet = new Set();
  nodes.forEach((n) => {
    if (labelSet.has(n.label))
      throw new Error(
        `Label "${n.label}" kommt mehrfach vor, Matrix verlangt eindeutige Knotennamen.`
      );
    labelSet.add(n.label);
  });

  //links pro knotenpar sammeln
  const pairMap = new Map(); // "minId-maxId" → Link[]
  links.forEach((l) => {
    const a = l.sourceNodeId < l.targetNodeId ? l.sourceNodeId : l.targetNodeId;
    const b = l.sourceNodeId < l.targetNodeId ? l.targetNodeId : l.sourceNodeId;
    const key = `${a}-${b}`;
    (pairMap.get(key) ?? pairMap.set(key, []).get(key)).push(l);
  });

  //paar regeln pruefen
  pairMap.forEach((pairLinks) => {
    if (pairLinks.length > 2) {
      throw new Error(
        "Mehr als zwei Kanten zwischen denselben Knoten, Matrix kann das nicht darstellen."
      );
    }

    if (pairLinks.length === 2) {
      const [l1, l2] = pairLinks;
      const isBidirectionalDashed =
        (l1.linkStyle === "dashed" &&
          l1.arrowhead === "normal" &&
          l1.arrowtail === "normal") ||
        (l2.linkStyle === "dashed" &&
          l2.arrowhead === "normal" &&
          l2.arrowtail === "normal");

      const isSingleDirected =
        (l1.linkStyle !== "dashed" &&
          ((l1.arrowhead === "normal" && l1.arrowtail === "tail") ||
            (l1.arrowhead === "tail" && l1.arrowtail === "normal"))) ||
        (l2.linkStyle !== "dashed" &&
          ((l2.arrowhead === "normal" && l2.arrowtail === "tail") ||
            (l2.arrowhead === "tail" && l2.arrowtail === "normal")));

      if (!(isBidirectionalDashed && isSingleDirected)) {
        throw new Error(
          "Bei zwei Kanten muss genau eine bidiektionale Kante <-> (dashed, normal/normal) und eine gerichtete Kante -> / <- (normal,tail | tail,normal) existieren."
        );
      }
    }
  });
}
