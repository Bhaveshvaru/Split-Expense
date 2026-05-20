const features = [
  {
    icon: '⚡',
    title: 'Zero Friction',
    description: 'No signup, no email, no password. Open the app and start splitting in 10 seconds.',
    color: 'from-yellow-500/10 to-orange-500/5 border-yellow-500/20',
    iconBg: 'bg-yellow-500/10 text-yellow-400',
  },
  {
    icon: '🔗',
    title: 'Shareable Links',
    description: 'Every group gets a unique URL. Share with anyone — they can view and add expenses instantly.',
    color: 'from-blue-500/10 to-cyan-500/5 border-blue-500/20',
    iconBg: 'bg-blue-500/10 text-blue-400',
  },
  {
    icon: '📱',
    title: 'UPI Payments',
    description: 'Generate UPI payment links and QR codes. Settle up with Google Pay, PhonePe, or any UPI app.',
    color: 'from-brand-500/10 to-emerald-500/5 border-brand-500/20',
    iconBg: 'bg-brand-500/10 text-brand-400',
  },
  {
    icon: '🧮',
    title: 'Smart Settlement',
    description: 'Our algorithm minimizes transactions. Instead of 10 payments, you might only need 3.',
    color: 'from-purple-500/10 to-violet-500/5 border-purple-500/20',
    iconBg: 'bg-purple-500/10 text-purple-400',
  },
  {
    icon: '✈️',
    title: 'Multiple Split Types',
    description: 'Split equally, by exact amounts, or by percentages. Every situation covered.',
    color: 'from-pink-500/10 to-rose-500/5 border-pink-500/20',
    iconBg: 'bg-pink-500/10 text-pink-400',
  },
  {
    icon: '📵',
    title: 'Works Offline',
    description: 'All data saved locally. No internet? No problem. Sync when you\'re back online.',
    color: 'from-slate-500/10 to-gray-500/5 border-slate-500/20',
    iconBg: 'bg-slate-500/10 text-slate-400',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4" id="features" aria-labelledby="features-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-white mb-3">
            Everything you need, nothing you don't
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built for real-world use — from weekend trips to month-long roommate arrangements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, description, color, iconBg }) => (
            <article
              key={title}
              className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-transform hover:-translate-y-0.5 ${color}`}
            >
              <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center text-xl mb-4 ${iconBg}`}>
                {icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
