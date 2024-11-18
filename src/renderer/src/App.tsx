/**
 * Author: Libra
 * Date: 2024-10-07 00:28:07
 * LastEditors: Libra
 * Description:
 */
import { useState } from 'react'
import CustomTitleBar from '@renderer/components/CustomTitleBar'
import { ProjectSelect } from '@renderer/components/ProjectSelect'
import { CommitHistory } from '@renderer/components/CommitHistory'

function App(): JSX.Element {
  const [repoPath, setRepoPath] = useState<string>('')

  return (
    <div className="w-screen h-screen bg-background flex flex-col">
      <CustomTitleBar />
      <div className="flex-1 p-4">
        <div className="mb-4">
          <ProjectSelect onProjectSelect={setRepoPath} />
        </div>
        {repoPath && <CommitHistory repoPath={repoPath} />}
      </div>
    </div>
  )
}

export default App
