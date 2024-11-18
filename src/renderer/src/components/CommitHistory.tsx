import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { GitGraph } from './GitGraph'

interface Commit {
  hash: string
  date: string
  message: string
  author: string
  parents: string[]
  branch: string
}

export function CommitHistory({ repoPath }: { repoPath: string }): JSX.Element {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadCommits = async (): Promise<void> => {
      if (!repoPath) return

      setLoading(true)
      try {
        const commits = await window.api.getCommits(repoPath)
        setCommits(commits)
      } catch (error) {
        console.error('Failed to load commits:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCommits()
  }, [repoPath])

  if (loading) {
    return <div>Loading commits...</div>
  }

  return (
    <div className="p-4">
      <Card className="mb-4 p-4">
        <GitGraph commits={commits} width={800} height={600} />
      </Card>
      <div className="space-y-4">
        {commits.map((commit) => (
          <Card key={commit.hash} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-mono text-sm">{commit.hash.substring(0, 7)}</p>
                <p className="font-medium mt-2">{commit.message}</p>
                <div className="text-sm text-muted-foreground mt-2">
                  <p>{commit.author}</p>
                  <p>{new Date(commit.date).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Branch: {commit.branch}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
