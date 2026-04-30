import React, { useState, useEffect } from 'react'
import { getTestCases } from './testCases'
import { cloneStudents, assignRoommates, buildGraph, applyChats } from './algorithms'
import GraphView from './components/GraphView'
import RoommateView from './components/RoommateView'
import ReferralView from './components/ReferralView'
import ChatView from './components/ChatView'

const TABS = ['Graph', 'Roommates', 'Referral Path', 'Chat & Friends']

export default function App() {
  const testCases = getTestCases()
  const [caseIdx, setCaseIdx] = useState(0)
  const [activeTab, setActiveTab] = useState('Graph')
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState([])
  const [graph, setGraph] = useState({})
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const tc = testCases[caseIdx]
      const cloned = cloneStudents(tc.students)
      assignRoommates(cloned)
      const g = buildGraph(cloned)
      applyChats(cloned, tc.chatSeed)
      setStudents(cloned)
      setGraph(g)
      setSelectedNode(null)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [caseIdx])

  const selectedStudent = students.find(s => s.name === selectedNode)

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="logo">🤘</span>
          <h1 className="app-title">Longhorn Network</h1>
        </div>
        <div className="test-case-selector">
          {testCases.map((tc, i) => (
            <button
              key={i}
              className={`tc-btn ${caseIdx === i ? 'active' : ''}`}
              onClick={() => { setCaseIdx(i); setActiveTab('Graph') }}
            >
              {tc.label}
            </button>
          ))}
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Loading {testCases[caseIdx].label}...</p>
          </div>
        ) : (
          <>
            <div className="content-layout">
              <aside className="sidebar">
                <div className="sidebar-header">Students ({students.length})</div>
                {students.map(s => (
                  <button
                    key={s.name}
                    className={`sidebar-item ${selectedNode === s.name ? 'active' : ''}`}
                    onClick={() => setSelectedNode(selectedNode === s.name ? null : s.name)}
                  >
                    <div className="avatar small">{s.name[0]}</div>
                    <div className="sidebar-info">
                      <div className="student-name">{s.name}</div>
                      <div className="student-meta">{s.major}</div>
                    </div>
                    {s.roommate && <span className="roommate-badge" title={`Roommate: ${s.roommate}`}>🏠</span>}
                  </button>
                ))}

                {selectedStudent && (
                  <div className="student-detail-card">
                    <div className="detail-header">{selectedStudent.name}</div>
                    <div className="detail-row"><span>Age</span><span>{selectedStudent.age}</span></div>
                    <div className="detail-row"><span>Major</span><span>{selectedStudent.major}</span></div>
                    <div className="detail-row"><span>GPA</span><span>{selectedStudent.gpa}</span></div>
                    <div className="detail-row"><span>Year</span><span>{selectedStudent.year}</span></div>
                    <div className="detail-row"><span>Roommate</span><span>{selectedStudent.roommate || 'None'}</span></div>
                    <div className="detail-row internships">
                      <span>Internships</span>
                      <span>{selectedStudent.previousInternships.join(', ') || 'None'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Prefs</span>
                      <span>{selectedStudent.roommatePreferences.join(', ') || 'None'}</span>
                    </div>
                  </div>
                )}
              </aside>

              <div className="content">
                <div className="tabs">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      className={`tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="tab-content">
                  {activeTab === 'Graph' && (
                    <div className="section">
                      <h2 className="section-title">Student Connection Graph</h2>
                      <p className="section-desc">
                        Each node is a student. Edge weights show connection strength based on shared internships, major, age, and roommate status.
                      </p>
                      <GraphView
                        students={students}
                        graph={graph}
                        referralPath={null}
                        onNodeClick={s => setSelectedNode(s.name === selectedNode ? null : s.name)}
                        selectedNode={selectedNode}
                      />
                      <div className="adjacency-list">
                        <h3 className="subsection-title">Adjacency List</h3>
                        {students.map(s => (
                          <div key={s.name} className="adj-row">
                            <span className="adj-node">{s.name}</span>
                            <span className="adj-arrow">→</span>
                            <span className="adj-edges">
                              {(graph[s.name] || []).length === 0
                                ? <span className="muted">no connections</span>
                                : (graph[s.name] || []).map(e => (
                                  <span key={e.name} className="adj-edge">
                                    {e.name} ({e.weight})
                                  </span>
                                ))
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'Roommates' && (
                    <RoommateView students={students} />
                  )}

                  {activeTab === 'Referral Path' && (
                    <ReferralView students={students} graph={graph} />
                  )}

                  {activeTab === 'Chat & Friends' && (
                    <ChatView students={students} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
