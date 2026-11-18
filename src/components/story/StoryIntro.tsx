import { storySection } from '@/content';
import { getBasePath } from '@/lib/base-path';
import { Container } from '../Container';
import { Portrait } from '../Portrait';

// The My Story hero. It owns the page's only H1, so it does not use Section (which renders an H2).
export function StoryIntro() {
  return (
    <section
      aria-labelledby="story-title"
      className="bg-bg py-[clamp(48px,8vw,96px)]"
    >
      <Container>
        {/* Plain link: a full page load is fine on a static site, and the base path must be added. */}
        <a
          href={`${getBasePath()}/`}
          className="text-text inline-flex min-h-11 items-center text-[15px] font-medium no-underline hover:text-accent"
        >
          {storySection.backLabel}
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-x-16 gap-y-10">
          <div className="min-w-0 flex-1 basis-[320px]">
            <p className="text-accent text-[15px] font-semibold [overflow-wrap:anywhere]">
              {storySection.eyebrow}
            </p>
            <h1 id="story-title" className="mt-3 [overflow-wrap:anywhere]">
              {storySection.title}
            </h1>
            <p className="text-muted mt-5 max-w-[56ch] text-[clamp(17px,2vw,19px)] [overflow-wrap:anywhere]">
              {storySection.lead}
            </p>
          </div>
          <Portrait label={storySection.portraitAlt} />
        </div>
      </Container>
    </section>
  );
}
