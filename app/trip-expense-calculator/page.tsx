import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { QuickStart } from '../../components/features/QuickStart';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trip Expense Calculator — Split Travel Costs Free | SplitEase',
  description: 'Calculate and split trip expenses with your travel group. Track flights, hotels, food, and transport costs. Settle up with UPI payments. Free, no login required.',
  keywords: ['trip expense calculator', 'travel expense splitter', 'vacation cost calculator', 'group travel expenses'],
  alternates: { canonical: 'https://split-expense.com/trip-expense-calculator' },
  openGraph: {
    title: 'Trip Expense Calculator — Split Travel Costs Free',
    description: 'Track and split every trip expense — flights, hotels, food, and transport. Settle with UPI. Free, no login.',
    url: 'https://split-expense.com/trip-expense-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Split Trip Expenses with SplitEase',
  description: 'Track and divide travel costs among your group and settle up with UPI payments.',
  totalTime: 'PT2M',
  supply: [{ '@type': 'HowToSupply', name: 'A smartphone or computer with internet access' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create your trip group',
      text: "Name your trip and add everyone who's going. No signup needed.",
      url: 'https://split-expense.com/trip-expense-calculator#start',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add expenses as you travel',
      text: 'Log each expense with who paid and how to split it — equally, by amount, or by percentage.',
      url: 'https://split-expense.com/trip-expense-calculator#start',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Check balances anytime',
      text: 'See a real-time summary of who owes what across all trip expenses.',
      url: 'https://split-expense.com/trip-expense-calculator#start',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Settle up with UPI',
      text: 'Generate UPI payment links and settle debts instantly — no cash needed.',
      url: 'https://split-expense.com/trip-expense-calculator#start',
    },
  ],
};

const tripCategories = [
  { icon: '✈️', name: 'Flights', desc: 'Split airfare costs among travelers' },
  { icon: '🏨', name: 'Hotels', desc: 'Divide accommodation expenses fairly' },
  { icon: '🍽️', name: 'Food & Dining', desc: 'Track restaurant and meal bills' },
  { icon: '🚗', name: 'Transport', desc: 'Cabs, fuel, rental cars, and more' },
  { icon: '🎡', name: 'Activities', desc: 'Entry tickets, tours, and experiences' },
  { icon: '🛍️', name: 'Shopping', desc: 'Group purchases and souvenirs' },
];

export default function TripExpenseCalculatorPage() {
  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            ✈️ Trip Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trip Expense <span className="text-brand-400">Calculator</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Planning a trip? Use SplitEase to track every expense — from flights to street food.
            See exactly who owes what and settle up instantly with UPI.
          </p>
        </div>

        <QuickStart defaultCategory="trip" />

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Track Every Travel Expense</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tripCategories.map(({ icon, name, desc }) => (
              <div key={name} className="card p-5 hover:border-slate-700 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-1">{name}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 card p-8 border-brand-500/20 bg-brand-500/5">
          <h2 className="text-2xl font-bold text-white mb-4">How to Use the Trip Calculator</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Create your trip group', desc: 'Name your trip and add everyone who\'s going. No signup needed.' },
              { step: '2', title: 'Add expenses as you travel', desc: 'Log each expense with who paid and how to split it.' },
              { step: '3', title: 'Check balances anytime', desc: 'See a real-time summary of who owes what.' },
              { step: '4', title: 'Settle up with UPI', desc: 'Generate UPI payment links and settle debts instantly.' },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {step}
                </div>
                <div>
                  <div className="font-medium text-white">{title}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
