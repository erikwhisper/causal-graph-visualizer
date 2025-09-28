export class GraphHistoryManager {
  constructor(initialGraphData) {
    this.past = [];
    this.present = structuredClone(initialGraphData);
    this.future = [];
  }

  setNewState(newGraphData) {
    this.past.push(structuredClone(this.present));
    this.present = structuredClone(newGraphData);
    this.future = [];
  }

  /*
  setNewState(newGraphData) {
    // Prüfen: identisch mit current present?
    if (
      JSON.stringify(structuredClone(newGraphData)) ===
      JSON.stringify(this.present)
    ) {
      return; // nichts tun, keine Duplikate speichern
    }

    this.past.push(structuredClone(this.present));
    this.present = structuredClone(newGraphData);
    this.future = [];
  }
*/

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

//Hier eine obergrenze von idk 20 states einführen, danach wird der älteste gelöscht immer
//Weil iwann geht perfomance ja auch innen arsch
