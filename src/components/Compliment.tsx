import { useState } from 'react'
import compliments from '../data/compliments.json'

export default function Compliment() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * compliments.length))

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{compliments[index]}</p>
      <button
        onClick={() => setIndex(Math.floor(Math.random() * compliments.length))}
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, var(--caramel), var(--brown-light))',
          color: '#fff',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.75rem 2rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Another one!
      </button>
    </div>
  )
}
