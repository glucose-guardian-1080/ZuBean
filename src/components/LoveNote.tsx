import { useState } from 'react'
import loveNotes from '../data/love-notes.json'

export default function LoveNote() {
  const [note] = useState(() => loveNotes[Math.floor(Math.random() * loveNotes.length)])

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{note}</p>
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ marginTop: '1.5rem' }}>
        <path d="M16 28S4 20 4 12a6.5 6.5 0 0 1 12-3.5A6.5 6.5 0 0 1 28 12c0 8-12 16-12 16z" fill="#C17D4F" opacity="0.85"/>
        <path d="M16 28S4 20 4 12a6.5 6.5 0 0 1 12-3.5A6.5 6.5 0 0 1 28 12c0 8-12 16-12 16z" stroke="#D4956B" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  )
}
