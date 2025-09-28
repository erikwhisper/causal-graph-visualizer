const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFileDialog: (options) => ipcRenderer.invoke("dialog:openFile", options),
  saveFileDialog: (options) => ipcRenderer.invoke("dialog:saveFile", options),
});
