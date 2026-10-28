import { profile } from '@/content';
import { ThemeToggle } from './ThemeToggle';
import { Container } from './Container';
import { HeaderOffset } from './HeaderOffset';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

const navLink =
  'text-text hover:text-accent inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-medium no-underline max-[400px]:px-1.5 max-[400px]:text-[14px]';

// Sticky, except on short screens. At 640px and below the nav moves to its own row and
// the toggle stays next to the name. HeaderOffset sets --header-h from its real height; globals.css has the fallback.
export function Header() {
  return (
    <header className="border-line bg-bg sticky top-0 z-10 border-b [@media(max-height:480px)]:static">
      <Container>
        <div className="flex flex-wrap items-center gap-x-2 py-3.5 max-[640px]:py-3">
          <a
            href="#top"
            className="text-text mr-auto inline-flex min-h-11 items-center text-[18px] font-bold no-underline"
          >
            {profile.name}
          </a>
          <nav
            aria-label="Sections"
            className="flex items-center max-[640px]:order-last max-[640px]:w-full max-[640px]:-ml-1.5"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
      <HeaderOffset />
    </header>
  );
}
