const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pdvAPI', {
  pingPDV: (ip) => ipcRenderer.invoke('ping-pdv', ip)
});
