import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import SharedNoteView from './components/SharedNoteView'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/shared/:slug', element: <SharedNoteView /> },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
