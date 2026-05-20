import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { QuickStart } from '../../components/features/QuickStart';

export const metadata: Metadata = {
  title: 'Roommate Expense Splitter — Track Shared Bills Free | SplitEase',
  description: 'Split rent, utilities, groceries, and household bills with your roommates. Never argue about money again. Free expense tracker, no login required.',
  keywords: ['roommate expense splitter', 'split rent online', 'shared bills calculator', 'household expense tracker'],
  alternates: { canonical: 'https://split-expense.com/roommate-expense-splitter' },
  openGraph: {
    title: 'Roommate Expense Splitter — Track Shared Bills Free',
    description: 'Split rent, utilities, and groceries with roommates. Track who owes what and settle with UPI. Free, no login.',
    url: 'https://split-expense.com/roommate-expense-splitter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I split rent with roommates online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a group on SplitEase, add your roommates, and log your rent expense. SplitEase will automatically calculate each person\'s share and let you settle up via UPI payment links.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track recurring bills like electricity and internet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can add any expense to your shared group any time — rent, electricity, internet, groceries, or any other household bill.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do all my roommates need to create an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. SplitEase requires no account. Share the group link with your roommates and anyone can view expenses and balances without signing up.',
      },
    },
  ],
};

const roommateExpenses = [
  { icon: '🏠', name: 'Rent', desc: 'Split monthly rent fairly' },
  { icon: '💡', name: 'Utilities', desc: 'Electricity, water, gas bills' },
  { icon: '📺', name: 'Subscriptions', desc: 'Netflix, Spotify, internet' },
  { icon: '🛒', name: 'Groceries', desc: 'Shared food and household items' },
  { icon: '🧹', name: 'Maintenance', desc: 'Cleaning supplies, repairs' },
  { icon: '📦', name: 'Moving Costs', desc: 'Moving truck, deposits' },
];

export default function RoommateExpenseSplitterPage() {
  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="badge bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            🏠 Roommate Splitter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Roommate <span className="text-brand-400">Expense Splitter</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Living with roommates? Keep shared expenses fair and transparent.
            Track rent, utilities, and groceries — and settle up without awkward conversations.
          </p>
        </div>

        <QuickStart defaultCategory="roommates" />

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Everything Roommates Share</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roommateExpenses.map(({ icon, name, desc }) => (
              <div key={name} className="card p-5 hover:border-slate-700 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-1">{name}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 card p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Why SplitEase for Roommates?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Recurring expenses', desc: 'Easily re-add monthly bills like rent and utilities' },
              { title: 'UPI payments', desc: 'Pay roommates directly with UPI links — no cash needed' },
              { title: 'Shared access', desc: 'Everyone in the flat can view and add expenses via a shared link' },
              { title: 'Running balance', desc: 'See the running total of who owes what at any point' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-brand-400 mt-1">✓</span>
                <div>
                  <div className="font-medium text-white">{title}</div>
                  <div className="text-sm text-slate-400">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
