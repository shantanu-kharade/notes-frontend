// src/App.jsx
import React, { useEffect, useState } from 'react'
import NotesList from './components/NotesList'
import NoteEditor from './components/NoteEditor'
import { listNotes, createNote } from './api'

export default function App() {
  const [notes, setNotes] = useState([])
  const [activeId, setActiveId] = useState(null)

  async function refresh() {
    const data = await listNotes()
    setNotes(data)
    if (data.length && !activeId) setActiveId(data[0].id)
  }

  useEffect(() => { refresh() }, [])

  async function onNew() {
    const n = await createNote({ title: 'Untitled', content: '' })
    await refresh()
    setActiveId(n.id)
  }

  const active = notes.find(n => n.id === activeId) || null

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      <div style={{ width: 300, borderRight: '1px solid #ccc' }}>
        <button onClick={onNew}>➕ New Note</button>
        <NotesList notes={notes} activeId={activeId} onSelect={setActiveId} onChanged={refresh} />
      </div>
      <div style={{ flex: 1 }}>
        {active ? (
          <NoteEditor note={active} onChanged={refresh} />
        ) : (
          <p>Select or create a note</p>
        )}
      </div>
    </div>
  )
}
