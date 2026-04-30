import React, { useState } from 'react'

const WIDTH = 560
const HEIGHT = 520

function getNodePositions(students) {
  const positions = {}
  const n = students.length
  const cx = WIDTH / 2
  const cy = HEIGHT / 2
  const r = Math.min(WIDTH, HEIGHT) * 0.36

  students.forEach((s, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    positions[s.name] = {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    }
  })
  return positions
}

function isPathEdge(path, a, b) {
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) {
      return true
    }
  }
  return false
}

const MAJOR_COLORS = {
  'Computer Science': '#4f9eff',
  'Mathematics': '#a78bfa',
  'Chemistry': '#f472b6',
  'Biology': '#34d399',
  'Economics': '#fbbf24',
  'History': '#f87171',
  'Electrical Engineering': '#38bdf8',
  'ECE': '#38bdf8'
}

function nodeColor(major) {
  return MAJOR_COLORS[major] || '#BF5700'
}

export default function GraphView({ students, graph, referralPath, onNodeClick, selectedNode }) {
  const [hovered, setHovered] = useState(null)
  const positions = getNodePositions(students)

  const edges = []
  for (const [from, neighbors] of Object.entries(graph)) {
    for (const { name: to, weight } of neighbors) {
      if (from < to) {
        edges.push({ from, to, weight })
      }
    }
  }

  return (
    <div className="graph-container">
      <svg width={WIDTH} height={HEIGHT}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#BF5700" />
          </marker>
        </defs>

        {edges.map(({ from, to, weight }) => {
          const p1 = positions[from]
          const p2 = positions[to]
          if (!p1 || !p2) return null
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2
          const onPath = referralPath && referralPath.length > 1 && isPathEdge(referralPath, from, to)
          const strokeColor = onPath ? '#4ade80' : 'rgba(255,255,255,0.18)'
          const strokeWidth = onPath ? 3 : Math.max(1, weight * 0.4)

          return (
            <g key={from + '-' + to}>
              <line
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              <text
                x={midX} y={midY - 5}
                textAnchor="middle"
                fontSize="11"
                fill={onPath ? '#4ade80' : 'rgba(255,255,255,0.55)'}
                fontWeight={onPath ? '700' : '400'}
              >
                {weight}
              </text>
            </g>
          )
        })}

        {students.map(s => {
          const pos = positions[s.name]
          if (!pos) return null
          const isSelected = selectedNode === s.name
          const isHovered = hovered === s.name
          const onPath = referralPath && referralPath.includes(s.name)
          const color = nodeColor(s.major)
          const radius = isSelected || onPath ? 26 : 22

          return (
            <g
              key={s.name}
              onClick={() => onNodeClick(s)}
              onMouseEnter={() => setHovered(s.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x} cy={pos.y}
                r={radius}
                fill={isSelected || onPath ? '#BF5700' : '#16213e'}
                stroke={onPath ? '#4ade80' : color}
                strokeWidth={isSelected || isHovered ? 3 : 2}
              />
              <text
                x={pos.x} y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="600"
                fill={isSelected || onPath ? '#fff' : color}
              >
                {s.name}
              </text>
              {s.roommate && (
                <text
                  x={pos.x} y={pos.y + 14}
                  textAnchor="middle"
                  fontSize="8"
                  fill="rgba(255,255,255,0.5)"
                >
                  🏠 {s.roommate}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="graph-legend">
        {Object.entries(MAJOR_COLORS).map(([major, color]) => {
          const hasMajor = students.some(s => s.major === major)
          if (!hasMajor) return null
          return (
            <div key={major} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              <span>{major}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
