import * as uuid from "https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm";

export default class LinkModel {
  constructor(
    linkId = uuid.v4(), //validierung needed das es vorhanden es sonst exception
    sourceNodeId, //validierung needed das es vorhanden es sonst exception
    targetNodeId, //validierung needed das es vorhanden es sonst exception
    arrowhead = "normal",
    arrowtail = "tail",
    arrowheadWidth = 10,
    arrowtailWidth = 10,
    arrowheadColor = "black",
    arrowtailColor = "black",
    strokeColor = "black",
    strokeWidth = 2,
    linkStyle = "solid",
    linkCurvatureX = null,
    linkCurvatureY = null,
    highlighted = false
  ) {
    this.linkId = linkId;
    this.sourceNodeId = sourceNodeId;
    this.targetNodeId = targetNodeId;

    this.arrowhead = arrowhead;
    this.arrowtail = arrowtail;
    this.arrowheadWidth = arrowheadWidth;
    this.arrowtailWidth = arrowtailWidth;
    this.arrowheadColor = arrowheadColor;
    this.arrowtailColor = arrowtailColor;

    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.linkStyle = linkStyle;

    this.linkCurvatureX = linkCurvatureX;
    this.linkCurvatureY = linkCurvatureY;

    this.highlighted = highlighted;
  }

  //Setter
  setLinkId(linkId) {
    this.linkId = linkId;
  }

  setSourceNodeId(sourceNodeId) {
    this.sourceNodeId = sourceNodeId;
  }

  setTargetNodeId(targetNodeId) {
    this.targetNodeId = targetNodeId;
  }

  setArrowhead(arrowheadType) {
    this.arrowhead = arrowheadType;
  }

  setArrowtail(arrowtailType) {
    this.arrowtail = arrowtailType;
  }

  setArrowheadWidth(arrowheadWidth) {
    if (arrowheadWidth < 5) {
      this.arrowheadWidth = 5;
    } else {
      this.arrowheadWidth = arrowheadWidth;
    }
  }

  setArrowtailWidth(arrowtailWidth) {
    if (arrowtailWidth < 5) {
      this.arrowtailWidth = 5;
    } else {
      this.arrowtailWidth = arrowtailWidth;
    }
  }

  setArrowheadColor(arrowheadColor) {
    this.arrowheadColor = arrowheadColor;
  }

  setArrowtailColor(arrowtailColor) {
    this.arrowtailColor = arrowtailColor;
  }

  setStrokeColor(strokeColor) {
    this.strokeColor = strokeColor;
  }

  setStrokeWidth(strokeWidth) {
    if (strokeWidth < 1) {
      this.strokeWidth = 1;
    } else {
      this.strokeWidth = strokeWidth;
    }
  }

  setLinkStyle(linkStyle) {
    this.linkStyle = linkStyle;
  }

  setLinkCurvatureX(linkCurvatureX) {
    this.linkCurvatureX = linkCurvatureX;
  }

  setLinkCurvatureY(linkCurvatureY) {
    this.linkCurvatureY = linkCurvatureY;
  }

  setLinkCurvature(linkCurvatureX, linkCurvatureY) {
    this.linkCurvatureX = linkCurvatureX;
    this.linkCurvatureY = linkCurvatureY;
  }

  setAllWidths(width) {
    this.setStrokeWidth(width);
    this.setArrowheadWidth(width);
    this.setArrowtailWidth(width);
  }

  setAllColors(color) {
    this.setStrokeColor(color);
    this.setArrowheadColor(color);
    this.setArrowtailColor(color);
  }

  setHighlighted(state) {
    this.highlighted = state;
  }

  //Getter
  getLinkId() {
    return this.linkId;
  }

  getSourceNodeId() {
    return this.sourceNodeId;
  }

  getTargetNodeId() {
    return this.targetNodeId;
  }

  getArrowhead() {
    return this.arrowhead;
  }

  getArrowtail() {
    return this.arrowtail;
  }

  getArrowheadWidth() {
    return this.arrowheadWidth;
  }

  getArrowtailWidth() {
    return this.arrowtailWidth;
  }

  getArrowheadColor() {
    return this.arrowheadColor;
  }

  getArrowtailColor() {
    return this.arrowtailColor;
  }

  getStrokeColor() {
    return this.strokeColor;
  }

  getStrokeWidth() {
    return this.strokeWidth;
  }

  getLinkStyle() {
    return this.linkStyle;
  }

  getLinkCurvatureX() {
    return this.linkCurvatureX;
  }

  getLinkCurvatureY() {
    return this.linkCurvatureY;
  }

  getCurvature() {
    return {
      linkCurvatureX: this.getLinkCurvatureX(),
      linkCurvatureY: this.getLinkCurvatureY(),
    };
  }

  getHighlighted() {
    return this.highlighted;
  }
}
