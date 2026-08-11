import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit, Geist_Mono, Cormorant_Garamond, Instrument_Serif } from 'next/font/google';
import './globals.css';

// ─── Font Configuration ─────────────────────────────────────────────────────
// Plus Jakarta Sans — Primary body font: clean, geometric, excellent readability
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

// Outfit — Display / heading font: modern, clean geometric sans with character
const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Geist Mono — Code / monospace font: clean developer aesthetic
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Cormorant Garamond — Editorial serif font
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Instrument Serif — Editorial display font
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

// ─── SEO Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    template: '%s — Portiva',
    default: 'Portiva — Build Your Website in Minutes',
  },
  description:
    'Portiva is a premium website builder for creators and businesses. Build stunning micro-websites, storefronts, and portfolios with zero code — powered by edge delivery.',
  keywords: [
    'website builder',
    'portfolio',
    'link in bio',
    'micro website',
    'storefront',
    'portiva',
    'no code',
  ],
  authors: [{ name: 'Portiva' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://portiva.in',
    siteName: 'Portiva',
    title: 'Portiva — Build Your Website in Minutes',
    description:
      'Build stunning micro-websites, storefronts, and portfolios with zero code.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portiva — Build Your Website in Minutes',
    description:
      'Build stunning micro-websites, storefronts, and portfolios with zero code.',
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
  themeColor: '#09090B',
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
      className={`${jakarta.variable} ${outfit.variable} ${geistMono.variable} ${cormorant.variable} ${instrument.variable} h-full antialiased`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
