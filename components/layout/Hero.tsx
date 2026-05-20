'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { openAddGroup } from '../../store/slices/uiSlice';
import type { RootState } from '../../store';

const CreateGroupModal = dynamic(
  () => import('../features/CreateGroupModal').then(m => ({ default: m.CreateGroupModal })),
  { ssr: false },
);

const stats = [
  { value: '50K+', label: 'Groups Created' },
  { value: '₹2Cr+', label: 'Expenses Split' },
  { value: '4.9★', label: 'User Rating' },
];

export function Hero() {
  const dispatch = useDispatch();
  const showAddGroup = useSelector((state: RootState) => state.ui.showAddGroup);

  return (
    <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-1.5 text-sm text-brand-400 mb-6 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-soft" />
          Free · No Login · Works Offline
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5 animate-fade-up animate-delay-100">
          Split Expenses{' '}
          <span className="relative inline-block">
            <span className="text-brand-400">Instantly</span>
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" aria-hidden>
              <path d="M0 6 Q100 0 200 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>
          </span>
          <br />
          <span className="text-slate-400 text-3xl sm:text-4xl md:text-5xl font-medium">No Signup Required</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-up animate-delay-200">
          Free, fast, and simple expense splitting for trips, roommates, and group outings.
          Split equally or by custom amounts. Settle with UPI in one click.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up animate-delay-300">
          <button
            onClick={() => dispatch(openAddGroup())}
            className="btn-primary text-base px-8 py-3.5"
          >
            🚀 Start Splitting Now
          </button>
          <Link href="#how-it-works" className="btn-secondary text-base px-8 py-3.5">
            See How It Works
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-up animate-delay-400">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        {/* No credit card note */}
        <p className="mt-5 text-xs text-slate-600 animate-fade-up animate-delay-500">
          ✓ No credit card &nbsp;·&nbsp; ✓ No email &nbsp;·&nbsp; ✓ No password &nbsp;·&nbsp; ✓ 100% Free forever
        </p>
      </div>

      {showAddGroup && <CreateGroupModal />}
    </section>
  );
}
