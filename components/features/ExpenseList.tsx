'use client';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { Expense, Member } from '../../types';
import { deleteExpenseAsync, removeExpenseLocal } from '../../store/slices/expensesSlice';
import { updateGroupTotal } from '../../store/slices/groupsSlice';
import { setEditingExpense } from '../../store/slices/uiSlice';
import { formatCurrency } from '../../lib/settlement';
import toast from 'react-hot-toast';

const CATEGORY_ICONS: Record<string, string> = {
  food: '🍽️', transport: '🚗', accommodation: '🏨', entertainment: '🎭',
  shopping: '🛍️', utilities: '💡', general: '💰', other: '📌',
};

interface Props {
  expenses: Expense[];
  members: Member[];
  currency: string;
  groupId: string;
  onAdd: () => void;
}

export function ExpenseList({ expenses, members, currency, groupId, onAdd }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (expense: Expense) => {
    if (!confirm(`Delete "${expense.title}"?`)) return;
    try {
      await dispatch(deleteExpenseAsync({ expenseId: expense.expenseId, groupId }));
      dispatch(updateGroupTotal({ groupId, delta: -expense.amount }));
      toast.success('Expense deleted');
    } catch {
      dispatch(removeExpenseLocal({ expenseId: expense.expenseId, groupId }));
      toast.success('Expense removed');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="card p-10 text-center">
        <div className="text-5xl mb-3">💸</div>
        <h3 className="font-semibold text-white mb-2">No expenses yet</h3>
        <p className="text-slate-400 text-sm mb-5">Add the first expense to get started.</p>
        <button onClick={onAdd} className="btn-primary">+ Add First Expense</button>
      </div>
    );
  }

  // Group by date
  const grouped = groupExpensesByDate(expenses);

  return (
    <div className="space-y-4">
      {grouped.map(({ date, items }) => (
        <div key={date}>
          <div className="text-xs text-slate-500 font-medium px-1 mb-2">{date}</div>
          <div className="space-y-2">
            {items.map(expense => (
              <ExpenseCard
                key={expense.expenseId}
                expense={expense}
                members={members}
                currency={currency}
                onEdit={() => dispatch(setEditingExpense(expense.expenseId))}
                onDelete={() => handleDelete(expense)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpenseCard({ expense, members, currency, onEdit, onDelete }: {
  expense: Expense;
  members: Member[];
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const payer = members.find(m => m.id === expense.paidBy);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="card p-4 hover:border-slate-700 transition-all">
      <div className="flex items-start gap-3">
        {/* Category icon */}
        <div className="w-10 h-10 rounded-xl bg-surface-700 flex items-center justify-center text-xl shrink-0">
          {CATEGORY_ICONS[expense.category] || '💰'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-medium text-white text-sm truncate">{expense.title}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: payer?.color || '#64748b' }}>
                  {expense.paidByName[0].toUpperCase()}
                </div>
                <span className="text-xs text-slate-500">
                  {expense.paidByName} paid · {SPLIT_LABELS[expense.splitType]}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-white text-sm tabular-nums">{formatCurrency(expense.amount, currency)}</div>
              <div className="text-xs text-slate-500">
                {formatCurrency(expense.amount / expense.splits.length, currency)}/person
              </div>
            </div>
          </div>

          {/* Expand details */}
          <button onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-slate-600 hover:text-slate-400 mt-2 flex items-center gap-1 transition-colors">
            {showDetails ? '▲ Hide' : '▼ Details'} ({expense.splits.length} people)
          </button>

          {showDetails && (
            <div className="mt-2 space-y-1 animate-fade-in">
              {expense.splits.map(split => {
                const m = members.find(mem => mem.id === split.memberId);
                return (
                  <div key={split.memberId} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                      style={{ background: m?.color || '#64748b' }}>
                      {split.memberName[0].toUpperCase()}
                    </div>
                    <span className="text-xs text-slate-400 flex-1">{split.memberName}</span>
                    <span className="text-xs font-medium text-slate-300 tabular-nums">{formatCurrency(split.amount, currency)}</span>
                    {split.percentage && <span className="text-xs text-slate-600">({split.percentage}%)</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 shrink-0">
          <button onClick={onEdit} className="w-8 h-8 rounded-lg hover:bg-surface-700 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors text-sm" aria-label="Edit">✏️</button>
          <button onClick={onDelete} className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors text-sm" aria-label="Delete">🗑️</button>
        </div>
      </div>
    </article>
  );
}

// useState needed inside ExpenseCard
import { useState } from 'react';

const SPLIT_LABELS: Record<string, string> = { equal: 'Split equally', exact: 'Custom split', percentage: '% split' };

function groupExpensesByDate(expenses: Expense[]) {
  const map = new Map<string, Expense[]>();
  for (const e of expenses) {
    const d = new Date(e.date);
    const key = isToday(d) ? 'Today' : isYesterday(d) ? 'Yesterday' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
}

function isToday(d: Date) {
  const t = new Date();
  return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
}

function isYesterday(d: Date) {
  const y = new Date(); y.setDate(y.getDate() - 1);
  return d.getDate() === y.getDate() && d.getMonth() === y.getMonth() && d.getFullYear() === y.getFullYear();
}
