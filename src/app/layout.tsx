/**
 * =============================================================================
 * PORTIVA: Root Layout
 * =============================================================================
 *
 * The root layout wraps every page in the application. It provides:
 *   - Google Fonts loading (Inter for body, Geist Mono for code)
 *   - Global dark theme HTML attributes
 *   - SEO metadata defaults (title template, description, Open Graph)
 *   - Viewport and theme-color configuration
 *
 * Inter was chosen over the default Geist Sans because:
 *   - Superior readability at small sizes (critical for mobile bento cards)
 *   - Excellent Arabic/Devanagari script support (Indian market)
 *   - Widely cached in browser font stores (performance win)
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

// ─── Font Configuration ─────────────────────────────────────────────────────
// next/font/google automatically self-hosts fonts at build time,
// eliminating external network requests and improving LCP.

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap', // Show fallback font immediately, swap when loaded
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ─── SEO Metadata ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: '%s — Portiva',
    default: 'Portiva — Build Your Bento Grid Micro-Website in 60 Seconds',
  },
  description:
    'Portiva is an ultra-premium bento-grid micro-website engine. Create stunning link-in-bio pages, WhatsApp storefronts, and auto dealership listings in seconds.',
  keywords: [
    'bento grid',
    'link in bio',
    'micro website',
    'WhatsApp store',
    'auto dealership',
    'portiva',
  ],
  authors: [{ name: 'Portiva' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://portiva.in',
    siteName: 'Portiva',
    title: 'Portiva — Build Your Bento Grid Micro-Website in 60 Seconds',
    description:
      'Create stunning link-in-bio pages, WhatsApp storefronts, and auto dealership listings.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portiva — Build Your Bento Grid Micro-Website in 60 Seconds',
    description:
      'Create stunning link-in-bio pages, WhatsApp storefronts, and auto dealership listings.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#08080A',
  width: 'device-width',
  initialScale: 1,
};

// ─── Root Layout Component ──────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      // Force dark color scheme at the HTML level to prevent
      // flash of white content on initial load.
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-[#08080A] text-slate-100">
        {children}
      </body>
    </html>
  );
}
