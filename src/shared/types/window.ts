/*
 * @Author: Libra
 * @Date: 2024-11-18 06:24:32
 * @LastEditors: Libra
 * @Description:
 */
export interface WindowAPI {
  minimizeWindow: () => Promise<void>
  closeWindow: () => Promise<void>
  maximizeWindow: () => Promise<void>
  unmaximizeWindow: () => Promise<void>
  onMaximize: (callback: () => void) => void
  onUnmaximize: (callback: () => void) => void
  removeMaximizeListener: () => void
  removeUnmaximizeListener: () => void
}
