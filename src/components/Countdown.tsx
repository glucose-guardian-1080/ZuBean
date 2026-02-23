import countdowns from '../data/countdown.json'

export default function Countdown() {
  const now = new Date()

  const upcoming = countdowns
    .map((item) => {
      const targetDate = new Date(`${item.date}T00:00:00`)
      const diff = targetDate.getTime() - now.getTime()
      const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
      return { ...item, days }
    })
    .sort((a, b) => a.days - b.days)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
      {upcoming.map((item) => (
        <div
          key={item.date}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid rgba(168, 220, 217, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '4.5rem', flexShrink: 0 }}>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--amber), var(--golden))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              {item.days}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.35rem' }}>days</p>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '1rem' }}>{item.title}</p>
            {item.description && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.65rem' }}>
                {item.description}
              </p>
            )}
            <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.65rem' }}>{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
