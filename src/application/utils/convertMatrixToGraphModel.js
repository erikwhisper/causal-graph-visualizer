import GraphModel from "../../domain/model/GraphModel.js";

//Mögliche Verbesserungen an der Matrix eingabe.
//(1.)
//Man könnte sich anschauen was der löngste Labelname ist und basierend daruaf einen
//Knoten Radius berechnen den man dann für alle Knoten setzen, so das bei jedem Knoten
//der Text/Label auf jeden Fall innerhalb des Radius ist.

const edgePairMap = {
  /*----------Keine Kante----------*/
  "0_0": [],

  /*----------PAG (eine Kante)----------*/
  "1_1": [{ arrowhead: "odot", arrowtail: "odot" }],
  "1_2": [{ arrowhead: "odot", arrowtail: "normal" }],
  "1_3": [{ arrowhead: "odot", arrowtail: "tail" }],
  "2_1": [{ arrowhead: "normal", arrowtail: "odot" }],
  "2_2": [{ arrowhead: "normal", arrowtail: "normal" }],
  "2_3": [{ arrowhead: "normal", arrowtail: "tail" }],
  "3_1": [{ arrowhead: "tail", arrowtail: "odot" }],
  "3_2": [{ arrowhead: "tail", arrowtail: "normal" }],
  "3_3": [{ arrowhead: "tail", arrowtail: "tail" }],

  /*----------ADMG(bidirektionale + gerichtete Kante)----------*/
  "4_5": [
    { arrowhead: "normal", arrowtail: "normal", linkStyle: "dashed" },
    { arrowhead: "normal", arrowtail: "tail" },
  ],
  "5_4": [
    { arrowhead: "normal", arrowtail: "normal", linkStyle: "dashed" },
    { arrowhead: "tail", arrowtail: "normal" },
  ],
};

export function convertMatrixToGraphModel(text) {
  const lines = text.trim().split(/\r?\n/);

  //knoten anlegen
  const nodeLabels = lines[0]
    .split(",")
    .slice(1)
    .map((label) => {
      const trimmed = label.trim();
      return trimmed.startsWith('"') && trimmed.endsWith('"')
        ? trimmed.slice(1, -1)
        : trimmed;
    });

  const tempGraph = new GraphModel();
  nodeLabels.forEach((label) => tempGraph.addNode({ label }));

  const nodes = tempGraph.getAllNodes();
  const getNodeIdByLabel = (label) =>
    nodes.find((node) => node.label === label)?.nodeId; //is das ? hier noch notwendig?

  //Kanten erzeugen
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    const fromLabel = row[0].replace(/"/g, "").trim();
    const fromNodeId = getNodeIdByLabel(fromLabel);

    for (let j = i + 1; j < row.length; j++) {
      const toLabel = nodeLabels[j - 1];
      const toNodeId = getNodeIdByLabel(toLabel);

      //10 für dezimal
      const v1 = parseInt(row[j], 10); // i -> j
      const v2 = parseInt(lines[j].split(",")[i], 10); // j -> i

      if (v1 === 0 && v2 === 0) continue;

      const pairKey = `${v1}_${v2}`;
      const specs = edgePairMap[pairKey];

      //entweder hier lassen oder nochmal mit boiler code in validateMatrixForMatrixImport.js
      //als eigene hilfsdatei moven, aber lowkey overkill
      //eigentlich kann der check hier jetzt weg, da wir ihn in validateMatrix Funktion
      //bereits implementiert haben.
      if (!specs) {
        console.error(
          `Ungültige Kombination: zwischen "${fromLabel}"=${v1} und "${toLabel}"=${v2}.`
        );
        return { nodes: [], links: [] };
      }

      if (specs && specs.length) {
        specs.forEach((spec) =>
          tempGraph.addLink({
            sourceNodeId: fromNodeId,
            targetNodeId: toNodeId,
            arrowhead: spec.arrowhead,
            arrowtail: spec.arrowtail,
            linkStyle: spec.linkStyle ?? "solid",
          })
        );
      }
    }
  }

  return { nodes, links: tempGraph.getAllLinks() };
}
