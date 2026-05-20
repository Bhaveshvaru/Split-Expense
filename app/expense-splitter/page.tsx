import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { QuickStart } from '../../components/features/QuickStart';

export const metadata: Metadata = {
  title: 'Expense Splitter — Free Bill Splitting Calculator | SplitEase',
  description: 'The smartest expense splitter online. Split any bill equally, by exact amounts, or percentages. Works for any group. Free with no login.',
  keywords: ['expense splitter', 'bill splitter', 'split calculator', 'divide expenses equally'],
  alternates: { canonical: 'https://split-expense.com/expense-splitter' },
  openGraph: {
    title: 'Expense Splitter — Free Bill Splitting Calculator',
    description: 'The smartest expense splitter online. Split any bill equally, by exact amounts, or percentages. Free, no login.',
    url: 'https://split-expense.com/expense-splitter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the expense splitter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a group, add members, and log expenses. SplitEase automatically calculates who owes whom and suggests the minimum number of payments to settle all debts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I split a bill unevenly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SplitEase supports equal splits, exact amounts, and percentage-based splits so you can split any bill exactly how you want.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SplitEase free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, SplitEase is completely free with no subscriptions, no hidden fees, and no account required.',
      },
    },
  ],
};

export default function ExpenseSplitterPage() {
  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            💰 Expense Splitter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Smartest <span className="text-brand-400">Expense Splitter</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Split any expense fairly between any number of people. Equal splits, custom amounts,
            or percentages — SplitEase handles it all with zero friction.
          </p>
        </div>
        <QuickStart />
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Minimize Transactions', icon: '⚡', desc: 'Our smart algorithm minimizes the number of payments needed to settle all debts.' },
            { title: 'Any Group Size', icon: '👥', desc: 'Works for 2 people splitting a dinner or 20 friends on a group trip.' },
            { title: 'Multiple Currencies', icon: '💱', desc: 'Support for INR, USD, EUR, GBP, AED, SGD and more.' },
          ].map(({ title, icon, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
