import { contact, footer, profile, socials } from '@/content';
import { Container } from './Container';
import { ExternalLink, textLinkClasses } from './ExternalLink';

export function Footer() {
  return (
    <footer className="border-line text-muted border-t py-8 text-[15px]">
      <Container>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div>
            <p className="text-text font-semibold">{profile.name}</p>
            <p>{profile.headline}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              <a
                href={contact.mailtoHref}
                className={`${textLinkClasses} [overflow-wrap:anywhere]`}
              >
                {contact.email}
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <ExternalLink href={social.href}>{social.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-2">
          <span>{footer.builtWith}</span>
          <span aria-hidden="true">{footer.separator}</span>
          <span>{footer.demoNotice}</span>
          <span aria-hidden="true">{footer.separator}</span>
          <ExternalLink href={footer.templateHref}>
            {footer.templateLabel}
          </ExternalLink>
        </p>
      </Container>
    </footer>
  );
}
