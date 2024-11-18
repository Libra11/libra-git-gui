/*
 * @Author: Libra
 * @Date: 2024-11-18 07:28:59
 * @LastEditors: Libra
 * @Description:
 */
import simpleGit from 'simple-git'
import { ipcMain } from 'electron'

export function setupGitHandlers(): void {
  ipcMain.handle('get-commits', async (_, repoPath: string) => {
    try {
      const git = simpleGit(repoPath)

      // Get all branches
      const branches = await git.branch()

      // Get detailed log with graph info
      const log = await git.log(['--all', '--graph', '--date=iso'])

      // Process commits to include branch and parent information
      const commits = log.all.map((commit) => {
        // Find which branch(es) this commit is on
        const commitBranches = branches.all.filter((branchName) => {
          const branchCommit = branches.branches[branchName]?.commit
          return branchCommit === commit.hash
        })

        return {
          hash: commit.hash,
          date: commit.date,
          message: commit.message,
          author: `${commit.author_name} <${commit.author_email}>`,
          parents: commit.parents || [],
          branch: commitBranches[0] || 'main' // Use first branch or default to main
        }
      })

      return commits
    } catch (error) {
      console.error('Failed to get commits:', error)
      throw error
    }
  })
}
