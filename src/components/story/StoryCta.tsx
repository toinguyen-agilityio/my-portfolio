import { storySection } from '@/content';
import { Button } from '../Button';
import { Section } from '../Section';

// Closing call to action. Its id is story-cta, not contact: the home page owns #contact.
export function StoryCta() {
  const { cta } = storySection;
  return (
    <Section id="story-cta" title={cta.title} intro={cta.text} tone="surface">
      <div className="flex flex-wrap gap-3">
        <Button href="/#contact">{cta.contactLabel}</Button>
        <Button href="/#projects" variant="secondary">
          {cta.projectsLabel}
        </Button>
      </div>
    </Section>
  );
}
