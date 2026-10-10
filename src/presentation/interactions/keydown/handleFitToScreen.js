import { fitToScreen } from "../../../application/layout/utils/fitToScreen.js";
import { FIT_TO_SCREEN_DURATION } from "../../../utils/visualConstants.js";

export function handleFitToScreen(svg) {
  fitToScreen(svg, { duration: FIT_TO_SCREEN_DURATION });
}
