import { timeline, timelineSection } from '@/content';
import { Section } from './Section';

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      title={timelineSection.title}
      intro={timelineSection.intro}
      tone="surface"
    >
      <ol className="border-line ml-2 border-l">
        {timeline.map((entry) => (
          <li
            key={`${entry.title}-${entry.period}`}
            className="relative pb-10 pl-6 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="bg-bg border-line absolute top-1.5 -left-[5px] size-2.5 rounded-full border"
            />
            <p className="text-muted text-sm">
              <span className="font-semibold">
                {timelineSection.kindLabels[entry.kind]}
              </span>{' '}
              · <time>{entry.period}</time>
            </p>
            <h3 className="mt-1 text-base font-semibold [overflow-wrap:anywhere]">
              {entry.title}, {entry.organization}
            </h3>
            <p className="text-muted mt-2 max-w-[56ch] [overflow-wrap:anywhere]">
              {entry.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
