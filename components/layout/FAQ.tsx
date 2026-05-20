'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Do I need to create an account to use SplitEase?',
    a: 'No account needed at all. SplitEase works instantly — just open it and start splitting. Your data is saved automatically in your browser.',
  },
  {
    q: 'Is SplitEase completely free?',
    a: 'Yes, 100% free. No subscription, no hidden charges, no premium tier. All features including UPI payments and QR codes are free forever.',
  },
  {
    q: 'How does the UPI payment integration work?',
    a: 'When settling up, SplitEase generates a UPI deep link (upi://pay?...) with the exact amount pre-filled. Tap "Pay via UPI" to open any UPI app — Google Pay, PhonePe, Paytm, BHIM — and complete the payment in seconds.',
  },
  {
    q: 'How does the smart settlement algorithm work?',
    a: 'Our algorithm calculates the minimum number of transactions needed to settle all debts. For example, if A owes B ₹200 and B owes C ₹200, instead of 2 payments, SplitEase suggests A pays C directly — just 1 payment.',
  },
  {
    q: 'Can I share the group with friends who don\'t have an account?',
    a: 'Yes! Every group has a unique shareable URL (e.g., split-expense.com/group/abc123). Anyone with the link can view and add expenses — no login required for them either.',
  },
  {
    q: 'Does SplitEase work offline?',
    a: 'Yes. All your data is stored in your browser\'s localStorage so it works without internet. When you\'re back online, data syncs to the cloud automatically.',
  },
  {
    q: 'What split types are supported?',
    a: 'SplitEase supports three split types: Equal (divide total equally), Exact (set a specific amount per person), and Percentage (split proportionally by percentages that add up to 100%).',
  },
  {
    q: 'Can I edit or delete an expense after adding it?',
    a: 'Yes. Tap any expense to edit the title, amount, payer, or split type. You can also delete expenses — balances update instantly.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 border-t border-slate-800/50" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about SplitEase.</p>
        </div>

        <dl className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="card overflow-hidden">
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-surface-700/30 transition-colors"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-medium text-white text-sm leading-snug">{q}</span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}
              >
                <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{a}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
