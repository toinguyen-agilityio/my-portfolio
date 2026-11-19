import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  BackLink,
  PostGallery,
  PostMeta,
  PostNav,
  TagList,
} from '@/components/story/BlogParts';
import { mdxComponents } from '@/components/story/mdx-components';
import { storyBlog } from '@/content';
import {
  getAdjacent,
  getAllParams,
  getCategory,
  getPost,
  withBasePath,
} from '@/lib/story-posts';

export const dynamicParams = false;

export const generateStaticParams = () => getAllParams();

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  const image = withBasePath(post.cover);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: image, alt: post.coverAlt }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const hobby = getCategory(category);
  const post = getPost(category, slug);
  if (!hobby || !post) notFound();
  const { prev, next } = getAdjacent(category, slug);
  return (
    <>
      <Header current="story" />
      <main id="main" tabIndex={-1} className="outline-none">
        <article className="bg-bg py-[clamp(48px,8vw,96px)]">
          <Container>
            <div className="mx-auto max-w-[72ch]">
              <BackLink
                href={`/story/${category}`}
                label={storyBlog.backToCategory.replace('{title}', hobby.title)}
              />
              <h1 className="mt-6 [overflow-wrap:anywhere]">{post.title}</h1>
              <div className="mt-4">
                <PostMeta post={post} />
              </div>
              <TagList tags={post.tags} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(post.cover)}
                alt={post.coverAlt}
                width={1200}
                height={675}
                className="mt-8 aspect-video h-auto w-full rounded-lg object-cover"
              />
              <div className="mt-6">
                <MDXRemote source={post.body} components={mdxComponents} />
              </div>
              <PostGallery post={post} />
              <PostNav category={category} prev={prev} next={next} />
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
