import { useState } from 'react'
import './App.css'
import BeanIcon from './components/BeanIcon'
import VoiceMessages from './components/VoiceMessages'
import Compliment from './components/Compliment'
import Memory from './components/Memory'
import Countdown from './components/Countdown'

type Page = 'home' | 'voice' | 'compliment' | 'memory' | 'countdown'

function App() {
  const [page, setPage] = useState<Page>('home')

  if (page !== 'home') {
    return (
      <div className="app">
        <button
          onClick={() => setPage('home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            fontSize: '1rem',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            marginBottom: '1rem',
            padding: '0.25rem 0',
          }}
        >
          &larr; Back
        </button>
        <PageContent page={page} />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div style={{ borderRadius: 20, overflow: 'hidden', display: 'inline-block', boxShadow: '0 6px 24px rgba(0,0,0,0.4)', marginBottom: '0.75rem' }}>
          <BeanIcon size={72} />
        </div>
        <h1><span className="zu">Zu</span><span className="bean">Bean</span></h1>
        <p>little moments, big warmth</p>
      </header>

      <div className="grid">
        <div className="card" onClick={() => setPage('voice')}>
          <span className="card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="4" width="12" height="20" rx="6" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5"/>
              <path d="M8 18a8 8 0 0 0 16 0" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M16 26v3M12 29h8" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="card-label">Voice Messages</span>
        </div>
        <div className="card" onClick={() => setPage('compliment')}>
          <span className="card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="8" fill="#C17D4F" opacity="0.3"/>
              <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8" stroke="#D4956B" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="card-label">Compliments</span>
        </div>
        <div className="card" onClick={() => setPage('memory')}>
          <span className="card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="6" width="24" height="20" rx="3" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5"/>
              <circle cx="12" cy="14" r="3" fill="#D4956B" opacity="0.6"/>
              <path d="M4 22l7-5 4 3 5-4 8 6" stroke="#D4956B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </span>
          <span className="card-label">Our Memories</span>
        </div>
        <div className="card" onClick={() => setPage('countdown')}>
          <span className="card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M11 4h10M16 4v3" stroke="#D4956B" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M10 8h12l-2 8 2 8H10l2-8-2-8z" fill="#C17D4F" opacity="0.25" stroke="#D4956B" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13 16h6" stroke="#D4956B" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
              <path d="M14 20l2 4 2-4" fill="#D4956B" opacity="0.4"/>
            </svg>
          </span>
          <span className="card-label">Countdown</span>
        </div>
      </div>
    </div>
  )
}

function PageContent({ page }: { page: Exclude<Page, 'home'> }) {
  switch (page) {
    case 'voice':
      return <VoiceMessages />
    case 'compliment':
      return <Compliment />
    case 'memory':
      return <Memory />
    case 'countdown':
      return <Countdown />
  }
}

export default App
