import { useState, forwardRef, useImperativeHandle } from 'react';
import data from '../data/compliments.json';
import BeanIcon from './BeanIcon';

export type ComplimentHandle = {
	goBack: () => boolean;
};

function randomIndex(length: number, exclude?: number) {
	if (length <= 1) return 0;
	let next: number;
	do {
		next = Math.floor(Math.random() * length);
	} while (next === exclude);
	return next;
}

const sectionIcons = [
	// The House Blend — coffee mug with steam
	<svg
		key="0"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<rect
			x="6"
			y="14"
			width="17"
			height="14"
			rx="2.5"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<path
			d="M23 18h3a3 3 0 0 1 0 6h-3"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<path
			d="M12 11c0-2.5 1.5-3 1.5-3s1.5.5 1.5 3"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M17 10c0-2.5 1.5-3 1.5-3s1.5.5 1.5 3"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>,
	// Brain Buzz — lightbulb
	<svg
		key="1"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M18 5a8 8 0 0 0-5.5 13.8V23h11v-4.2A8 8 0 0 0 18 5z"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<path
			d="M14.5 26h7M15.5 29h5"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M18 9v3M14.5 10.5l1 2M21.5 10.5l-1 2"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>,
	// Stubborn Spice — flame
	<svg
		key="2"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M18 4c0 0-8 8-8 16a8 8 0 0 0 16 0c0-8-8-16-8-16z"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<path
			d="M18 14c0 0-3 3.5-3 7a3 3 0 0 0 6 0c0-3.5-3-7-3-7z"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
	</svg>,
	// Soft Serve — ice cream cone
	<svg
		key="3"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M13 18l5 16 5-16"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
		<circle
			cx="13.5"
			cy="15"
			r="4"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="22.5"
			cy="15"
			r="4"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="18"
			cy="13"
			r="5.5"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
	</svg>,
	// Heart Rate Spike — heart with pulse
	<svg
		key="4"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M18 30l-1.5-1.4C8 21 4 17.4 4 13a7 7 0 0 1 7-7c2.2 0 4.3 1 5.6 2.6h2.8A7 7 0 0 1 32 13c0 4.4-4 8-12.5 15.6L18 30z"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<path
			d="M6 18h6l2-4 3 8 2.5-6 2 2H28"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>,
	// Cat Approved — cat face
	<svg
		key="5"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M7 14l4-10 5 6h4l5-6 4 10"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
		<circle
			cx="18"
			cy="20"
			r="10"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="14"
			cy="18"
			r="1.5"
			fill="#A8DCD9"
		/>
		<circle
			cx="22"
			cy="18"
			r="1.5"
			fill="#A8DCD9"
		/>
		<ellipse
			cx="18"
			cy="22"
			rx="1.2"
			ry="1"
			fill="#A8DCD9"
		/>
		<path
			d="M16.8 22c-1.5 1.2-3 1.5-4.5 1M19.2 22c1.5 1.2 3 1.5 4.5 1"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>,
	// Cosmic Combo — stars connected
	<svg
		key="6"
		width="40"
		height="40"
		viewBox="0 0 36 36"
		fill="none"
	>
		<path
			d="M15 13.5l8 8M14 14l-3.5 9.5M23.5 11.5l-8-1"
			stroke="#A8DCD9"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<circle
			cx="12"
			cy="12"
			r="4"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="25"
			cy="24"
			r="4"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="26"
			cy="10"
			r="2.5"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
		<circle
			cx="10"
			cy="26"
			r="2.5"
			stroke="#A8DCD9"
			strokeWidth="1.5"
		/>
	</svg>,
];

const CARD_HEIGHT = 300;

