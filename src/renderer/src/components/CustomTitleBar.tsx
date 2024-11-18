/**
 * Author: Libra
 * Date: 2024-10-07 17:13:50
 * LastEditors: Libra
 * Description:
 */
import React from 'react'
import { Minus, X, Maximize, Minimize2 } from 'lucide-react'
import { useWindowControls } from '../hooks/useWindowControls'

const CustomTitleBar: React.FC = () => {
  const { isMaximized, handleMinimize, handleClose, handleMaximizeToggle } = useWindowControls()

  return (
    <div className="fixed top-0 left-0 w-full bg-[hsl(var(--background))] z-50 h-8 flex items-center justify-between px-2 select-none custom-titlebar">
      <div
        className="flex items-center flex-grow h-full"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        LIBRA-GIT-GUI
      </div>
      <div className="flex space-x-1" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          onClick={handleMinimize}
          className="p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Minus size={14} className="text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={handleMaximizeToggle}
          className="p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isMaximized ? (
            <Minimize2 size={14} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Maximize size={14} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <button
          onClick={handleClose}
          className="p-1 rounded-sm hover:bg-red-500 transition-colors duration-200 hover:text-white"
        >
          <X size={14} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  )
}

export default CustomTitleBar
