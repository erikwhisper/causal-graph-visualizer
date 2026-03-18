import * as uuid from "https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm";
import {
  NODE_DEFAULT_X,
  NODE_DEFAULT_Y,
  NODE_DEFAULT_LABEL,
  NODE_DEFAULT_SHAPE,
  NODE_DEFAULT_RADIUS,
  NODE_DEFAULT_FILL_COLOR,
  NODE_DEFAULT_STROKE_COLOR,
  NODE_DEFAULT_STROKE_WIDTH,
  NODE_DEFAULT_LABEL_FONT_SIZE,
  NODE_DEFAULT_LABEL_OFFSET_X,
  NODE_DEFAULT_LABEL_OFFSET_Y,
  NODE_DEFAULT_LABEL_COLOR,
  NODE_DEFAULT_LABEL_FONT_FAMILY,
  NODE_RADIUS_MIN,
  NODE_RADIUS_MAX,
} from "../../utils/defaultValues.js";

export default class NodeModel {
  constructor(
    nodeId = uuid.v4(),
    x = NODE_DEFAULT_X,
    y = NODE_DEFAULT_Y,
    label = NODE_DEFAULT_LABEL,
    shape = NODE_DEFAULT_SHAPE,
    radius = NODE_DEFAULT_RADIUS,
    fillColor = NODE_DEFAULT_FILL_COLOR,
    strokeColor = NODE_DEFAULT_STROKE_COLOR,
    strokeWidth = NODE_DEFAULT_STROKE_WIDTH,
    labelFontSize = NODE_DEFAULT_LABEL_FONT_SIZE,
    labelOffsetX = NODE_DEFAULT_LABEL_OFFSET_X,
    labelOffsetY = NODE_DEFAULT_LABEL_OFFSET_Y,
    labelColor = NODE_DEFAULT_LABEL_COLOR,
    labelFontFamily = NODE_DEFAULT_LABEL_FONT_FAMILY,
    highlighted = false,
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

    this.label = label;
    this.labelFontSize = labelFontSize;
    this.labelOffsetX = labelOffsetX;
    this.labelOffsetY = labelOffsetY;
    this.labelColor = labelColor;
    this.labelFontFamily = labelFontFamily;
  }

 // Node related methods

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
    if (radius < NODE_RADIUS_MIN) {
      this.radius = NODE_RADIUS_MIN;
    } else if (radius > NODE_RADIUS_MAX) {
      this.radius = NODE_RADIUS_MAX;
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

  // Label related methods

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

  setLabelFontFamily(fontFamily) {
    this.labelFontFamily = fontFamily;
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

  getLabelFontFamily() {
    return this.labelFontFamily;
  }
}