const Compliment = forwardRef<ComplimentHandle>(function Compliment(_, ref) {
	const [sectionIndex, setSectionIndex] = useState<number | null>(null);
	const [entryIndex, setEntryIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [shuffling, setShuffling] = useState(false);

	useImperativeHandle(ref, () => ({
		goBack() {
			if (sectionIndex !== null) {
				setSectionIndex(null);
				setFlipped(false);
				setShuffling(false);
				return true;
			}
			return false;
		},
	}));

	function pickSection(i: number) {
		setSectionIndex(i);
		setEntryIndex(randomIndex(data.sections[i].entries.length));
		setFlipped(false);
		setShuffling(false);
	}

	function anotherOne() {
		if (sectionIndex === null || shuffling) return;
		setShuffling(true);
		setFlipped(false);
		setEntryIndex(
			randomIndex(data.sections[sectionIndex].entries.length, entryIndex),
		);
	}

	if (sectionIndex !== null) {
		const section = data.sections[sectionIndex];
		return (
			<div
				style={{
					textAlign: 'center',
					marginTop: '2rem',
					padding: '0 0.5rem',
				}}
			>
				<p
					style={{
						fontSize: '0.85rem',
						color: 'var(--mint)',
						marginBottom: '1.5rem',
						textTransform: 'uppercase',
						letterSpacing: '2px',
					}}
				>
					{section.title}
				</p>

				<div
					style={{
						perspective: '1000px',
						cursor: shuffling ? 'default' : 'pointer',
						animation: shuffling
							? 'cardShuffle 0.8s cubic-bezier(0.4, 0, 0.2, 1) both'
							: 'none',
					}}
					onClick={() => {
						if (!flipped && !shuffling) setFlipped(true);
					}}
					onAnimationEnd={(e) => {
						if (e.target === e.currentTarget) setShuffling(false);
					}}
				>
					<div
						style={{
							position: 'relative',
							height: CARD_HEIGHT,
							transformStyle: 'preserve-3d',
							transition: shuffling
								? 'none'
								: 'transform 0.6s ease',
							transform: flipped
								? 'rotateY(180deg)'
								: 'rotateY(0)',
						}}
					>
						{/* Front — bean logo + tap to reveal */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backfaceVisibility: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '1rem',
								background: 'var(--bg-card)',
								borderRadius: '1rem',
								border: '1px solid rgba(168, 220, 217, 0.1)',
								boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
							}}
						>
							<BeanIcon
								size={64}
								showSteam={false}
							/>
							<p
								style={{
									fontSize: '0.8rem',
									color: 'var(--muted)',
									letterSpacing: '1px',
								}}
							>
								tap to reveal
							</p>
						</div>

						{/* Back — compliment text */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backfaceVisibility: 'hidden',
								transform: 'rotateY(180deg)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '1.5rem',
								background: 'var(--bg-card)',
								borderRadius: '1rem',
								border: '1px solid rgba(168, 220, 217, 0.1)',
								boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
							}}
						>
							<p
								style={{
									fontSize: '1.05rem',
									lineHeight: 1.8,
									color: 'var(--text-muted)',
								}}
							>
								{section.entries[entryIndex]}
							</p>
						</div>
					</div>
				</div>

				<button
					onClick={anotherOne}
					style={{
						marginTop: '1.5rem',
						background: 'var(--bg-card)',
						color: 'var(--mint)',
						border: '1px solid rgba(168, 220, 217, 0.15)',
						borderRadius: '2rem',
						padding: '0.75rem 2rem',
						fontSize: '0.9rem',
						fontFamily: "'Georgia', serif",
						fontWeight: 600,
						cursor: 'pointer',
					}}
				>
					Another one!
				</button>
			</div>
		);
	}

	return (
		<div>
			<p
				style={{
					textAlign: 'center',
					fontSize: '1.4rem',
					fontWeight: 700,
					color: 'var(--text)',
				}}
			>
				{data.prompt}
			</p>
			<div
				style={{
					width: '3rem',
					height: '2px',
					background: 'var(--mint)',
					margin: '1rem auto 1.75rem',
					borderRadius: '1px',
					opacity: 0.5,
				}}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.75rem',
				}}
			>
				{data.sections.map((section, i) => (
					<div
						key={i}
						onClick={() => pickSection(i)}
						style={{
							background: 'var(--bg-card)',
							borderRadius: '0.75rem',
							padding: '1.15rem 1.25rem',
							border: '1px solid rgba(168, 220, 217, 0.1)',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<div style={{ flexShrink: 0, lineHeight: 0 }}>
							{sectionIcons[i]}
						</div>
						<div style={{ flex: 1 }}>
							<div
								style={{
									fontSize: '0.95rem',
									fontWeight: 700,
									color: 'var(--accent)',
									marginBottom: '0.4rem',
								}}
							>
								{section.title}
							</div>
							<div
								style={{
									fontSize: '0.78rem',
									color: 'var(--muted)',
									lineHeight: 1.6,
								}}
							>
								{section.description}
							</div>
						</div>
						<span
							style={{
								color: 'var(--muted)',
								fontSize: '0.9rem',
								flexShrink: 0,
							}}
						>
							&#x276F;
						</span>
					</div>
				))}
			</div>
		</div>
	);
});

export default Compliment;
