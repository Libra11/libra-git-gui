import { BrowserWindow, ipcMain } from 'electron'

export class WindowManager {
  private window: BrowserWindow

  constructor(window: BrowserWindow) {
    this.window = window
    this.setupWindowHandlers()
    this.setupWindowEvents()
  }

  private setupWindowHandlers(): void {
    ipcMain.handle('minimize-window', () => {
      this.window.minimize()
    })

    ipcMain.handle('close-window', () => {
      this.window.close()
    })

    ipcMain.handle('maximize-window', () => {
      this.window.maximize()
    })

    ipcMain.handle('unmaximize-window', () => {
      this.window.unmaximize()
    })
  }

  private setupWindowEvents(): void {
    this.window.on('maximize', () => {
      this.window.webContents.send('window-maximized')
    })

    this.window.on('unmaximize', () => {
      this.window.webContents.send('window-unmaximized')
    })
  }
}
