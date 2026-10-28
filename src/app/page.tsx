import { About } from '@/components/About';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { SkillsSection } from '@/components/SkillsSection';

// The Projects ticket (#21) fills in the last empty section.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <About />
        <Section id="projects" title="Projects" tone="surface" />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
