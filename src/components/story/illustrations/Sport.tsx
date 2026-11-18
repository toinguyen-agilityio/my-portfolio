// A running shoe and a badminton racket.
export function Sport() {
  return (
    <>
      <path
        d="M40 128V104Q40 96 50 96H78L96 84Q100 82 104 86L116 104L150 112Q158 114 158 122V128Z"
        fill="var(--bg)"
        stroke="var(--text)"
        strokeWidth="2"
      />
      <rect x="40" y="124" width="118" height="8" rx="4" fill="var(--accent)" />
      <circle cx="96" cy="104" r="3" fill="var(--ctl)" />
      <circle cx="106" cy="100" r="3" fill="var(--ctl)" />
      <line
        x1="196"
        y1="150"
        x2="236"
        y2="104"
        stroke="var(--text)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse
        cx="248"
        cy="86"
        rx="22"
        ry="30"
        transform="rotate(30 248 86)"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <line x1="248" y1="58" x2="248" y2="114" stroke="var(--ctl)" />
      <line x1="226" y1="86" x2="270" y2="86" stroke="var(--ctl)" />
    </>
  );
}
