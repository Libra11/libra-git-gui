/*
 * @Author: Libra
 * @Date: 2024-11-18 07:21:39
 * @LastEditors: Libra
 * @Description:
 */
import { ipcRenderer } from 'electron'
import type { GitAPI } from '../shared/types/git'

export const gitAPI: GitAPI = {
  getCommits: (repoPath) => ipcRenderer.invoke('get-commits', repoPath)
}
