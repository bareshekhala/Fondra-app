function PokeMark({ size = 13, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="12" r="3.2" fill="currentColor" />
      <path d="M13.5 8.2a5.4 5.4 0 0 1 0 7.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity=".7" />
      <path d="M17.4 5.4a9.4 9.4 0 0 1 0 13.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity=".38" />
    </svg>
  );
}

export default PokeMark;
