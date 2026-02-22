import { useState } from 'react'
import memories from '../data/memories.json'

export default function Memory() {
  const [search, setSearch] = useState('')
  const [reversed, setReversed] = useState(false)

  const filtered = search
    ? memories.filter((mem) => {
        const q = search.toLowerCase()
        return mem.title.toLowerCase().includes(q) || mem.description.toLowerCase().includes(q)
      })
    : memories

  const sorted = reversed ? filtered : [...filtered].reverse()

  if (memories.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="3" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5"/>
          <circle cx="12" cy="14" r="3" fill="#D4956B" opacity="0.6"/>
          <path d="M4 22l7-5 4 3 5-4 8 6" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
          No memories yet!
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Drop images into <code>public/memories/</code>
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="var(--muted)" strokeWidth="1.5" fill="none"/>
            <path d="M10.5 10.5L14.5 14.5" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid rgba(193, 125, 79, 0.2)',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              color: 'var(--text)',
              fontSize: '0.9rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button
          onClick={() => setReversed(!reversed)}
          title={reversed ? 'Oldest first' : 'Newest first'}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(193, 125, 79, 0.2)',
            borderRadius: '0.75rem',
            padding: '0 0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: reversed ? 'scaleY(-1)' : 'none' }}>
            <path d="M5 4v10M5 14l-3-3M5 14l3-3" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 6h5M11 9h4M11 12h3" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          No memories match your search.
        </p>
      )}
      {sorted.map((mem) => (
        <div
          key={mem.src}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid rgba(193, 125, 79, 0.12)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
          }}
        >
          <img
            src={mem.src}
            alt={mem.title}
            style={{ width: '100%', display: 'block' }}
          />
          {(mem.title || mem.description || mem.date) && (
            <div style={{ padding: '1rem' }}>
              {mem.title && <p style={{ fontWeight: 600, fontSize: '1rem' }}>{mem.title}</p>}
              {mem.description && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: mem.title ? '0.65rem' : 0 }}>
                  {mem.description}
                </p>
              )}
              {mem.date && (
                <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: (mem.title || mem.description) ? '0.65rem' : 0 }}>
                  {mem.date}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
