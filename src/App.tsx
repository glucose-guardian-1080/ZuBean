import { useState, useRef } from 'react';
import './App.css';
import BeanIcon from './components/BeanIcon';
import VoiceMessages from './components/VoiceMessages';
import type { VoiceMessagesHandle } from './components/VoiceMessages';
import Compliment from './components/Compliment';
import type { ComplimentHandle } from './components/Compliment';
import Memory from './components/Memory';
import Countdown from './components/Countdown';

type Page = 'home' | 'voice' | 'compliment' | 'memory' | 'countdown';

const pageTitle: Record<Exclude<Page, 'home'>, string> = {
	voice: 'Sound Bites',
	compliment: 'Serotonin Menu',
	memory: 'Origin Story',
	countdown: 'Pending Arrival',
};

function App() {
	const [page, setPage] = useState<Page>('home');
	const [animDirection, setAnimDirection] = useState<
		'forward' | 'back' | null
	>(null);
	const voiceRef = useRef<VoiceMessagesHandle>(null);
	const complimentRef = useRef<ComplimentHandle>(null);

	function navigateTo(target: Exclude<Page, 'home'>) {
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

	const subPage = page !== 'home' ? page : null;
	const showHome = page === 'home' || animDirection !== null;

	const animClass =
		animDirection === 'forward'
			? 'slide-in'
			: animDirection === 'back'
				? 'slide-out'
				: '';

	return (
		<div className="page-wrapper">
			{showHome && (
				<div className="app">
					<header className="header">
						<div
							style={{
								borderRadius: 20,
								overflow: 'hidden',
								display: 'inline-block',
								boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
								marginBottom: '0.75rem',
							}}
						>
							<BeanIcon size={72} />
						</div>
						<h1>
							<span className="zu">Zu</span>
							<span className="bean">Bean</span>
						</h1>
						<p>little moments, big warmth</p>
					</header>

					<div className="grid">
						<div
							className="card"
							onClick={() => navigateTo('voice')}
						>
							<span className="card-icon">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<rect
										x="10"
										y="4"
										width="12"
										height="20"
										rx="6"
										fill="#3D7A77"
										opacity="0.25"
										stroke="#A8DCD9"
										strokeWidth="1.5"
									/>
									<path
										d="M8 18a8 8 0 0 0 16 0"
										stroke="#A8DCD9"
										strokeWidth="1.5"
										strokeLinecap="round"
										fill="none"
									/>
									<path
										d="M16 26v3M12 29h8"
										stroke="#A8DCD9"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
							</span>
							<span className="card-label">{pageTitle.voice}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('compliment')}
						>
							<span className="card-icon">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<circle
										cx="16"
										cy="16"
										r="8"
										fill="#3D7A77"
										opacity="0.3"
									/>
									<path
										d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8"
										stroke="#A8DCD9"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</svg>
							</span>
							<span className="card-label">{pageTitle.compliment}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('memory')}
						>
							<span className="card-icon">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<rect
										x="4"
										y="6"
										width="24"
										height="20"
										rx="3"
										fill="#3D7A77"
										opacity="0.25"
										stroke="#A8DCD9"
										strokeWidth="1.5"
									/>
									<circle
										cx="12"
										cy="14"
										r="3"
										fill="#A8DCD9"
										opacity="0.6"
									/>
									<path
										d="M4 22l7-5 4 3 5-4 8 6"
										stroke="#A8DCD9"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
									/>
								</svg>
							</span>
							<span className="card-label">{pageTitle.memory}</span>
						</div>
						<div
							className="card"
							onClick={() => navigateTo('countdown')}
						>
							<span className="card-icon">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
								>
									<path
										d="M11 4h10M16 4v3"
										stroke="#A8DCD9"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
									<path
										d="M10 8h12l-2 8 2 8H10l2-8-2-8z"
										fill="#3D7A77"
										opacity="0.25"
										stroke="#A8DCD9"
										strokeWidth="1.5"
										strokeLinejoin="round"
									/>
									<path
										d="M13 16h6"
										stroke="#A8DCD9"
										strokeWidth="1.2"
										strokeLinecap="round"
										opacity="0.5"
									/>
									<path
										d="M14 20l2 4 2-4"
										fill="#A8DCD9"
										opacity="0.4"
									/>
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
