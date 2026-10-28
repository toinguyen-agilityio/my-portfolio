import { About } from '@/components/About';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <About />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
