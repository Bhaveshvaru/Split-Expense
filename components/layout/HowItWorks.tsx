const steps = [
  {
    number: '01',
    title: 'Create a Group',
    description: 'Name your group (e.g., "Goa Trip 2024") and add the names of everyone involved. No accounts needed.',
    icon: '👥',
  },
  {
    number: '02',
    title: 'Add Expenses',
    description: 'Add expenses as they happen. Choose who paid and how to split — equally, exact, or by percentage.',
    icon: '➕',
  },
  {
    number: '03',
    title: 'Settle Up',
    description: 'SplitEase calculates who owes what. Pay with one UPI link or mark as manually settled.',
    icon: '✅',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 border-t border-slate-800/50" id="how-it-works" aria-labelledby="how-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-white mb-3">
            Up and running in 60 seconds
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Three steps, zero friction.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" aria-hidden />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ number, title, description, icon }) => (
              <article key={number} className="relative text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-surface-800 border border-slate-700 flex items-center justify-center text-3xl mx-auto shadow-elevated">
                    {icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                    {number.replace('0', '')}
                  </div>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
