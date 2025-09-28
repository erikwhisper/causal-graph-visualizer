let gridEnabled = false;
const gridSpacing = 50; //lowkey unnötig hier

export function toggleGrid() {
  gridEnabled = !gridEnabled;
  return gridEnabled; //return value eig unnötig
}

export function isGridEnabled() {
  return gridEnabled;
}

export function getGridSpacing() {
  return gridSpacing;
}
