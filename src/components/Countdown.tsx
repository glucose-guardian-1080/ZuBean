import countdown from '../data/countdown.json'

export default function Countdown() {
  const targetDate = new Date(`${countdown.date}T00:00:00`)
  const targetLabel = countdown.label

  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{targetLabel}</p>
      <p
        style={{
          fontSize: '4rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, var(--caramel), var(--brown-light))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {days}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>days to go</p>
    </div>
  )
}
