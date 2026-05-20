'use client';
import type { Balance, Transaction, Member } from '../../types';
import { formatCurrency } from '../../lib/settlement';

interface Props {
  balances: Balance[];
  transactions: Transaction[];
  currency: string;
  members: Member[];
  onSettle: () => void;
}

export function BalanceSummary({ balances, transactions, currency, members, onSettle }: Props) {
  const owes = balances.filter(b => b.balance < -0.01);
  const owed = balances.filter(b => b.balance > 0.01);

  return (
    <div className="card p-4 border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold text-white">
            {transactions.length} payment{transactions.length !== 1 ? 's' : ''} to settle up
          </span>
        </div>
        <button onClick={onSettle}
          className="text-xs font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/15 px-3 py-1.5 rounded-lg transition-colors border border-brand-500/20">
          Settle Up →
        </button>
      </div>

      <div className="space-y-1.5">
        {transactions.slice(0, 3).map((t, i) => {
          const fromMember = members.find(m => m.id === t.fromMemberId);
          const toMember = members.find(m => m.id === t.toMemberId);
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: fromMember?.color || '#ef4444' }}>
                {t.fromMemberName[0].toUpperCase()}
              </div>
              <span className="text-slate-400 text-xs flex-1">
                <span className="text-red-300 font-medium">{t.fromMemberName}</span>
                {' '}owes{' '}
                <span className="text-emerald-300 font-medium">{t.toMemberName}</span>
              </span>
              <span className="font-bold text-white tabular-nums text-xs">{formatCurrency(t.amount, currency)}</span>
            </div>
          );
        })}
        {transactions.length > 3 && (
          <button onClick={onSettle} className="text-xs text-slate-500 hover:text-slate-400 w-full text-center pt-1">
            +{transactions.length - 3} more payment{transactions.length - 3 !== 1 ? 's' : ''}...
          </button>
        )}
      </div>
    </div>
  );
}
