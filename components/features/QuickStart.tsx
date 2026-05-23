'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { addGroupLocal } from '../../store/slices/groupsSlice';
import type { AppDispatch } from '../../store';
import type { GroupCategory } from '../../types';
import toast from 'react-hot-toast';

interface Props {
  defaultCategory?: GroupCategory;
}

const MEMBER_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e','#0ea5e9','#eab308','#14b8a6'];

export function QuickStart({ defaultCategory = 'other' }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['', '']);
  const addMember = () => {
    if (members.length < 10) setMembers([...members, '']);
  };

  const removeMember = (i: number) => {
    if (members.length > 2) setMembers(members.filter((_, idx) => idx !== i));
  };

  const updateMember = (i: number, val: string) => {
    const updated = [...members];
    updated[i] = val;
    setMembers(updated);
  };

  const handleCreate = () => {
    const validMembers = members.map(m => m.trim()).filter(Boolean);
    if (!groupName.trim()) return toast.error('Please enter a group name');
    if (validMembers.length < 2) return toast.error('Add at least 2 members');

    const groupId = uuidv4();
    const now = new Date().toISOString();
    dispatch(addGroupLocal({
      groupId,
      name: groupName.trim(),
      category: defaultCategory,
      currency: 'INR',
      description: '',
      members: validMembers.map((name, i) => ({
        id: uuidv4(),
        name,
        color: MEMBER_COLORS[i % MEMBER_COLORS.length],
      })),
      totalExpenses: 0,
      createdAt: now,
      updatedAt: now,
    }));
    toast.success('Group created! 🎉');
    router.push(`/group/${groupId}`);
  };

  return (
    <section className="max-w-lg mx-auto px-4" id="start" aria-label="Quick group creator">
      <div className="card p-6 border-brand-500/10 shadow-glow-green">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 text-lg">⚡</div>
          <div>
            <h2 className="font-semibold text-white text-sm">Create a Group — Free, Instant</h2>
            <p className="text-xs text-slate-500">No login required</p>
          </div>
          {/* Step indicator */}
          <div className="ml-auto flex gap-1.5">
            {[1, 2].map(s => (
              <div key={s} className={`w-6 h-1.5 rounded-full transition-colors ${step >= s ? 'bg-brand-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="label" htmlFor="qs-group-name">Group Name</label>
              <input
                id="qs-group-name"
                className="input"
                placeholder="e.g., Goa Trip 2024, Office Lunch"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && groupName.trim()) setStep(2); }}
                autoFocus
                maxLength={100}
              />
            </div>
            <button
              onClick={() => groupName.trim() && setStep(2)}
              disabled={!groupName.trim()}
              className="btn-primary w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next: Add Members →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1">
                ← {groupName}
              </button>
            </div>

            <div>
              <label className="label">Members ({members.filter(Boolean).length} added)</label>
              <div className="space-y-2">
                {members.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-8 h-10 rounded-lg flex items-center justify-center text-sm font-medium shrink-0"
                      style={{ background: `${MEMBER_COLORS[i % MEMBER_COLORS.length]}20`, color: MEMBER_COLORS[i % MEMBER_COLORS.length] }}>
                      {m.trim() ? m.trim()[0].toUpperCase() : (i + 1)}
                    </div>
                    <input
                      className="input flex-1"
                      placeholder={`Member ${i + 1} name`}
                      value={m}
                      onChange={e => updateMember(i, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { if (i === members.length - 1) addMember(); } }}
                      maxLength={50}
                      aria-label={`Member ${i + 1}`}
                    />
                    {members.length > 2 && (
                      <button onClick={() => removeMember(i)} className="btn-ghost px-2 text-slate-600 hover:text-red-400" aria-label="Remove member">×</button>
                    )}
                  </div>
                ))}
              </div>
              {members.length < 10 && (
                <button onClick={addMember} className="mt-2 text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
                  + Add another member
                </button>
              )}
            </div>

            <button
              onClick={handleCreate}
              disabled={members.filter(m => m.trim()).length < 2}
              className="btn-primary w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              🚀 Create Group & Start Splitting
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
