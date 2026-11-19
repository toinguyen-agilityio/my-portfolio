import Link from 'next/link';
import { storyBlog } from '@/content';
import { formatDate, withBasePath, type Post } from '@/lib/story-posts';
import { Tag } from '../Tag';

const linkClass =
  'text-text hover:text-accent inline-flex min-h-11 items-center text-[15px] font-medium no-underline';

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

export function TagList({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </ul>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-muted flex flex-wrap gap-x-3 text-[14px]">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.location ? <span>{post.location}</span> : null}
    </p>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <article className="border-line bg-surface relative flex h-full flex-col overflow-hidden rounded-lg border focus-within:border-accent hover:border-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath(post.cover)}
          alt={post.coverAlt}
          width={1200}
          height={675}
          loading="lazy"
          className="aspect-video h-auto w-full object-cover"
        />
        <div className="flex flex-1 flex-col gap-2 p-5">
          <PostMeta post={post} />
          <h3 className="[overflow-wrap:anywhere]">
            <Link
              href={`/story/${post.category}/${post.slug}`}
              className="text-text no-underline after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-muted [overflow-wrap:anywhere]">{post.excerpt}</p>
          <p className="text-muted mt-auto pt-2 text-[14px]">
            {post.readingMinutes} {storyBlog.minRead}
          </p>
        </div>
      </article>
    </li>
  );
}

export function PostNav({
  category,
  prev,
  next,
}: {
  category: string;
  prev?: Post;
  next?: Post;
}) {
  if (!prev && !next) return null;
  const item = (post: Post | undefined, label: string, align: string) =>
    post ? (
      <Link
        href={`/story/${category}/${post.slug}`}
        className={`border-line hover:border-accent flex min-h-11 flex-col gap-1 rounded-lg border p-4 text-inherit no-underline ${align}`}
      >
        <span className="text-muted text-[14px]">{label}</span>
        <span className="text-text font-semibold [overflow-wrap:anywhere]">
          {post.title}
        </span>
      </Link>
    ) : (
      <span />
    );
  return (
    <nav
      aria-label={storyBlog.postNav}
      className="mt-12 grid gap-4 sm:grid-cols-2"
    >
      {item(prev, storyBlog.prev, '')}
      {item(next, storyBlog.next, 'sm:text-right')}
    </nav>
  );
}

export function PostGallery({ post }: { post: Post }) {
  if (post.gallery.length === 0) return null;
  return (
    <section aria-labelledby="gallery-title" className="mt-12">
      <h2 id="gallery-title">{storyBlog.gallery}</h2>
      <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
        {post.gallery.map((img) => (
          <li key={img.src}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(img.src)}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/3] h-auto w-full rounded-md object-cover"
              />
              {img.caption ? (
                <figcaption className="text-muted mt-2 text-[14px]">
                  {img.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
