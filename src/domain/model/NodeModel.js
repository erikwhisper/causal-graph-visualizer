import * as uuid from "https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm";

export default class NodeModel {
  constructor(
    nodeId = uuid.v4(),
    x = 100,
    y = 100,
    label = "undefined",
    shape = "circle",
    radius = 15,
    fillColor = "white",
    strokeColor = "black",
    strokeWidth = 1.5,
    labelFontSize = 15,
    labelOffsetX = 0,
    labelOffsetY = 0,
    labelColor = "black",
    highlighted = false
  ) {
    this.nodeId = nodeId;
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.radius = radius;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;

    this.highlighted = highlighted;

    //--------------------------

    this.label = label;
    this.labelFontSize = labelFontSize;
    this.labelOffsetX = labelOffsetX;
    this.labelOffsetY = labelOffsetY;
    this.labelColor = labelColor;
  }

  setNodeId(nodeId) {
    this.nodeId = nodeId;
  }

  setXValue(x) {
    this.x = x;
  }

  setYValue(y) {
    this.y = y;
  }

  setPosition(x, y) {
    this.setXValue(x);
    this.setYValue(y);
  }

  setShape(shape) {
    this.shape = shape;
  }

  setRadius(radius) {
    if (radius < 5) {
      this.radius = 5;
    } else if (radius > 500) {
      this.radius = 500;
    } else {
      this.radius = radius;
    }
  }

  setFillColor(fillColor) {
    this.fillColor = fillColor;
  }

  setStrokeColor(strokeColor) {
    this.strokeColor = strokeColor;
  }

  setStrokeWidth(strokeWidth) {
    this.strokeWidth = strokeWidth;
  }

  setHighlighted(state) {
    this.highlighted = state;
  }

  getNodeId() {
    return this.nodeId;
  }

  getXValue() {
    return this.x;
  }

  getYValue() {
    return this.y;
  }

  getPosition() {
    return { x: this.getXValue(), y: this.getYValue() };
  }

  getShape() {
    return this.shape;
  }

  getRadius() {
    return this.radius;
  }

  getFillColor() {
    return this.fillColor;
  }

  getStrokeColor() {
    return this.strokeColor;
  }

  getStrokeWidth() {
    return this.strokeWidth;
  }

  getHighlighted() {
    return this.highlighted;
  }

  //--------------------------

  setLabel(newLabel) {
    this.label = newLabel;
  }

  setLabelFontSize(labelFontSize) {
    this.labelFontSize = labelFontSize;
  }

  setLabelOffsetX(labelOffsetX) {
    this.labelOffsetX = labelOffsetX;
  }

  setLabelOffsetY(labelOffsetY) {
    this.labelOffsetY = labelOffsetY;
  }

  setLabelPosition(labelOffsetX, labelOffsetY) {
    this.setLabelOffsetX(labelOffsetX);
    this.setLabelOffsetY(labelOffsetY);
  }

  setLabelColor(labelColor) {
    this.labelColor = labelColor;
  }

  getLabel() {
    return this.label;
  }

  getLabelFontSize() {
    return this.labelFontSize;
  }

  getLabelOffsetX() {
    return this.labelOffsetX;
  }

  getLabelOffsetY() {
    return this.labelOffsetY;
  }

  getLabelPosition() {
    return {
      labelOffsetX: this.getLabelOffsetX(),
      labelOffsetY: this.getLabelOffsetY(),
    };
  }

  getLabelColor() {
    return this.labelColor;
  }
}
