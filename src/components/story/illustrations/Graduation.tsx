// A mortarboard with a tassel, next to an open laptop.
export function Graduation() {
  return (
    <>
      <rect
        x="168"
        y="60"
        width="112"
        height="76"
        rx="8"
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth="2"
      />
      <rect x="182" y="74" width="50" height="6" rx="3" fill="var(--text)" />
      <rect x="182" y="88" width="84" height="5" rx="2.5" fill="var(--muted)" />
      <rect
        x="182"
        y="100"
        width="64"
        height="5"
        rx="2.5"
        fill="var(--muted)"
      />
      <rect x="156" y="138" width="136" height="10" rx="5" fill="var(--ctl)" />
      <polygon points="34,74 98,50 162,74 98,98" fill="var(--text)" />
      <path d="M66 86V108Q98 124 130 108V86L98 98Z" fill="var(--accent)" />
      <line
        x1="150"
        y1="76"
        x2="150"
        y2="100"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <circle cx="150" cy="102" r="4" fill="var(--accent)" />
    </>
  );
}
