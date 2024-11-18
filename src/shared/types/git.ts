/*
 * @Author: Libra
 * @Date: 2024-11-18 07:20:29
 * @LastEditors: Libra
 * @Description:
 */
export interface GitCommit {
  hash: string
  date: string
  message: string
  author: string
  parents: string[]
  branch: string
}

export interface GitAPI {
  getCommits: (repoPath: string) => Promise<GitCommit[]>
}
