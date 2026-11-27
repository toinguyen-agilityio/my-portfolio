import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { withBasePath } from '@/lib/story-posts';

export function FoodCards({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4 p-0">
      {children}
    </ul>
  );
}

export function FoodCard({
  src,
  alt,
  name,
  note,
  price,
}: {
  src: string;
  alt: string;
  name: string;
  note: string;
  price: string;
}) {
  return (
    <li className="border-line bg-surface overflow-hidden rounded-lg border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath(src)}
        alt={alt}
        width={1200}
        height={900}
        loading="lazy"
        className="aspect-[4/3] h-auto w-full object-cover"
      />
      <div className="p-4">
        <p className="text-text m-0 font-medium">{name}</p>
        <p className="text-muted mt-1 mb-0 text-[14px]">{note}</p>
        <p className="text-text mt-2 mb-0 text-[14px] font-medium">{price}</p>
      </div>
    </li>
  );
}

// Elements available in post bodies. Images get the base path, so a post can write
// ![alt](/images/story/...) and it works under /my-portfolio.
export const mdxComponents: NonNullable<MDXRemoteProps['components']> = {
  FoodCards,
  FoodCard,
  h2: ({ children, ...p }) => (
    <h2 className="mt-10 mb-3 [overflow-wrap:anywhere]" {...p}>
      {children}
    </h2>
  ),
  h3: ({ children, ...p }) => (
    <h3 className="mt-8 mb-2 [overflow-wrap:anywhere]" {...p}>
      {children}
    </h3>
  ),
  p: (p) => (
    <p
      className="text-text my-4 leading-relaxed [overflow-wrap:anywhere]"
      {...p}
    />
  ),
  ul: (p) => <ul className="my-4 list-disc pl-6" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal pl-6" {...p} />,
  a: ({ children, ...p }) => (
    <a className="text-accent underline" {...p}>
      {children}
    </a>
  ),
  blockquote: (p) => (
    <blockquote
      className="border-line text-muted my-6 border-l-4 pl-4"
      {...p}
    />
  ),
  figure: (p) => <figure className="my-8" {...p} />,
  figcaption: (p) => (
    <figcaption className="text-muted mt-2 text-[14px]" {...p} />
  ),
  img: ({ src, alt, ...rest }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={typeof src === 'string' ? withBasePath(src) : undefined}
      alt={alt ?? ''}
      loading="lazy"
      width={1200}
      height={900}
      className="aspect-[4/3] h-auto w-full rounded-md object-cover"
    />
  ),
};
