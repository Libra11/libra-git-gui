import { ipcRenderer } from 'electron'
import type { WindowAPI } from '../shared/types/window'

export const windowAPI: WindowAPI = {
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.invoke('unmaximize-window'),
  onMaximize: (callback) => ipcRenderer.on('window-maximized', callback),
  onUnmaximize: (callback) => ipcRenderer.on('window-unmaximized', callback),
  removeMaximizeListener: () => ipcRenderer.removeAllListeners('window-maximized'),
  removeUnmaximizeListener: () => ipcRenderer.removeAllListeners('window-unmaximized')
}
