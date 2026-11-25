import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { ExternalLink } from '@/components/ExternalLink';
import { Footer } from '@/components/Footer';
import { MinimalHeader } from '@/components/MinimalHeader';
import { Tag } from '@/components/Tag';
import { Thumbnail } from '@/components/thumbnails/Thumbnail';
import { projects, projectsSection } from '@/content';

export const dynamicParams = false;

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = find((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const project = find((await params).slug);
  if (!project) notFound();
  return (
    <>
      <MinimalHeader />
      <main
        id="main"
        tabIndex={-1}
        className="py-[clamp(48px,8vw,96px)] outline-none"
      >
        <Container>
          <article className="mx-auto max-w-[72ch]">
            <Link
              href="/#projects"
              className="text-accent inline-flex min-h-11 items-center underline underline-offset-4"
            >
              {projectsSection.backLabel}
            </Link>
            <h1 className="mt-4 [overflow-wrap:anywhere]">{project.title}</h1>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </ul>
            <div
              role="img"
              aria-label={project.thumbnailAlt}
              className="border-line mt-8 overflow-hidden rounded-lg border"
            >
              <Thumbnail kind={project.thumbnail} />
            </div>
            <p className="text-muted mt-8 [overflow-wrap:anywhere]">
              {project.overview}
            </p>
            <h2 className="mt-8">{projectsSection.highlightsTitle}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 [overflow-wrap:anywhere]">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h2 className="mt-8">{projectsSection.linksTitle}</h2>
            <div className="flex flex-wrap gap-x-5">
              <ExternalLink href={project.demoUrl}>
                {projectsSection.demoLabel}
                <span className="sr-only"> of {project.title}</span>
              </ExternalLink>
              <ExternalLink href={project.sourceUrl}>
                {projectsSection.sourceLabel}
                <span className="sr-only"> code of {project.title}</span>
              </ExternalLink>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
