import Link from 'next/link';

const toolLinks = [
  { href: '/split-expenses-online', label: 'Split Expenses Online' },
  { href: '/expense-splitter', label: 'Expense Splitter' },
  { href: '/trip-expense-calculator', label: 'Trip Expense Calculator' },
  { href: '/roommate-expense-splitter', label: 'Roommate Expense Splitter' },
  { href: '/wedding-expense-splitter', label: 'Wedding Expense Splitter' },
];

const blogLinks = [
  { href: '/blog/how-to-split-expenses-on-a-group-trip', label: 'Split Group Trip Expenses' },
  { href: '/blog/split-rent-with-roommates-guide', label: 'Split Rent with Roommates' },
  { href: '/blog/upi-payments-for-group-expenses', label: 'UPI Group Payments Guide' },
  { href: '/blog/how-to-split-wedding-expenses-in-india', label: 'Split Wedding Expenses' },
  { href: '/blog/5-rules-for-fair-expense-splitting', label: '5 Rules for Fair Splitting' },
];

const useCases = [
  'Split Restaurant Bill',
  'Group Travel Expenses',
  'Shared Apartment Bills',
  'Office Lunch Splits',
  'Wedding Cost Sharing',
  'Event Expense Tracker',
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60 bg-surface-950/50 pt-12 pb-8 px-4" aria-label="Footer">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2l4 6-4 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-white">Split<span className="text-brand-400">Ease</span></span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Free expense splitter for groups. No login, no hassle, just split.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            </h3>
            <ul className="space-y-2">
              {blogLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Features</h3>
            <ul className="space-y-2">
              {['No Login Required', 'UPI Payment Links', 'QR Code Generation', 'Shareable Links', 'Offline Support', 'Smart Settlement', 'Export as PDF', 'Dark Mode'].map(f => (
                <li key={f} className="text-xs text-slate-500">{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {year} SplitEase. Free expense splitter for everyone.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">Made with ❤️ in India</span>
            <div className="flex gap-1">
              {['🇮🇳', '⚡', '🆓'].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
