import React from 'react'
import { deleteNote, shareNote, unshareNote } from '../api'

export default function NotesList({ notes, activeId, onSelect, onChanged }) {
  async function onDelete(id) {
    if (!confirm('Delete this note?')) return
    await deleteNote(id)
    await onChanged()
  }
  async function onShare(n) {
    const updated = await shareNote(n.id)
    await onChanged()
    const link = `${window.location.origin}/shared/${updated.slug}`
    navigator.clipboard.writeText(link)
    alert('Public link copied to clipboard:\n' + link)
  }
  async function onUnshare(id) {
    await unshareNote(id)
    await onChanged()
  }

  return (
    <div style={{ marginTop: 10 }}>
      {notes.map(n => (
        <div
          key={n.id}
          style={{
            padding: '8px',
            marginBottom: '6px',
            cursor: 'pointer',
            border: n.id === activeId ? '2px solid blue' : '1px solid #ccc',
          }}
          onClick={() => onSelect(n.id)}
        >
          <strong>{n.title || 'Untitled'}</strong>
          {n.is_public && n.slug && (
            <div>
              <a href={`/shared/${n.slug}`} target="_blank" rel="noreferrer">Public link →</a>
            </div>
          )}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {n.is_public ? (
              <button onClick={(e)=>{e.stopPropagation(); onUnshare(n.id)}}>Unshare</button>
            ) : (
              <button onClick={(e)=>{e.stopPropagation(); onShare(n)}}>Share</button>
            )}
            <button onClick={(e)=>{e.stopPropagation(); onDelete(n.id)}}>Delete</button>
          </div>
        </div>
      ))}
      {!notes.length && <p>No notes yet. Create one!</p>}
    </div>
  )
}
