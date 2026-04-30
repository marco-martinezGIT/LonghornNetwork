import React, { useState } from 'react'

export default function ChatView({ students }) {
  const [selected, setSelected] = useState(students[0]?.name || '')

  const student = students.find(s => s.name === selected)

  const hasFriends = student && student.friendList.length > 0
  const hasChats = student && Object.keys(student.chatHistory).length > 0

  return (
    <div className="section">
      <h2 className="section-title">Friend Requests & Chat History</h2>

      <div className="chat-layout">
        <div className="student-list-panel">
          <h3 className="panel-title">Students</h3>
          {students.map(s => (
            <button
              key={s.name}
              className={`student-list-item ${selected === s.name ? 'active' : ''}`}
              onClick={() => setSelected(s.name)}
            >
              <div className="avatar small">{s.name[0]}</div>
              <div>
                <div className="student-name">{s.name}</div>
                <div className="student-meta">
                  {s.friendList.length} friend{s.friendList.length !== 1 ? 's' : ''}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="chat-detail-panel">
          {student && (
            <>
              <div className="chat-profile">
                <div className="avatar large">{student.name[0]}</div>
                <div>
                  <div className="profile-name">{student.name}</div>
                  <div className="profile-meta">{student.major} · GPA {student.gpa} · Year {student.year}</div>
                  <div className="profile-meta">
                    Internships: {student.previousInternships.join(', ') || 'None'}
                  </div>
                </div>
              </div>

              <div className="friends-section">
                <h3 className="subsection-title">Friends</h3>
                {!hasFriends ? (
                  <p className="muted">None</p>
                ) : (
                  <div className="friend-chips">
                    {student.friendList.map(name => (
                      <span key={name} className="friend-chip">{name}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="chat-section">
                <h3 className="subsection-title">Chat History</h3>
                {!hasChats ? (
                  <p className="muted">None</p>
                ) : (
                  Object.entries(student.chatHistory).map(([peer, messages]) => (
                    <div key={peer} className="chat-thread">
                      <div className="chat-thread-header">Conversation with {peer}</div>
                      {messages.map((msg, i) => (
                        <div key={i} className="chat-bubble">{msg}</div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
