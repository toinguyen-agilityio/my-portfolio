import { contact, contactSection, socials } from '@/content';
import { buttonClasses } from './Button';
import { ExternalLink } from './ExternalLink';
import { Section } from './Section';

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <Section
      id="contact"
      title={contactSection.title}
      intro={contact.intro}
      tone="surface"
    >
      <p className="text-muted text-[15px] font-medium">
        {contactSection.emailLabel}
      </p>
      {/* The address is visible text, so it can be read and copied with no mail client. */}
      <a
        href={contact.mailtoHref}
        className="text-accent mt-1 inline-block text-[clamp(18px,3.4vw,28px)] font-semibold underline decoration-1 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-2"
      >
        {contact.email}
      </a>
      <ul className="mt-8 flex flex-wrap gap-3">
        {socials.map((social) => (
          <li key={social.label}>
            <ExternalLink
              href={social.href}
              className={buttonClasses('secondary')}
            >
              {social.label}
              <ArrowIcon />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
