import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://split-expense.com'),
  title: {
    default: 'SplitEase — Free Expense Splitter, No Login Required',
    template: '%s | SplitEase',
  },
  description:
    'Split expenses instantly with friends, roommates, or travel groups. No signup required. Free expense calculator with UPI payment support for India.',
  keywords: [
    'split expenses online free',
    'split expense calculator',
    'split bills with friends',
    'expense splitter india',
    'trip expense calculator',
    'roommate expense splitter',
    'wedding expense splitter',
    'UPI payment splitter',
    'free bill splitter',
    'group expense tracker',
  ],
  authors: [{ name: 'SplitEase' }],
  creator: 'SplitEase',
  publisher: 'SplitEase',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://split-expense.com',
    siteName: 'SplitEase',
    title: 'SplitEase — Split Expenses Instantly, No Login Required',
    description:
      'Free, fast expense splitter with UPI payment links. Perfect for trips, roommates, and group outings.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SplitEase Expense Splitter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SplitEase — Free Expense Splitter',
    description:
      'Split bills with friends instantly. No login. UPI payments. Works offline.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://split-expense.in',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SplitEase',
  url: 'https://split-expense.in',
  description:
    'Free online expense splitter with UPI payment support. No login required.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  featureList: [
    'No login required',
    'Equal, exact, and percentage splits',
    'UPI payment links',
    'QR code generation',
    'Shareable group links',
    'Offline support',
    'Smart settlement algorithm',
  ],
  screenshot: 'https://split-expense.com/screenshot.png',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2847',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Font preconnects — eliminates DNS + TLS round-trips for font files */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link
          rel='icon'
          href='/favicon.svg'
          type='image/svg+x       
          +ml'
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-surface-950 text-slate-100 antialiased`}
      >
        <Providers>
          {children}
          <Toaster
            position='bottom-center'
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid rgba(100,116,139,0.2)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
