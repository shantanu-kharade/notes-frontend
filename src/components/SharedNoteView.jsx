import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPublic } from '../api'

export default function SharedNoteView() {
  const { slug } = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const data = await getPublic(slug)
        setNote(data)
      } catch (e) {
        setError('This public note does not exist or is no longer shared.')
      }
    })()
  }, [slug])

  return (
    <div style={{ padding: 20 }}>
      <h2>🔗 Public Note</h2>
      <Link to="/">← Back to app</Link>
      {error && <p>{error}</p>}
      {note && (
        <div style={{ marginTop: 20 }}>
          <h3>{note.title}</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{note.content}</pre>
        </div>
      )}
    </div>
  )
}
