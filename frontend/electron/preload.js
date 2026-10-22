const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    quitGame: () => ipcRenderer.send('app:quit')
})