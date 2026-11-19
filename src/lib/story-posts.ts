import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { storySection } from '@/content';
import { getBasePath } from './base-path';

// Posts are MDX files in content/story/<category>/<slug>.mdx. Adding a post means adding one file
// (plus its images under public/). Bad frontmatter throws, so the build fails instead of
// shipping a broken page.

export type PostImage = { src: string; alt: string; caption?: string };

export type Post = {
  category: string;
  slug: string;
  title: string;
  date: string;
  location?: string;
  cover: string;
  coverAlt: string;
  excerpt: string;
  tags: string[];
  gallery: PostImage[];
  body: string;
  readingMinutes: number;
};

const ROOT = join(process.cwd(), 'content', 'story');

export const categorySlugs = () =>
  storySection.hobbies.items.map((h) => h.slug);

export const getCategory = (slug: string) =>
  storySection.hobbies.items.find((h) => h.slug === slug);

// Prefixes a root-relative path (an image under public/) with the base path.
export function withBasePath(path: string) {
  return /^(https?:)?\/\//.test(path) ? path : `${getBasePath()}${path}`;
}

export function readingMinutes(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function str(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${file}: frontmatter "${key}" must be a non-empty string`);
  }
  return value;
}

function parse(category: string, file: string): Post {
  const slug = file.replace(/\.mdx$/, '');
  const path = `content/story/${category}/${file}`;
  const { data, content } = matter(
    readFileSync(join(ROOT, category, file), 'utf8'),
  );
  // gray-matter turns an unquoted YAML date into a Date.
  const rawDate =
    data.date instanceof Date ? data.date.toISOString() : data.date;
  const date = String(rawDate ?? '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`${path}: frontmatter "date" must be YYYY-MM-DD`);
  }
  if (data.category !== category) {
    throw new Error(`${path}: frontmatter "category" must be "${category}"`);
  }
  const tags: unknown = data.tags ?? [];
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string')) {
    throw new Error(`${path}: frontmatter "tags" must be a list of strings`);
  }
  const gallery: unknown = data.gallery ?? [];
  if (
    !Array.isArray(gallery) ||
    gallery.some(
      (g) => typeof g?.src !== 'string' || typeof g?.alt !== 'string',
    )
  ) {
    throw new Error(`${path}: "gallery" items need "src" and "alt"`);
  }
  return {
    category,
    slug,
    title: str(data, 'title', path),
    date,
    location: typeof data.location === 'string' ? data.location : undefined,
    cover: str(data, 'cover', path),
    coverAlt: str(data, 'coverAlt', path),
    excerpt: str(data, 'excerpt', path),
    tags: tags as string[],
    gallery: gallery as PostImage[],
    body: content,
    readingMinutes: readingMinutes(content),
  };
}

// Newest first.
export function getPosts(category: string): Post[] {
  const dir = join(ROOT, category);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => parse(category, f))
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export const getPost = (category: string, slug: string) =>
  getPosts(category).find((p) => p.slug === slug);

// Newer post is "prev", older is "next", matching the newest-first list.
export function getAdjacent(category: string, slug: string) {
  const posts = getPosts(category);
  const i = posts.findIndex((p) => p.slug === slug);
  return { prev: posts[i - 1], next: posts[i + 1] };
}

export const getAllParams = () =>
  categorySlugs().flatMap((category) =>
    getPosts(category).map((p) => ({ category, slug: p.slug })),
  );

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
