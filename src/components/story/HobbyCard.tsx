import Link from 'next/link';
import { storyBlog, type Hobby } from '@/content';
import { Tag } from '../Tag';
import { StoryImage } from './StoryImage';

// A hobby card that links to /story/<slug>. Renders an <li>, so put it inside a <ul>. The whole
// card is one link (next/link adds the base path), with a lift and border on hover and focus.
// `h-full` makes every card as tall as the tallest one in its row.
export function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <li>
      <Link
        href={`/story/${hobby.slug}`}
        aria-label={storyBlog.cardLabel.replace('{title}', hobby.title)}
        className="group border-line bg-surface hover:border-accent focus-visible:border-accent flex h-full flex-col gap-3 overflow-hidden rounded-lg border p-5 text-inherit no-underline transition-[transform,border-color] duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {hobby.image ? (
          <div className="aspect-video overflow-hidden rounded-md">
            <StoryImage image={hobby.image} ratio="video" />
          </div>
        ) : null}
        <h3 className="[overflow-wrap:anywhere]">{hobby.title}</h3>
        <p className="text-muted [overflow-wrap:anywhere]">{hobby.text}</p>
        {hobby.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2 pt-2">
            {hobby.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        ) : null}
        <span className="text-accent mt-auto pt-2 text-[15px] font-semibold group-hover:underline">
          {storyBlog.readStories}
        </span>
      </Link>
    </li>
  );
}
