/**
 * Author: Libra
 * Date: 2024-11-18 07:28:44
 * LastEditors: Libra
 * Description:
 */
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface CommitNode {
  hash: string
  message: string
  author: string
  date: string
  parents: string[]
  branch: string
  x?: number
  y?: number
}

interface Link {
  source: CommitNode
  target: CommitNode
}

export function GitGraph({
  commits,
  width = 800,
  height = 600
}: {
  commits: CommitNode[]
  width?: number
  height?: number
}): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !commits.length) return

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const g = svg.append('g')

    // Create links between commits
    const links: Link[] = []
    commits.forEach((commit) => {
      commit.parents.forEach((parentHash) => {
        const parent = commits.find((c) => c.hash === parentHash)
        if (parent) {
          links.push({
            source: commit,
            target: parent
          })
        }
      })
    })

    // Calculate positions
    const yScale = d3
      .scaleLinear()
      .domain([0, commits.length - 1])
      .range([50, height - 50])

    // Track branch positions
    const branchPositions = new Map<string, number>()
    let nextBranchPosition = 100

    commits.forEach((commit, i) => {
      if (!branchPositions.has(commit.branch)) {
        branchPositions.set(commit.branch, nextBranchPosition)
        nextBranchPosition += 120
      }
      commit.y = yScale(i)
      commit.x = branchPositions.get(commit.branch)
    })

    // Draw links
    g.selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', (d) => {
        const sourceX = d.source.x!
        const sourceY = d.source.y!
        const targetX = d.target.x!
        const targetY = d.target.y!

        return `M ${sourceX} ${sourceY} 
                C ${sourceX} ${(sourceY + targetY) / 2},
                  ${targetX} ${(sourceY + targetY) / 2},
                  ${targetX} ${targetY}`
      })
      .attr('stroke', '#888')
      .attr('stroke-width', 2)
      .attr('fill', 'none')

    // Draw commit nodes
    const nodes = g
      .selectAll('g.commit')
      .data(commits)
      .enter()
      .append('g')
      .attr('class', 'commit')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

    // Add commit circles
    nodes
      .append('circle')
      .attr('r', 6)
      .attr('fill', '#fff')
      .attr('stroke', '#000')
      .attr('stroke-width', 2)

    // Add commit messages
    nodes
      .append('text')
      .attr('x', 15)
      .attr('y', 5)
      .text((d) => `${d.hash.substring(0, 7)} - ${d.message.split('\n')[0]}`)
      .attr('font-size', '12px')

    // Add branch labels
    const branches = Array.from(branchPositions.entries())
    g.selectAll('text.branch')
      .data(branches)
      .enter()
      .append('text')
      .attr('class', 'branch')
      .attr('x', (d) => d[1])
      .attr('y', 30)
      .text((d) => d[0])
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')

    // Add zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom as any)
  }, [commits, width, height])

  return <svg ref={svgRef} width={width} height={height} className="border rounded-lg" />
}
