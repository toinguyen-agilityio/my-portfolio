import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { StoryCta } from '@/components/story/StoryCta';
import { StoryIntro } from '@/components/story/StoryIntro';
import { storySection } from '@/content';

// Exported as out/story.html, so the URL is /story (trailingSlash stays off).
export const metadata: Metadata = {
  title: storySection.seo.title,
  description: storySection.seo.description,
};

export default function StoryPage() {
  return (
    <>
      <Header current="story" />
      <main id="main" tabIndex={-1} className="outline-none">
        <StoryIntro />
        {/* Journey mount point (T15): add <StoryJourney /> here, with id="journey". */}
        {/* Hobbies mount point (T16): add <StoryHobbies /> here, with id="hobbies". */}
        <StoryCta />
      </main>
      <Footer />
    </>
  );
}
