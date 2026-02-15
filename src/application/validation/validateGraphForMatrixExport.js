import { checkForDuplicateLabels } from "./checks/checkForDuplicateLabels.js";
import { groupLinksByPair } from "./utils/groupLinksByPair.js";
import { checkMaxTwoEdgesPerPair } from "./checks/checkMaxTwoEdgesPerPair.js";
import { checkDualEdgeConfiguration } from "./checks/checkDualEdgeConfiguration.js";

export function validateGraphForMatrixExport(graphData) {
  const { nodes, links } = graphData;

  checkForDuplicateLabels(nodes);

  const nodeLabels = new Map(nodes.map((n) => [n.nodeId, n.label]));
  const linkPairs = groupLinksByPair(links);

  checkMaxTwoEdgesPerPair(linkPairs, nodeLabels);
  checkDualEdgeConfiguration(linkPairs, nodeLabels);
}
