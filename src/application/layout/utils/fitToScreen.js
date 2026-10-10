import * as d3 from "d3";
import { setCanvasTransform } from "../../../presentation/interactions/zoom/registerCanvasNavigation.js";
import {
  FIT_TO_SCREEN_PADDING,
  FIT_TO_SCREEN_MAX_SCALE,
} from "../../../utils/visualConstants.js";

export function fitToScreen(svg, { duration = 0 } = {}) {
  const viewport = svg.select("#viewport");
  if (viewport.empty()) return;

  const bbox = viewport.node().getBBox();
  if (bbox.width === 0 && bbox.height === 0) return;

  const width = svg.node().clientWidth;
  const height = svg.node().clientHeight;
  if (!width || !height) return;

  const availableWidth = Math.max(width - 2 * FIT_TO_SCREEN_PADDING, 1);
  const availableHeight = Math.max(height - 2 * FIT_TO_SCREEN_PADDING, 1);

  const scale = Math.min(
    availableWidth / Math.max(bbox.width, 1),
    availableHeight / Math.max(bbox.height, 1),
    FIT_TO_SCREEN_MAX_SCALE,
  );

  const centerX = bbox.x + bbox.width / 2;
  const centerY = bbox.y + bbox.height / 2;

  const transform = d3.zoomIdentity
    .translate(width / 2 - scale * centerX, height / 2 - scale * centerY)
    .scale(scale);

  setCanvasTransform(svg, transform, duration);
}
