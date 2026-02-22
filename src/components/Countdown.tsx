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
            border: '1px solid rgba(193, 125, 79, 0.12)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '4rem' }}>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--caramel), var(--brown-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
              }}
            >
              {item.days}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>days</p>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '1rem' }}>{item.title}</p>
            {item.description && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {item.description}
              </p>
            )}
            <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
