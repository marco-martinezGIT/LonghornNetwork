import React from 'react'

export default function RoommateView({ students }) {
  const pairs = []
  const seen = new Set()

  for (const s of students) {
    if (s.roommate && !seen.has(s.name)) {
      pairs.push([s.name, s.roommate])
      seen.add(s.name)
      seen.add(s.roommate)
    }
  }

  const unpaired = students.filter(s => !s.roommate)

  return (
    <div className="section">
      <h2 className="section-title">Roommate Assignments</h2>
      {pairs.length === 0 && <p className="muted">No roommate pairs found.</p>}
      <div className="roommate-grid">
        {pairs.map(([a, b]) => {
          const sa = students.find(s => s.name === a)
          const sb = students.find(s => s.name === b)
          return (
            <div key={a + b} className="roommate-card">
              <div className="roommate-person">
                <div className="avatar">{a[0]}</div>
                <div>
                  <div className="student-name">{a}</div>
                  <div className="student-meta">{sa?.major} · Year {sa?.year}</div>
                </div>
              </div>
              <div className="roommate-connector">
                <span className="connector-line" />
                <span className="heart">🏠</span>
                <span className="connector-line" />
              </div>
              <div className="roommate-person">
                <div className="avatar">{b[0]}</div>
                <div>
                  <div className="student-name">{b}</div>
                  <div className="student-meta">{sb?.major} · Year {sb?.year}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {unpaired.length > 0 && (
        <div className="unpaired-section">
          <h3 className="subsection-title">Unpaired Students</h3>
          <div className="unpaired-list">
            {unpaired.map(s => (
              <div key={s.name} className="unpaired-card">
                <div className="avatar small">{s.name[0]}</div>
                <div>
                  <div className="student-name">{s.name}</div>
                  <div className="student-meta">
                    {s.roommatePreferences.length === 0
                      ? 'No preferences listed'
                      : 'No mutual match found'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
