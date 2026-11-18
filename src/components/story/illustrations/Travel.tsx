// A suitcase, a paper plane and a map pin. The two uses of this kind in content.ts name
// different objects, so the drawing shows all of them.
export function Travel() {
  return (
    <>
      <path
        d="M80 84V74Q80 66 88 66H110Q118 66 118 74V84"
        fill="none"
        stroke="var(--text)"
        strokeWidth="5"
      />
      <rect x="52" y="84" width="94" height="64" rx="8" fill="var(--accent)" />
      <rect x="52" y="112" width="94" height="6" fill="var(--on-accent)" />
      <polygon
        points="180,44 280,78 218,88"
        fill="var(--bg)"
        stroke="var(--text)"
        strokeWidth="2"
      />
      <polygon points="218,88 200,112 196,90" fill="var(--ctl)" />
      <path
        d="M262 150C252 136 250 130 250 126A12 12 0 0 1 274 126C274 130 272 136 262 150Z"
        fill="var(--accent)"
      />
      <circle cx="262" cy="126" r="4" fill="var(--surface)" />
    </>
  );
}
