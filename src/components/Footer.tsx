import { profile } from '@/content';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-line text-muted border-t py-8 text-[15px]">
      <Container>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2">
          <span>{profile.name}</span>
          <span>Built with Next.js</span>
        </div>
      </Container>
    </footer>
  );
}
