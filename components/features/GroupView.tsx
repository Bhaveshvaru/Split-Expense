'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch, RootState } from '../../store';
import type { Group, Member } from '../../types';
import { setCurrentGroup, updateGroupLocal, removeGroupLocal } from '../../store/slices/groupsSlice';
import { openAddExpense, openSettlement } from '../../store/slices/uiSlice';
import { computeBalances, minimizeTransactions, formatCurrency } from '../../lib/settlement';
import { isValidUPIId } from '../../lib/upi';
import { ExpenseList } from './ExpenseList';
import { BalanceSummary } from './BalanceSummary';
import { FloatingAddButton } from '../ui/FloatingAddButton';
import dynamic from 'next/dynamic';

const AddExpenseModal = dynamic(
  () => import('./AddExpenseModal').then(m => ({ default: m.AddExpenseModal })),
  { ssr: false },
);
const SettlementModal = dynamic(
  () => import('./SettlementModal').then(m => ({ default: m.SettlementModal })),
  { ssr: false },
);

interface Props { groupId: string; }

export function GroupView({ groupId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'settings'>('expenses');
  const [copied, setCopied] = useState(false);

  const group = useSelector((s: RootState) => s.groups.groups.find(g => g.groupId === groupId) ?? null);
  const expenses = useSelector((s: RootState) => s.expenses.expenses[groupId] || []);
  const showAddExpense = useSelector((s: RootState) => s.ui.showAddExpense);
  const showSettlement = useSelector((s: RootState) => s.ui.showSettlement);
  const currentGroupId = useSelector((s: RootState) => s.groups.currentGroupId);

  // Keep currentGroupId in sync
  if (group && currentGroupId !== groupId) {
    dispatch(setCurrentGroup(groupId));
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied! 🔗');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!group) return <GroupNotFound onBack={() => router.push('/')} />;

  const activeExpenses = expenses.filter(e => !e.isSettled);
  const balances = computeBalances(group.members, activeExpenses);
  const transactions = minimizeTransactions(balances);
  const totalAmount = activeExpenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="animate-fade-in">
      {/* Group Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{getCategoryEmoji(group.category)}</span>
              <h1 className="text-xl font-bold text-white">{group.name}</h1>
            </div>
            <p className="text-xs text-slate-500">
              {group.members.length} members · {activeExpenses.length} expenses · {formatCurrency(totalAmount, group.currency)} total
            </p>
          </div>
          <button onClick={copyLink}
            className={`btn-secondary text-xs px-3 py-2 shrink-0 ${copied ? 'text-brand-400 border-brand-500/30' : ''}`}>
            {copied ? '✓ Copied' : '🔗 Share'}
          </button>
        </div>

        {/* Members row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {group.members.map(m => (
            <div key={m.id} className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full bg-surface-800 border border-slate-700">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: m.color }}>
                {m.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-slate-300 whitespace-nowrap">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Balance Summary Card */}
      {transactions.length > 0 && (
        <div className="mb-4">
          <BalanceSummary balances={balances} transactions={transactions} currency={group.currency} members={group.members}
            onSettle={() => dispatch(openSettlement())} />
        </div>
      )}

      {/* Tab Bar */}
      <div className="flex bg-surface-800 rounded-xl p-1 mb-4 border border-slate-700">
        {(['expenses', 'balances', 'settings'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
              activeTab === tab ? 'bg-surface-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}>
            {tab === 'expenses' ? `💸 Expenses (${activeExpenses.length})` : tab === 'balances' ? `⚖️ Balances` : `⚙️ Settings`}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'expenses' ? (
        <ExpenseList expenses={activeExpenses} members={group.members} currency={group.currency}
          groupId={groupId} onAdd={() => dispatch(openAddExpense())} />
      ) : activeTab === 'balances' ? (
        <BalanceDetailView balances={balances} transactions={transactions} currency={group.currency} members={group.members}
          onSettle={() => dispatch(openSettlement())} />
      ) : (
        <GroupSettings group={group} />
      )}

      {/* Modals */}
      {showAddExpense && <AddExpenseModal group={group} onClose={() => {}} />}
      {showSettlement && <SettlementModal group={group} transactions={transactions} balances={balances} onClose={() => {}} />}

      {/* FAB */}
      <FloatingAddButton onClick={() => dispatch(openAddExpense())} />
    </div>
  );
}

function BalanceDetailView({ balances, transactions, currency, members, onSettle }: {
  balances: ReturnType<typeof computeBalances>;
  transactions: ReturnType<typeof minimizeTransactions>;
  currency: string;
  members: Group['members'];
  onSettle: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Individual Balances</h3>
        <div className="space-y-2">
          {balances.map(b => {
            const member = members.find(m => m.id === b.memberId);
            return (
              <div key={b.memberId} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: member?.color || '#64748b' }}>
                  {b.memberName[0].toUpperCase()}
                </div>
                <span className="text-sm text-slate-300 flex-1">{b.memberName}</span>
                <span className={`text-sm font-semibold tabular-nums ${b.balance > 0 ? 'balance-positive' : b.balance < 0 ? 'balance-negative' : 'balance-neutral'}`}>
                  {b.balance > 0 ? '+' : ''}{formatCurrency(b.balance, currency)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {transactions.length > 0 && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Suggested Payments ({transactions.length})
            </h3>
            <button onClick={onSettle} className="text-xs text-brand-400 hover:text-brand-300">
              Settle All →
            </button>
          </div>
          <div className="space-y-2">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-surface-800 rounded-xl border border-slate-700/50">
                <span className="text-sm font-medium text-red-300">{t.fromMemberName}</span>
                <span className="text-slate-600 text-xs">→ pays</span>
                <span className="text-sm font-medium text-emerald-300">{t.toMemberName}</span>
                <span className="ml-auto text-sm font-bold text-white tabular-nums">{formatCurrency(t.amount, currency)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="font-semibold text-white mb-1">All settled up!</h3>
          <p className="text-sm text-slate-400">No outstanding balances in this group.</p>
        </div>
      )}
    </div>
  );
}

function GroupNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-xl font-bold text-white mb-2">Group not found</h2>
      <p className="text-slate-400 mb-6 text-sm">This group may have been deleted or the link is incorrect.</p>
      <button onClick={onBack} className="btn-primary">← Back to Home</button>
    </div>
  );
}

const MEMBER_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e','#0ea5e9','#eab308','#14b8a6'];
const CATEGORIES = [
  { value: 'trip', label: 'Trip', icon: '✈️' },
  { value: 'roommates', label: 'Roommates', icon: '🏠' },
  { value: 'food', label: 'Food', icon: '🍽️' },
  { value: 'wedding', label: 'Wedding', icon: '💍' },
  { value: 'other', label: 'Other', icon: '📋' },
] as const;

function GroupSettings({ group }: { group: Group }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [name, setName] = useState(group.name);
  const [category, setCategory] = useState(group.category);
  const [members, setMembers] = useState<Member[]>(group.members);
  const [newMemberName, setNewMemberName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const addMember = () => {
    const n = newMemberName.trim();
    if (!n) return;
    if (members.some(m => m.name.toLowerCase() === n.toLowerCase())) {
      toast.error('Member already exists');
      return;
    }
    const newM: Member = { id: uuidv4(), name: n, color: MEMBER_COLORS[members.length % MEMBER_COLORS.length] };
    setMembers([...members, newM]);
    setNewMemberName('');
  };

  const removeMember = (id: string) => {
    if (members.length <= 2) { toast.error('A group needs at least 2 members'); return; }
    setMembers(members.filter(m => m.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) return toast.error('Group name is required');
    const updated: Group = { ...group, name: name.trim(), category, members, updatedAt: new Date().toISOString() };
    dispatch(updateGroupLocal(updated));
    toast.success('Group updated!');
  };

  const handleDelete = () => {
    dispatch(removeGroupLocal(group.groupId));
    toast.success('Group deleted');
    router.push('/groups');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Group Name */}
      <div className="card p-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Group Details</h3>
        <div className="space-y-3">
          <div>
            <label className="label" htmlFor="settings-name">Group Name</label>
            <input id="settings-name" className="input" value={name} onChange={e => setName(e.target.value)} maxLength={100} />
          </div>
          <div>
            <label className="label">Category</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    category === c.value
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                      : 'bg-surface-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="card p-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Members ({members.length})</h3>
        <p className="text-xs text-slate-500 mb-3">Add UPI IDs so members can pay directly during settlement.</p>
        <div className="space-y-3 mb-3">
          {members.map(m => {
            const upiValid = m.upiId ? isValidUPIId(m.upiId) : null;
            return (
              <div key={m.id} className="bg-surface-800 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: m.color }}>
                    {m.name[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-200 flex-1">{m.name}</span>
                  <button
                    onClick={() => removeMember(m.id)}
                    className="text-xs text-slate-600 hover:text-red-400 transition-colors px-2 py-1"
                    aria-label={`Remove ${m.name}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="relative">
                  <input
                    className="input text-xs pr-16"
                    placeholder="UPI ID (e.g. name@upi)"
                    value={m.upiId || ''}
                    onChange={e => setMembers(members.map(x => x.id === m.id ? { ...x, upiId: e.target.value } : x))}
                    maxLength={50}
                    aria-label={`UPI ID for ${m.name}`}
                  />
                  {m.upiId && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${upiValid ? 'text-emerald-400' : 'text-red-400'}`}>
                      {upiValid ? '✓ valid' : '✗'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input
            className="input flex-1 text-sm"
            placeholder="New member name"
            value={newMemberName}
            onChange={e => setNewMemberName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addMember(); }}
            maxLength={50}
          />
          <button onClick={addMember} className="btn-secondary text-sm px-3">+ Add</button>
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} className="btn-primary w-full py-3">
        💾 Save Changes
      </button>

      {/* Danger Zone */}
      <div className="card p-4 border-red-500/20">
        <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-3">Danger Zone</h3>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all"
          >
            🗑️ Delete Group
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-400 text-center">This will permanently delete the group and all expenses. Are you sure?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="btn-secondary flex-1 text-sm">Cancel</button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-sm hover:bg-red-500/30 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryEmoji(cat: string) {
  const map: Record<string, string> = { trip: '✈️', roommates: '🏠', wedding: '💍', food: '🍽️', other: '📋' };
  return map[cat] || '📋';
}
