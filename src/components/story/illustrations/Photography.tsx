// A film camera with a lens, a viewfinder and a flash.
export function Photography() {
  return (
    <>
      <rect x="70" y="70" width="180" height="88" rx="12" fill="var(--text)" />
      <rect x="84" y="56" width="60" height="18" rx="4" fill="var(--ctl)" />
      <rect
        x="212"
        y="52"
        width="32"
        height="22"
        rx="4"
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth="2"
      />
      <rect x="92" y="84" width="20" height="12" rx="2" fill="var(--bg)" />
      <circle cx="238" cy="80" r="5" fill="var(--accent)" />
      <circle cx="160" cy="114" r="34" fill="var(--ctl)" />
      <circle cx="160" cy="114" r="24" fill="var(--bg)" />
      <circle cx="160" cy="114" r="12" fill="var(--accent)" />
      <circle cx="154" cy="108" r="3" fill="var(--surface)" />
    </>
  );
}
