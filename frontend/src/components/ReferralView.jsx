import React, { useState } from 'react'
import GraphView from './GraphView'
import { findReferralPath } from '../algorithms'

export default function ReferralView({ students, graph }) {
  const [startName, setStartName] = useState(students[0]?.name || '')
  const [company, setCompany] = useState('')
  const [path, setPath] = useState(null)
  const [searched, setSearched] = useState(false)

  const companies = [...new Set(
    students.flatMap(s => s.previousInternships.filter(i => i !== 'None' && i !== ''))
  )].sort()

  function handleFind() {
    if (!startName || !company) return
    const result = findReferralPath(students, graph, startName, company)
    setPath(result)
    setSearched(true)
  }

  function handleClear() {
    setPath(null)
    setSearched(false)
    setCompany('')
  }

  return (
    <div className="section">
      <h2 className="section-title">Referral Path Finder</h2>
      <p className="section-desc">
        Find the strongest connection path from a student to someone who interned at a target company.
      </p>

      <div className="referral-controls">
        <div className="control-group">
          <label>Starting Student</label>
          <select value={startName} onChange={e => { setStartName(e.target.value); setSearched(false); setPath(null) }}>
            {students.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>Target Company</label>
          <input
            type="text"
            value={company}
            onChange={e => { setCompany(e.target.value); setSearched(false); setPath(null) }}
            placeholder="e.g. Google"
            list="company-suggestions"
          />
          <datalist id="company-suggestions">
            {companies.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div className="control-group control-buttons">
          <button className="btn-primary" onClick={handleFind}>Find Path</button>
          {searched && <button className="btn-secondary" onClick={handleClear}>Clear</button>}
        </div>
      </div>

      {searched && (
        <div className={`path-result ${path && path.length > 0 ? 'found' : 'not-found'}`}>
          {path && path.length > 0 ? (
            <>
              <div className="path-label">Referral path found:</div>
              <div className="path-steps">
                {path.map((name, i) => (
                  <React.Fragment key={name}>
                    <span className="path-node">{name}</span>
                    {i < path.length - 1 && <span className="path-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="path-info">
                {path[path.length - 1]} has a previous internship at {company}
              </div>
            </>
          ) : (
            <div className="no-path">No referral path found for "{company}"</div>
          )}
        </div>
      )}

      <div className="graph-wrapper">
        <GraphView
          students={students}
          graph={graph}
          referralPath={path}
          onNodeClick={s => setStartName(s.name)}
          selectedNode={startName}
        />
        <p className="graph-hint">Click a node to set as starting student</p>
      </div>
    </div>
  )
}
