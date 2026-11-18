import type {
  StoryImage as StoryImageContent,
  StoryImageKind,
} from '@/content';
import { Graduation } from './illustrations/Graduation';
import { Photography } from './illustrations/Photography';
import { Sport } from './illustrations/Sport';
import { Travel } from './illustrations/Travel';

const illustrations = {
  graduation: Graduation,
  travel: Travel,
  sport: Sport,
  photography: Photography,
} satisfies Record<StoryImageKind, () => React.JSX.Element>;

export type StoryImageRatio = 'video' | 'wide';

// The viewBox sets the aspect ratio, so the SVG keeps its shape at any width. `wide` crops the
// same 320x180 drawing to its middle band (16:7), so every shape must stay between y=20 and y=160.
const viewBoxes: Record<StoryImageRatio, string> = {
  video: '0 0 320 180',
  wide: '0 20 320 140',
};

// Theme-aware: every color is a design token, so the drawing follows light and dark.
// `alt` from content.ts is the accessible name.
export function StoryImage({
  image,
  ratio,
}: {
  image: StoryImageContent;
  ratio: StoryImageRatio;
}) {
  const Illustration = illustrations[image.kind];
  return (
    <svg
      role="img"
      aria-label={image.alt}
      viewBox={viewBoxes[ratio]}
      width="100%"
      className="block h-auto max-w-full"
    >
      <rect width="320" height="180" rx="12" fill="var(--surface)" />
      <Illustration />
    </svg>
  );
}
