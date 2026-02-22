const BeanIcon = ({ size = 120, showSteam = true }: { size?: number; showSteam?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="#3B2314" />
    <circle cx="60" cy="60" r="54" fill="#5C3A1E" />
    <defs>
      <radialGradient id="glow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#D4956B" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#5C3A1E" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="beanGrad" x1="40" y1="35" x2="80" y2="95">
        <stop offset="0%" stopColor="#D4956B" />
        <stop offset="50%" stopColor="#C17D4F" />
        <stop offset="100%" stopColor="#8B5E3C" />
      </linearGradient>
      <linearGradient id="steamGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#D4956B" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D4956B" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="54" fill="url(#glow)" />
    {showSteam && (
      <g opacity="0.5">
        <path d="M50 38 Q48 30 50 22 Q52 16 50 10" stroke="url(#steamGrad)" strokeWidth="2" strokeLinecap="round" fill="none">
          <animate attributeName="d" dur="3s" repeatCount="indefinite"
            values="M50 38 Q48 30 50 22 Q52 16 50 10;M50 38 Q53 30 50 22 Q47 16 50 10;M50 38 Q48 30 50 22 Q52 16 50 10" />
          <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.5;0.8;0.5" />
        </path>
        <path d="M60 35 Q58 27 60 19 Q62 13 60 7" stroke="url(#steamGrad)" strokeWidth="2" strokeLinecap="round" fill="none">
          <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
            values="M60 35 Q58 27 60 19 Q62 13 60 7;M60 35 Q63 27 60 19 Q57 13 60 7;M60 35 Q58 27 60 19 Q62 13 60 7" />
          <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.6;0.3;0.6" />
        </path>
        <path d="M70 38 Q68 30 70 22 Q72 16 70 10" stroke="url(#steamGrad)" strokeWidth="2" strokeLinecap="round" fill="none">
          <animate attributeName="d" dur="3.5s" repeatCount="indefinite"
            values="M70 38 Q68 30 70 22 Q72 16 70 10;M70 38 Q73 30 70 22 Q67 16 70 10;M70 38 Q68 30 70 22 Q72 16 70 10" />
          <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0.4;0.7;0.4" />
        </path>
      </g>
    )}
    <ellipse cx="60" cy="68" rx="22" ry="30" fill="url(#beanGrad)" transform="rotate(-15 60 68)" />
    <path d="M54 45 Q58 58 62 68 Q66 78 58 92" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <ellipse cx="52" cy="58" rx="6" ry="12" fill="#E8B78E" opacity="0.25" transform="rotate(-20 52 58)" />
  </svg>
)

export default BeanIcon
