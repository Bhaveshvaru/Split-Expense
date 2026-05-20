'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { closeAddExpense } from '../../store/slices/uiSlice';
import { createExpenseAsync, addExpenseLocal, updateExpenseAsync, updateExpenseLocal, type CreateExpenseInput } from '../../store/slices/expensesSlice';
import { updateGroupTotal } from '../../store/slices/groupsSlice';
import type { AppDispatch, RootState } from '../../store';
import type { Group, SplitType, ExpenseCategory } from '../../types';
import { calculateEqualSplits, formatCurrency } from '../../lib/settlement';
import toast from 'react-hot-toast';

const CATEGORIES: { value: ExpenseCategory; label: string; icon: string }[] = [
  { value: 'food', label: 'Food', icon: '🍽️' },
  { value: 'transport', label: 'Transport', icon: '🚗' },
  { value: 'accommodation', label: 'Stay', icon: '🏨' },
  { value: 'entertainment', label: 'Fun', icon: '🎭' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'utilities', label: 'Bills', icon: '💡' },
  { value: 'general', label: 'General', icon: '💰' },
  { value: 'other', label: 'Other', icon: '📌' },
];

interface Props { group: Group; onClose: () => void; }

export function AddExpenseModal({ group, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editingId = useSelector((s: RootState) => s.ui.editingExpenseId);
  const expenses = useSelector((s: RootState) => s.expenses.expenses[group.groupId] || []);
  const editingExpense = editingId ? expenses.find(e => e.expenseId === editingId) : null;

  const [title, setTitle] = useState(editingExpense?.title || '');
  const [amount, setAmount] = useState(editingExpense?.amount.toString() || '');
  const [paidBy, setPaidBy] = useState(editingExpense?.paidBy || group.members[0]?.id || '');
  const [splitType, setSplitType] = useState<SplitType>(editingExpense?.splitType || 'equal');
  const [category, setCategory] = useState<ExpenseCategory>(editingExpense?.category || 'general');
  const [date, setDate] = useState(editingExpense ? editingExpense.date.substring(0, 10) : new Date().toISOString().substring(0, 10));
  const [customSplits, setCustomSplits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const close = () => { dispatch(closeAddExpense()); onClose(); };
  const parsedAmount = parseFloat(amount) || 0;

  const splitTotal = Object.values(customSplits).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const splitValid = splitType === 'equal' || (
    splitType === 'percentage' ? Math.abs(splitTotal - 100) < 0.01 : Math.abs(splitTotal - parsedAmount) < 0.02
  );

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error('Please enter a title');
    if (!parsedAmount || parsedAmount <= 0) return toast.error('Enter a valid amount');
    if (!paidBy) return toast.error('Select who paid');
    if (!splitValid) return toast.error(splitType === 'percentage' ? 'Percentages must add up to 100%' : 'Amounts must equal total');

    setLoading(true);
    try {
      const payer = group.members.find(m => m.id === paidBy)!;
      let splits;
      if (splitType === 'equal') {
        splits = calculateEqualSplits(parsedAmount, group.members);
      } else {
        splits = group.members.map(m => ({
          memberId: m.id, memberName: m.name,
          amount: splitType === 'percentage'
            ? Math.round(parsedAmount * (parseFloat(customSplits[m.id] || '0') / 100) * 100) / 100
            : parseFloat(customSplits[m.id] || '0'),
          percentage: splitType === 'percentage' ? parseFloat(customSplits[m.id] || '0') : undefined,
        }));
      }

      const expenseData = {
        groupId: group.groupId, title: title.trim(), amount: parsedAmount,
        currency: group.currency, paidBy, paidByName: payer.name,
        splitType, splits, category, date: new Date(date).toISOString(),
        isSettled: false,
      };

      if (editingId && editingExpense) {
        const result = await dispatch(updateExpenseAsync({ expenseId: editingId, data: expenseData }));
        if (updateExpenseAsync.fulfilled.match(result)) {
          dispatch(updateGroupTotal({ groupId: group.groupId, delta: parsedAmount - editingExpense.amount }));
          toast.success('Expense updated ✓');
        } else {
          dispatch(updateExpenseLocal({ ...expenseData, expenseId: editingId, createdAt: editingExpense.createdAt }));
          toast.success('Updated locally');
        }
      } else {
        const localId = uuidv4();
        const result = await dispatch(createExpenseAsync({ ...expenseData, _localId: localId } as CreateExpenseInput));
        if (createExpenseAsync.fulfilled.match(result)) {
          dispatch(updateGroupTotal({ groupId: group.groupId, delta: parsedAmount }));
          toast.success('Expense added ✓');
        } else {
          const localExpense = { ...expenseData, expenseId: localId, createdAt: new Date().toISOString() };
          dispatch(addExpenseLocal(localExpense));
          dispatch(updateGroupTotal({ groupId: group.groupId, delta: parsedAmount }));
          toast.success('Saved locally — will sync when online 💾');
        }
      }
      close();
    } finally { setLoading(false); }
  };

  return (
    <>
      <div className="overlay" onClick={close} role="presentation" />
      <div className="bottom-sheet max-w-lg mx-auto" role="dialog" aria-modal aria-label={editingId ? 'Edit expense' : 'Add expense'}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{editingId ? '✏️ Edit Expense' : '➕ Add Expense'}</h2>
          <button onClick={close} className="btn-ghost px-2 text-xl text-slate-500">×</button>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[62vh] pr-1">
          {/* Title + Amount */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="label" htmlFor="exp-title">What was it for? *</label>
              <input id="exp-title" className="input" placeholder="e.g., Dinner, Hotel, Cab"
                value={title} onChange={e => setTitle(e.target.value)} maxLength={200} autoFocus />
            </div>
            <div>
              <label className="label" htmlFor="exp-amount">Amount (₹) *</label>
              <input id="exp-amount" className="input" type="number" inputMode="decimal"
                placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} min="0.01" step="0.01" />
            </div>
            <div>
              <label className="label" htmlFor="exp-date">Date</label>
              <input id="exp-date" className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1 ${
                    category === c.value ? 'bg-brand-500/15 border-brand-500/40 text-brand-400' : 'bg-surface-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paid by */}
          <div>
            <label className="label">Paid by *</label>
            <div className="flex flex-wrap gap-2">
              {group.members.map(m => (
                <button key={m.id} onClick={() => setPaidBy(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    paidBy === m.id ? 'border-opacity-60 text-white' : 'bg-surface-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                  style={paidBy === m.id ? { borderColor: m.color, background: `${m.color}15` } : {}}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: m.color }}>
                    {m.name[0].toUpperCase()}
                  </div>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Split type */}
          <div>
            <label className="label">Split Type</label>
            <div className="grid grid-cols-3 gap-2 bg-surface-800 p-1 rounded-xl border border-slate-700">
              {(['equal', 'exact', 'percentage'] as SplitType[]).map(t => (
                <button key={t} onClick={() => setSplitType(t)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                    splitType === t ? 'bg-surface-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}>
                  {t === 'equal' ? '⚖️ Equal' : t === 'exact' ? '🎯 Exact' : '📊 %'}
                </button>
              ))}
            </div>

            {/* Custom split inputs */}
            {splitType !== 'equal' && parsedAmount > 0 && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {splitType === 'percentage' ? `Total: ${splitTotal.toFixed(1)}% / 100%` : `Total: ${formatCurrency(splitTotal, group.currency)} / ${formatCurrency(parsedAmount, group.currency)}`}
                  </span>
                  <span className={`text-xs font-medium ${splitValid ? 'text-brand-400' : 'text-red-400'}`}>
                    {splitValid ? '✓ Valid' : '✗ Invalid'}
                  </span>
                </div>
                {group.members.map(m => (
                  <div key={m.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: m.color }}>
                      {m.name[0].toUpperCase()}
                    </div>
                    <span className="text-xs text-slate-300 flex-1">{m.name}</span>
                    <div className="relative w-24">
                      <input className="input py-1.5 text-xs pr-6 text-right" type="number" inputMode="decimal" min="0" step="0.01"
                        placeholder={splitType === 'percentage' ? '0' : '0.00'}
                        value={customSplits[m.id] || ''}
                        onChange={e => setCustomSplits(p => ({ ...p, [m.id]: e.target.value }))} />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                        {splitType === 'percentage' ? '%' : '₹'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={close} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !splitValid}
            className="btn-primary flex-1 disabled:opacity-40">
            {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{editingId ? 'Updating...' : 'Adding...'}</span>
              : editingId ? '✓ Update Expense' : '+ Add Expense'}
          </button>
        </div>
      </div>
    </>
  );
}
