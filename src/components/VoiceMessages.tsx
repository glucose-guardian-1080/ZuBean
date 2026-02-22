import { useState, useRef } from 'react'
import messages from '../data/voice-messages.json'

export default function VoiceMessages() {
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function toggle(src: string) {
    if (playing === src) {
      audioRef.current?.pause()
      setPlaying(null)
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(src)
    audio.onended = () => setPlaying(null)
    audio.play()
    audioRef.current = audio
    setPlaying(src)
  }

  if (messages.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          <rect x="10" y="4" width="12" height="20" rx="6" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5"/>
          <path d="M8 18a8 8 0 0 0 16 0" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M16 26v3M12 29h8" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
          No voice messages yet!
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Drop audio files into <code>public/voice/</code>
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      {messages.map((msg) => (
        <div
          key={msg.src}
          onClick={() => toggle(msg.src)}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid rgba(193, 125, 79, 0.12)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: playing === msg.src
                ? 'linear-gradient(135deg, var(--caramel), var(--brown-light))'
                : 'rgba(193, 125, 79, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {playing === msg.src ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="4" y="3" width="3.5" height="12" rx="1" fill="#fff"/>
                <rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="#fff"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 3l10 6-10 6V3z" fill="#D4956B"/>
              </svg>
            )}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{msg.title}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.15rem' }}>{msg.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
