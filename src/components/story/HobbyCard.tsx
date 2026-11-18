import type { Hobby } from '@/content';
import { Tag } from '../Tag';
import { StoryImage } from './StoryImage';

// A hobby card. Renders an <li>, so put it inside a <ul>. Not clickable, so no hover, focus
// ring or pointer cursor. `h-full` makes every card as tall as the tallest one in its row.
export function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <li>
      <article className="border-line bg-surface flex h-full flex-col gap-3 overflow-hidden rounded-lg border p-5">
        {hobby.image ? (
          <div className="aspect-video overflow-hidden rounded-md">
            <StoryImage image={hobby.image} ratio="video" />
          </div>
        ) : null}
        <h3 className="[overflow-wrap:anywhere]">{hobby.title}</h3>
        <p className="text-muted [overflow-wrap:anywhere]">{hobby.text}</p>
        {hobby.tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {hobby.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  );
}
