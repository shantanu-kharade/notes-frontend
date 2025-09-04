// src/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

// --- CRUD ---
export async function listNotes() {
  const res = await fetch(`${API_URL}/notes`)
  if (!res.ok) throw new Error('Failed to fetch notes')
  return res.json()
}

export async function createNote(data) {
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create note')
  return res.json()
}

export async function updateNote(id, data) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update note')
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete note')
}

// --- Sharing ---
export async function shareNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}/share`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to share note')
  return res.json()
}

export async function unshareNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}/unshare`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to unshare note')
  return res.json()
}

export async function getPublic(slug) {
  const res = await fetch(`${API_URL}/public/${slug}`)
  if (!res.ok) throw new Error('Public note not found')
  return res.json()
}
