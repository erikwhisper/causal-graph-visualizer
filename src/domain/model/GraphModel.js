import NodeModel from "./NodeModel.js";
import LinkModel from "./LinkModel.js";
export default class GraphModel {
  constructor() {
    this.nodes = [];
    this.links = [];
  }

  addNode(newNode) {
    const node = new NodeModel(
      newNode.nodeId,
      newNode.x,
      newNode.y,
      newNode.label,
      newNode.shape,
      newNode.radius,
      newNode.fillColor,
      newNode.strokeColor,
      newNode.strokeWidth,
      newNode.labelFontSize,
      newNode.labelOffsetX,
      newNode.labelOffsetY,
      newNode.labelColor
    );
    this.nodes.push(node);
  }

  addLink(newLink) {
    const link = new LinkModel(
      newLink.linkId,
      newLink.sourceNodeId,
      newLink.targetNodeId,
      newLink.arrowhead,
      newLink.arrowtail,
      newLink.arrowheadWidth,
      newLink.arrowtailWidth,
      newLink.arrowheadColor,
      newLink.arrowtailColor,
      newLink.strokeColor,
      newLink.strokeWidth,
      newLink.linkStyle,
      newLink.linkCurvatureX,
      newLink.linkCurvatureY
    );
    this.links.push(link);
  }

  setAllNodes(nodes) {
    this.nodes = [];
    nodes.forEach((node) => this.addNode(node));
  }

  setAllLinks(links) {
    this.links = [];
    links.forEach((link) => this.addLink(link));
  }

  setEverything({ nodes, links }) {
    this.setAllNodes(nodes);
    this.setAllLinks(links);
  }

  getNodeById(nodeId) {
    return this.nodes.find((node) => node.nodeId === nodeId);
  }

  getLinkById(linkId) {
    return this.links.find((link) => link.linkId === linkId);
  }

  getAllNodes() {
    return [...this.nodes];
  }

  getAllLinks() {
    return [...this.links];
  }

  getEverything() {
    return {
      nodes: this.getAllNodes(),
      links: this.getAllLinks(),
    };
  }

  deleteNode(nodeId) {
    this.nodes = this.nodes.filter((node) => node.nodeId !== nodeId);
    this.links = this.links.filter(
      (link) => link.sourceNodeId !== nodeId && link.targetNodeId !== nodeId
    );
  }

  deleteLink(linkId) {
    this.links = this.links.filter((link) => link.linkId !== linkId);
  }

  deleteEverything() {
    this.nodes = [];
    this.links = [];
  }
}
