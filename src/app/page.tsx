import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';

// The section tickets (#21, #22, #23) fill in these empty sections.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <About />
        <Section id="projects" title="Projects" tone="surface" />
        <Section id="skills" title="Skills" />
        <Section id="contact" title="Contact" tone="surface" />
      </main>
      <Footer />
    </>
  );
}
