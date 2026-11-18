import { storySection } from '@/content';
import { Section } from '../Section';
import { HobbyCard } from './HobbyCard';

// "Beyond work": any number of cards, so a cloner only edits storySection.hobbies.items.
export function HobbiesSection() {
  const { title, intro, items } = storySection.hobbies;
  return (
    <Section id="hobbies" title={title} intro={intro}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
        {items.map((hobby) => (
          <HobbyCard key={hobby.title} hobby={hobby} />
        ))}
      </ul>
    </Section>
  );
}
