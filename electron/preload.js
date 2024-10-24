const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runNodeCode: (data) => ipcRenderer.send("run-node-code", data),
  onNodeCodeResponse: (callback) =>
    ipcRenderer.on("node-code-response", callback),
});
