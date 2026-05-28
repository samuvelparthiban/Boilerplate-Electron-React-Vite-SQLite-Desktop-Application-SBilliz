const { contextBridge, ipcRenderer } = require('electron')

try {
	contextBridge.exposeInMainWorld('api', {
	  addUser: (name) => ipcRenderer.invoke('user:add', name),
	  getUsers: () => ipcRenderer.invoke('user:getAll'),
	  deleteUser: (id) => ipcRenderer.invoke('user:delete', id),
	});
} catch (err) {
  console.error('PRELOAD ERROR:', err)
}
