import { useState, useRef, useMemo } from 'react';
import './App.css';
import BeanIcon from './components/BeanIcon';
import VoiceMessages from './components/VoiceMessages';
import type { VoiceMessagesHandle } from './components/VoiceMessages';
import Compliment from './components/Compliment';
import type { ComplimentHandle } from './components/Compliment';
import Memory from './components/Memory';
import Countdown from './components/Countdown';
import greetings from './data/greetings.json';

type Page = 'splash' | 'home' | 'voice' | 'compliment' | 'memory' | 'countdown';

const pageTitle: Record<Exclude<Page, 'home' | 'splash'>, string> = {
	voice: 'Sound Bites',
	compliment: 'Serotonin Menu',
	memory: 'Origin Story',
	countdown: 'Pending Arrival',
};

function App() {
	const [page, setPage] = useState<Page>('splash');
	const [splashFading, setSplashFading] = useState(false);
	const greeting = useMemo(
		() => greetings[Math.floor(Math.random() * greetings.length)],
		[],
	);
	const [animDirection, setAnimDirection] = useState<
		'forward' | 'back' | null
	>(null);
	const voiceRef = useRef<VoiceMessagesHandle>(null);
	const complimentRef = useRef<ComplimentHandle>(null);

	function navigateTo(target: Exclude<Page, 'home' | 'splash'>) {
		if (animDirection) return;
		setAnimDirection('forward');
		setPage(target);
	}

	function handleBack() {
		if (animDirection) return;
		if (page === 'voice' && voiceRef.current) {
			const handled = voiceRef.current.goBack();
			if (handled) return;
		}
		if (page === 'compliment' && complimentRef.current) {
			const handled = complimentRef.current.goBack();
			if (handled) return;
		}
		setAnimDirection('back');
	}

	function handleAnimationEnd(e: React.AnimationEvent) {
		if (e.target !== e.currentTarget) return;
		if (animDirection === 'back') {
			setPage('home');
		}
		setAnimDirection(null);
	}

	function dismissSplash() {
		if (splashFading) return;
		setSplashFading(true);
		setTimeout(() => setPage('home'), 400);
	}

	const subPage = page !== 'home' && page !== 'splash' ? page : null;
	const showHome = page === 'home' || animDirection !== null;

	const animClass =
		animDirection === 'forward'
			? 'slide-in'
			: animDirection === 'back'
				? 'slide-out'
				: '';

	return (
		<div className="page-wrapper">
			{page === 'splash' && (
				<div
					className={`splash${splashFading ? ' splash-fade-out' : ''}`}
					onClick={dismissSplash}
				>
					<div className="splash-icon">
						<BeanIcon size={100} />
					</div>
					<h1 className="splash-title">
						<span className="zu">Zu</span>
						<span className="bean">Bean</span>
					</h1>
					<p className="splash-greeting">{greeting}</p>
					<p className="splash-hint">tap anywhere</p>
				</div>
			)}

			{showHome && (
				<div className="app">
					<header className="header">
						<div style={{ marginBottom: '0.75rem' }}>
							<BeanIcon size={72} />
						</div>
						<h1>
							<span className="zu">Zu</span>
							<span className="bean">Bean</span>
						</h1>
					</header>

					<div className="grid">
						<div
							className="card"
							onClick={() => navigateTo('voice')}
						>
							<span className="card-icon">
								<svg width="32" height="32" viewBox="0 0 36 36" fill="none">
									<rect x="12" y="4" width="12" height="18" rx="6" stroke="#A8DCD9" strokeWidth="1.5" />
									<path d="M9 17a9 9 0 0 0 18 0" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" />
									<path d="M18 26v4M14 30h8" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							</span>
							<span className="card-label">{pageTitle.voice}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('compliment')}
						>
							<span className="card-icon">
								<svg width="32" height="32" viewBox="0 0 36 36" fill="none">
									<path d="M8 4h20a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H8z" stroke="#A8DCD9" strokeWidth="1.5" strokeLinejoin="round" />
									<path d="M8 4v28" stroke="#A8DCD9" strokeWidth="1.5" />
									<path d="M14 12h10M14 18h10M14 24h6" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							</span>
							<span className="card-label">{pageTitle.compliment}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('memory')}
						>
							<span className="card-icon">
								<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
									<rect x="4" y="6" width="24" height="20" rx="3" stroke="#A8DCD9" strokeWidth="1.5" />
									<circle cx="12" cy="14" r="3" stroke="#A8DCD9" strokeWidth="1.5" />
									<path d="M4 22l7-5 4 3 5-4 8 6" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
							<span className="card-label">{pageTitle.memory}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('countdown')}
						>
							<span className="card-icon">
								<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
									<rect x="4" y="8" width="24" height="20" rx="2.5" stroke="#A8DCD9" strokeWidth="1.5" />
									<path d="M4 14h24" stroke="#A8DCD9" strokeWidth="1.5" />
									<path d="M10 4v6M22 4v6" stroke="#A8DCD9" strokeWidth="1.5" strokeLinecap="round" />
									<circle cx="16" cy="21" r="3" stroke="#A8DCD9" strokeWidth="1.5" />
								</svg>
							</span>
							<span className="card-label">{pageTitle.countdown}</span>
						</div>
					</div>
				</div>
			)}

			{subPage && (
				<div
					className={`app sub-page ${animClass}`}
					onAnimationEnd={handleAnimationEnd}
				>
					<div className="nav-bar">
						<button
							className="nav-back"
							onClick={handleBack}
							aria-label="Go back"
						>
							&#x276E;
						</button>
						<span className="nav-title">{pageTitle[subPage]}</span>
						<div className="nav-spacer" />
					</div>
					<div className="page-content">
						{subPage === 'voice' && (
							<VoiceMessages ref={voiceRef} />
						)}
						{subPage === 'compliment' && (
							<Compliment ref={complimentRef} />
						)}
						{subPage === 'memory' && <Memory />}
						{subPage === 'countdown' && <Countdown />}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
