export default function Memory() {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5"/>
        <circle cx="12" cy="14" r="3" fill="#D4956B" opacity="0.6"/>
        <path d="M4 22l7-5 4 3 5-4 8 6" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
        Add your favorite photos and memories here!
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        (Coming soon &mdash; drop images into <code>public/memories/</code>)
      </p>
    </div>
  )
}
