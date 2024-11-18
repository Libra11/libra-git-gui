/*
 * @Author: Libra
 * @Date: 2024-11-18 05:48:50
 * @LastEditors: Libra
 * @Description:
 */
import { ElectronAPI } from '@electron-toolkit/preload'
import type { WindowAPI } from '../shared/types/window'
import type { GitAPI } from '../shared/types/git'

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI & GitAPI
  }
}
