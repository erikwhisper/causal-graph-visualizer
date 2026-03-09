import {
  GRID_SPACING_DEFAULT,
  GRID_SPACING_MIN,
  GRID_SPACING_MAX,
} from "./visualConstants.js";

export class GridManager {
  constructor(defaultSpacing = GRID_SPACING_DEFAULT, initiallyEnabled = false) {
    this.enabled = initiallyEnabled;
    this.spacing = defaultSpacing;
  }

  toggleGrid() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isGridEnabled() {
    return this.enabled;
  }

  getGridSpacing() {
    return this.spacing;
  }

  //Deadcode bis ich Nutzereingabe für Spacing hinzufüge
  setGridSpacing(spacing) {
    if (spacing < GRID_SPACING_MIN) {
      this.spacing = GRID_SPACING_MIN;
    } else if (spacing > GRID_SPACING_MAX) {
      this.spacing = GRID_SPACING_MAX;
    } else {
      this.spacing = spacing;
    }
  }
}
