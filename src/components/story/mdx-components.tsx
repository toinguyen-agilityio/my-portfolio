import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { withBasePath } from '@/lib/story-posts';

// Elements available in post bodies. Images get the base path, so a post can write
// ![alt](/images/story/...) and it works under /my-portfolio.
export const mdxComponents: NonNullable<MDXRemoteProps['components']> = {
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
      className="h-auto w-full rounded-md"
    />
  ),
};
