import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { BackLink, PostCard, TagList } from '@/components/story/BlogParts';
import { storyBlog } from '@/content';
import { categorySlugs, getCategory, getPosts } from '@/lib/story-posts';

// Only the known categories exist; anything else is the 404 page.
export const dynamicParams = false;

export const generateStaticParams = () =>
  categorySlugs().map((category) => ({ category }));

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hobby = getCategory((await params).category);
  if (!hobby) return {};
  return {
    title: `${hobby.title} - ${storyBlog.postsTitle}`,
    description: hobby.text,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const hobby = getCategory(category);
  if (!hobby) notFound();
  const posts = getPosts(category);
  return (
    <>
      <Header current="story" />
      <main id="main" tabIndex={-1} className="outline-none">
        <section
          aria-labelledby="category-title"
          className="bg-bg py-[clamp(48px,8vw,96px)]"
        >
          <Container>
            <BackLink href="/story" label={storyBlog.backToStory} />
            <h1 id="category-title" className="mt-6 [overflow-wrap:anywhere]">
              {hobby.title}
            </h1>
            <p className="text-muted mt-5 max-w-[56ch] text-[clamp(17px,2vw,19px)] [overflow-wrap:anywhere]">
              {hobby.text}
            </p>
            <TagList tags={hobby.tags} />
          </Container>
        </section>
        <section
          aria-labelledby="posts-title"
          className="bg-bg pb-[clamp(48px,8vw,96px)]"
        >
          <Container>
            <h2 id="posts-title">{storyBlog.postsTitle}</h2>
            {posts.length > 0 ? (
              <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </ul>
            ) : (
              <p className="border-line bg-surface text-muted mt-8 rounded-lg border p-6">
                {storyBlog.empty}
              </p>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
