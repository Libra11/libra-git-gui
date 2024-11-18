import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export function ProjectSelect({
  onProjectSelect
}: {
  onProjectSelect: (path: string) => void
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectProject = async (): Promise<void> => {
    try {
      const path = await window.electron.ipcRenderer.invoke('select-directory')
      if (path) {
        onProjectSelect(path)
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Failed to select directory:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Git Repository</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Git Repository</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button onClick={handleSelectProject}>Choose Directory</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
