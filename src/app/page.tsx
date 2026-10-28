import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Section } from '@/components/Section';
import { profile } from '@/content';

// The section tickets (#19, #21, #22, #23) fill in these empty sections.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hidden until the About ticket (#19) adds the real H1. */}
        <h1 className="sr-only">{profile.name}</h1>
        <Section id="about" title="About" />
        <ProjectsSection />
        <Section id="skills" title="Skills" />
        <Section id="contact" title="Contact" tone="surface" />
      </main>
      <Footer />
    </>
  );
}
