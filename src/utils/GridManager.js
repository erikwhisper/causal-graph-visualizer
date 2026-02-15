export class GridManager {
  constructor(defaultSpacing = 50, initiallyEnabled = false) {
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
    if (spacing < 5) {
      this.spacing = 5;
    } else if (spacing > 200) {
      this.spacing = 200;
    } else {
      this.spacing = spacing;
    }
  }
}
