/*
 * @Author: Libra
 * @Date: 2024-11-18 06:24:51
 * @LastEditors: Libra
 * @Description:
 */
import { useState, useEffect } from 'react'

export const useWindowControls = (): {
  isMaximized: boolean
  handleMinimize: () => Promise<void>
  handleClose: () => Promise<void>
  handleMaximizeToggle: () => Promise<void>
} => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    window.api.onMaximize(() => setIsMaximized(true))
    window.api.onUnmaximize(() => setIsMaximized(false))

    return (): void => {
      window.api.removeMaximizeListener()
      window.api.removeUnmaximizeListener()
    }
  }, [])

  const handleMinimize = async (): Promise<void> => {
    await window.api.minimizeWindow()
  }

  const handleClose = async (): Promise<void> => {
    await window.api.closeWindow()
  }

  const handleMaximizeToggle = async (): Promise<void> => {
    if (isMaximized) {
      await window.api.unmaximizeWindow()
    } else {
      await window.api.maximizeWindow()
    }
  }

  return {
    isMaximized,
    handleMinimize,
    handleClose,
    handleMaximizeToggle
  }
}
