// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    readFile: () => ipcRenderer.send('read-file'),
    writeFile: () => ipcRenderer.send('write-file'),
    login: (data) => ipcRenderer.send('login',data),
})