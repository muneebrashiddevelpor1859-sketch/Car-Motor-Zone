export default function Logo({ light = false }) {
  return (
    <div className="logo">
      <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="#d9b982" /><stop offset="1" stopColor="#9a7138" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="18" fill="#12151a" />
        <path d="M14 44 L24 20 H34 C40 20 42 24 40 28 C38 31 36 32 34 32 C38 32 41 35 39 39 C37 43 34 44 30 44 Z M24 27 L20 38 H29 C31 38 32 37 33 35 C34 33 33 32 31 32 H26 L28 27 Z" fill="url(#g)" fillRule="evenodd" />
        <path d="M42 46 H54 M46 40 H56" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div style={{ color: light ? '#fff' : '#12151a' }}>
        <b>MOTOR ZONE</b>
        <small>PREMIUM AUTO WORKSHOP</small>
      </div>
    </div>
  );
}
