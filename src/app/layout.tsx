import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { seo } from '@/content';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
