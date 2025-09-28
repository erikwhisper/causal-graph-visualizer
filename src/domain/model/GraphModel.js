import NodeModel from "./NodeModel.js";
import LinkModel from "./LinkModel.js";
export default class GraphModel {
  constructor() {
    this.nodes = [];
    this.links = [];
  }

  //check ob nodeId schon verhanden, falls ja neue generieren.
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

  //check ob linkId schon verhanden, falls ja neue generieren.
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
    this.nodes = []; //erst alles löschen //aner idk ob das notwendig ist
    nodes.forEach((node) => this.addNode(node));
  }

  setAllLinks(links) {
    this.links = []; //erst alles löschen //aber idk ob das notwendig ist
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

  //man könnte in deleteNode auch deleteLink aufrufen aber whatever tbh
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
