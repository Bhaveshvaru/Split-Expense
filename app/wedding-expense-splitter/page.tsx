import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { QuickStart } from '../../components/features/QuickStart';

export const metadata: Metadata = {
  title: 'Wedding Expense Splitter — Split Wedding Costs Free | SplitEase',
  description: 'Plan and split wedding expenses among families and friends. Track venue, catering, decoration and more. Free wedding cost calculator with UPI payments.',
  keywords: ['wedding expense splitter', 'split wedding costs', 'wedding budget calculator india', 'shaadi expense tracker'],
  alternates: { canonical: 'https://split-expense.com/wedding-expense-splitter' },
  openGraph: {
    title: 'Wedding Expense Splitter — Split Wedding Costs Free',
    description: 'Track and split venue, catering, decoration, and every wedding expense. Settle with UPI. Perfect for Indian weddings.',
    url: 'https://split-expense.com/wedding-expense-splitter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I split wedding expenses between two families?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a wedding group on SplitEase and add members from both families. As expenses are added, SplitEase tracks who paid what and calculates the fairest way to settle up — with UPI payment links for easy transfers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track expenses for multiple wedding events separately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can create separate groups for each event — Mehendi, Sangeet, and the main wedding — or track everything in one group with expense categories.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this wedding expense calculator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, SplitEase is completely free. No subscription, no hidden charges. Just open the app and start tracking.',
      },
    },
  ],
};

const weddingExpenses = [
  { icon: '🏛️', name: 'Venue', desc: 'Banquet hall, farmhouse, mandap' },
  { icon: '🍱', name: 'Catering', desc: 'Food, drinks, sweets' },
  { icon: '🌸', name: 'Decoration', desc: 'Flowers, lights, stage decor' },
  { icon: '📸', name: 'Photography', desc: 'Photographer and videographer' },
  { icon: '👗', name: 'Attire', desc: 'Bridal and groom outfits' },
  { icon: '💌', name: 'Invitations', desc: 'Cards, printing, digital invites' },
  { icon: '🎶', name: 'Music & DJ', desc: 'Band, DJ, and entertainment' },
  { icon: '🚌', name: 'Transport', desc: 'Guest transport, baraat arrangements' },
];

export default function WeddingExpenseSplitterPage() {
  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="badge bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-4">
            💍 Wedding Planner
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wedding <span className="text-brand-400">Expense Splitter</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Planning a wedding? Keep finances transparent between families.
            Track every expense and settle up seamlessly with UPI.
          </p>
        </div>

        <QuickStart defaultCategory="wedding" />

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Track All Wedding Expenses</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {weddingExpenses.map(({ icon, name, desc }) => (
              <div key={name} className="card p-4 hover:border-slate-700 transition-colors text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{name}</h3>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 card p-8 border-pink-500/10">
          <h2 className="text-xl font-semibold text-white mb-2">Perfect for Indian Weddings</h2>
          <p className="text-slate-400 mb-6">
            Indian weddings involve multiple events across several days with large groups of family members contributing.
            SplitEase makes it easy to track who paid for what and how costs should be shared.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { event: 'Mehendi', icon: '🌿' },
              { event: 'Sangeet', icon: '💃' },
              { event: 'Haldi', icon: '🌼' },
              { event: 'Baraat', icon: '🐎' },
              { event: 'Reception', icon: '🥂' },
              { event: 'Bidaai', icon: '🙏' },
            ].map(({ event, icon }) => (
              <div key={event} className="flex items-center gap-3 p-3 rounded-xl bg-surface-800">
                <span className="text-xl">{icon}</span>
                <span className="font-medium text-slate-200">{event}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
