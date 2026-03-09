export class GraphHistoryManager {
  constructor(initialGraphData, maxSize = 100) {
    this.past = [];
    this.present = structuredClone(initialGraphData);
    this.future = [];
    this.maxSize = maxSize;
  }

  setNewState(newGraphData) {
    this.past.push(structuredClone(this.present));
    if (this.past.length > this.maxSize) {
      this.past.shift();
    }
    this.present = structuredClone(newGraphData);
    this.future = [];
  }

  undo() {
    if (this.past.length === 0) return;
    this.future.unshift(structuredClone(this.present));
    this.present = this.past.pop();
  }

  redo() {
    if (this.future.length === 0) return;
    this.past.push(structuredClone(this.present));
    this.present = this.future.shift();
  }

  getState() {
    return structuredClone(this.present);
  }
}