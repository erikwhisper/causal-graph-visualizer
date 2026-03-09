import * as uuid from "https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm";
import {
  LINK_DEFAULT_ARROWHEAD,
  LINK_DEFAULT_ARROWTAIL,
  LINK_DEFAULT_ARROWHEAD_WIDTH,
  LINK_DEFAULT_ARROWTAIL_WIDTH,
  LINK_DEFAULT_ARROWHEAD_COLOR,
  LINK_DEFAULT_ARROWTAIL_COLOR,
  LINK_DEFAULT_STROKE_COLOR,
  LINK_DEFAULT_STROKE_WIDTH,
  LINK_DEFAULT_STYLE,
  LINK_ARROW_WIDTH_MIN,
  LINK_STROKE_WIDTH_MIN,
} from "../../utils/defaultValues.js";

export default class LinkModel {
  constructor(
    linkId = uuid.v4(),
    sourceNodeId,
    targetNodeId,
    arrowhead = LINK_DEFAULT_ARROWHEAD,
    arrowtail = LINK_DEFAULT_ARROWTAIL,
    arrowheadWidth = LINK_DEFAULT_ARROWHEAD_WIDTH,
    arrowtailWidth = LINK_DEFAULT_ARROWTAIL_WIDTH,
    arrowheadColor = LINK_DEFAULT_ARROWHEAD_COLOR,
    arrowtailColor = LINK_DEFAULT_ARROWTAIL_COLOR,
    strokeColor = LINK_DEFAULT_STROKE_COLOR,
    strokeWidth = LINK_DEFAULT_STROKE_WIDTH,
    linkStyle = LINK_DEFAULT_STYLE,
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
    if (arrowheadWidth < LINK_ARROW_WIDTH_MIN) {
      this.arrowheadWidth = LINK_ARROW_WIDTH_MIN;
    } else {
      this.arrowheadWidth = arrowheadWidth;
    }
  }

  setArrowtailWidth(arrowtailWidth) {
    if (arrowtailWidth < LINK_ARROW_WIDTH_MIN) {
      this.arrowtailWidth = LINK_ARROW_WIDTH_MIN;
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
    if (strokeWidth < LINK_STROKE_WIDTH_MIN) {
      this.strokeWidth = LINK_STROKE_WIDTH_MIN;
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
