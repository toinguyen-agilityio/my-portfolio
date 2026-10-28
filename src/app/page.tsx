import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main>
      <h1>Huy Pham</h1>
      {/* Temporary spot: the header ticket (#18) moves the toggle into the header. */}
      <ThemeToggle />
    </main>
  );
}
