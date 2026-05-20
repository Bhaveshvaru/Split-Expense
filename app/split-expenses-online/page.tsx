import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { QuickStart } from '../../components/features/QuickStart';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Split Expenses Online Free — No Signup Required | SplitEase',
  description: 'Split expenses online for free with SplitEase. No account needed. Instantly divide bills equally or by custom amounts. Perfect for trips, dinners, and shared costs.',
  keywords: ['split expenses online free', 'free bill splitter', 'online expense calculator', 'split costs online'],
  alternates: { canonical: 'https://split-expense.com/split-expenses-online' },
  openGraph: {
    title: 'Split Expenses Online Free — No Signup Required',
    description: 'The fastest way to split expenses online. Free, instant, no login.',
    url: 'https://split-expense.com/split-expenses-online',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I split expenses online for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! SplitEase is completely free to use. No subscription, no hidden fees, and no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to split expenses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account needed. Just open SplitEase, create a group, add members and start splitting. Your data is saved automatically.',
      },
    },
  ],
};

export default function SplitExpensesOnlinePage() {
  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            100% Free · No Login
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Split Expenses Online <span className="text-brand-400">Free</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The easiest way to split expenses online — no signup, no downloads, no hassle.
            Split bills equally or by custom amounts and share results instantly.
          </p>
        </div>

        <QuickStart />

        <section className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Why Split Expenses Online?</h2>
            <ul className="space-y-3 text-slate-400">
              {[
                'No more mental math — let SplitEase calculate automatically',
                'Keep track of who paid what in group outings',
                'Avoid awkward money conversations with clear breakdowns',
                'Share results via link — everyone stays on the same page',
                'Works on any device — mobile, tablet, desktop',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brand-400 mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Split Types Supported</h2>
            <div className="space-y-4">
              {[
                { type: 'Equal Split', desc: 'Divide the total equally among all members', icon: '⚖️' },
                { type: 'Exact Amounts', desc: 'Set a specific amount each person owes', icon: '🎯' },
                { type: 'By Percentage', desc: 'Split proportionally based on percentages', icon: '📊' },
              ].map(({ type, desc, icon }) => (
                <div key={type} className="flex gap-3 items-start">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-medium text-white">{type}</div>
                    <div className="text-sm text-slate-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: '/trip-expense-calculator', label: 'Trip Expense Calculator', icon: '✈️' },
              { href: '/roommate-expense-splitter', label: 'Roommate Expense Splitter', icon: '🏠' },
              { href: '/wedding-expense-splitter', label: 'Wedding Expense Splitter', icon: '💍' },
              { href: '/expense-splitter', label: 'General Expense Splitter', icon: '💰' },
            ].map(({ href, label, icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-xl bg-surface-800 hover:bg-surface-700 transition-colors text-slate-300 hover:text-white">
                <span>{icon}</span>
                <span className="text-sm font-medium">{label}</span>
                <span className="ml-auto text-slate-600">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
