import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 font-semibold no-underline transition-colors';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110',
  secondary: 'border border-ctl text-text hover:bg-surface',
};

// Class list shared by Button and by ExternalLink when a link must look like a button.
export function buttonClasses(variant: ButtonVariant = 'primary') {
  return `${base} ${variants[variant]}`;
}

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

// A button-looking link. It is an <a> because every button on this page navigates.
export function Button({ href, variant = 'primary', children }: ButtonProps) {
  return (
    <a href={href} className={buttonClasses(variant)}>
      {children}
    </a>
  );
}
