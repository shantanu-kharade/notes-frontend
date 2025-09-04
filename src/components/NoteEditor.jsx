import React, { useEffect, useState } from 'react'
import { updateNote } from '../api'

export default function NoteEditor({ note, onChanged }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  async function save() {
    setSaving(true)
    try {
      await updateNote(note.id, { title, content })
      await onChanged()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea
        rows={12}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note..."
        style={{ width: '100%', marginTop: 10 }}
      />
      <button onClick={save} disabled={saving}>
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  )
}
