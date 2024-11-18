import { ElectronAPI } from '@electron-toolkit/preload'
import type { WindowAPI } from '../shared/types/window'

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
