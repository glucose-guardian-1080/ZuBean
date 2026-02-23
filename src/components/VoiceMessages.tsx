import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import folders from '../data/voice-messages.json'

type Message = { src: string; title: string; date: string }

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const allMessages = folders.flatMap((f) => f.messages)

export type VoiceMessagesHandle = {
  goBack: () => boolean
}

const VoiceMessages = forwardRef<VoiceMessagesHandle>(function VoiceMessages(_, ref) {
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [durations, setDurations] = useState<Record<string, number>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animRef = useRef<number>(0)
  const [subAnim, setSubAnim] = useState<'enter' | 'exit-back' | null>(null)
  const [cameBack, setCameBack] = useState(false)

  useEffect(() => {
    allMessages.forEach((msg) => {
      const audio = new Audio(msg.src)
      audio.onloadedmetadata = () => {
        setDurations((prev) => ({ ...prev, [msg.src]: audio.duration }))
      }
    })
  }, [])

  function updateTime() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
    animRef.current = requestAnimationFrame(updateTime)
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      cancelAnimationFrame(animRef.current)
    }
    setPlaying(null)
    setCurrentTime(0)
  }

  function handleSubAnimEnd() {
    if (subAnim === 'exit-back') {
      stopAudio()
      setOpenFolder(null)
      setCameBack(true)
    }
    setSubAnim(null)
  }

  useImperativeHandle(ref, () => ({
    goBack() {
      if (openFolder) {
        setSubAnim('exit-back')
        return true
      }
      stopAudio()
      return false
    }
  }))

  function toggle(src: string) {
    if (audioRef.current) {
      audioRef.current.pause()
      cancelAnimationFrame(animRef.current)
    }

    if (playing === src) {
      setPlaying(null)
      setCurrentTime(0)
      return
    }

    const audio = new Audio(src)
    audio.onended = () => {
      setPlaying(null)
      setCurrentTime(0)
      cancelAnimationFrame(animRef.current)
    }
    audio.play()
    audioRef.current = audio
    setPlaying(src)
    setCurrentTime(0)
    animRef.current = requestAnimationFrame(updateTime)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>, src: string) {
    if (playing !== src || !audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pct * audioRef.current.duration
  }

  if (folders.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          <rect x="10" y="4" width="12" height="20" rx="6" fill="#3D7A77" opacity="0.25" stroke="#A8DCD9" strokeWidth="1.5"/>
          <path d="M8 18a8 8 0 0 0 16 0" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M16 26v3M12 29h8" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
          No voice messages yet!
        </p>
      </div>
    )
  }

  // Folder list view
  if (!openFolder) {
    return (
      <div
        className={cameBack ? 'sub-enter-reverse' : ''}
        onAnimationEnd={() => setCameBack(false)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
      >
        {folders.map((folder) => (
          <div
            key={folder.folder}
            onClick={() => { setOpenFolder(folder.folder); setSubAnim('enter') }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '1rem',
              padding: '1.25rem',
              border: '1px solid rgba(168, 220, 217, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M3 7a2 2 0 0 1 2-2h6l2 3h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#3D7A77" opacity="0.3" stroke="#A8DCD9" strokeWidth="1.5"/>
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '1rem' }}>{folder.folder}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                {folder.messages.length} {folder.messages.length === 1 ? 'message' : 'messages'}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>
    )
  }

  // Messages inside a folder
  const currentFolder = folders.find((f) => f.folder === openFolder)
  if (!currentFolder) return null

  return (
    <div
      className={subAnim === 'enter' ? 'sub-enter' : subAnim === 'exit-back' ? 'sub-exit' : ''}
      onAnimationEnd={handleSubAnimEnd}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
    >
      {currentFolder.messages.map((msg: Message) => {
        const isPlaying = playing === msg.src
        const msgDuration = durations[msg.src] || 0
        const progress = isPlaying && msgDuration > 0 ? (currentTime / msgDuration) * 100 : 0

        return (
          <div
            key={msg.src}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '1rem',
              padding: '1.25rem',
              border: '1px solid rgba(168, 220, 217, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
              onClick={() => toggle(msg.src)}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: isPlaying
                    ? 'linear-gradient(135deg, var(--amber), var(--golden))'
                    : 'rgba(168, 220, 217, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="4" y="3" width="3.5" height="12" rx="1" fill="#fff"/>
                    <rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="#fff"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 3l10 6-10 6V3z" fill="#A8DCD9"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{msg.title}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.15rem' }}>{msg.date}</p>
              </div>
            </div>
            <div
              onClick={(e) => seek(e, msg.src)}
              style={{
                marginTop: '0.75rem',
                height: 6,
                borderRadius: 3,
                background: 'rgba(168, 220, 217, 0.12)',
                cursor: isPlaying ? 'pointer' : 'default',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--amber), var(--golden))',
                  borderRadius: 3,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
                {isPlaying ? formatTime(currentTime) : '0:00'}
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
                {msgDuration > 0 ? formatTime(msgDuration) : '--:--'}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default VoiceMessages
