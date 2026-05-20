'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { closeAddGroup } from '../../store/slices/uiSlice';
import { createGroupAsync, addGroupLocal } from '../../store/slices/groupsSlice';
import type { AppDispatch, RootState } from '../../store';
import type { GroupCategory } from '../../types';
import toast from 'react-hot-toast';

const MEMBER_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e','#0ea5e9','#eab308','#14b8a6'];

const categories: { value: GroupCategory; label: string; icon: string }[] = [
  { value: 'trip', label: 'Trip', icon: '✈️' },
  { value: 'roommates', label: 'Roommates', icon: '🏠' },
  { value: 'food', label: 'Food', icon: '🍽️' },
  { value: 'wedding', label: 'Wedding', icon: '💍' },
  { value: 'other', label: 'Other', icon: '📋' },
];

export function CreateGroupModal() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GroupCategory>('other');
  const [members, setMembers] = useState(['', '']);
  const [loading, setLoading] = useState(false);

  const close = () => dispatch(closeAddGroup());

  const addMember = () => { if (members.length < 20) setMembers([...members, '']); };
  const removeMember = (i: number) => { if (members.length > 2) setMembers(members.filter((_, idx) => idx !== i)); };
  const updateMember = (i: number, v: string) => { const u = [...members]; u[i] = v; setMembers(u); };

  const handleCreate = async () => {
    const validMembers = members.map(m => m.trim()).filter(Boolean);
    if (!name.trim()) return toast.error('Please enter a group name');
    if (validMembers.length < 2) return toast.error('Add at least 2 members');
    setLoading(true);
    try {
      const localId = uuidv4();
      const groupData = {
        name: name.trim(), category, currency: 'INR', description: '',
        members: validMembers.map((n, i) => ({ id: uuidv4(), name: n, color: MEMBER_COLORS[i % MEMBER_COLORS.length] })),
        _localId: localId,
      };
      const result = await dispatch(createGroupAsync(groupData as Parameters<typeof createGroupAsync>[0]));
      if (createGroupAsync.fulfilled.match(result)) {
        toast.success('Group created! 🎉');
        dispatch(closeAddGroup());
        router.push(`/group/${result.payload.groupId}`);
      } else {
        const localGroup = { ...groupData, groupId: localId, totalExpenses: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        dispatch(addGroupLocal(localGroup));
        toast.success('Saved locally — will sync when online 💾');
        dispatch(closeAddGroup());
        router.push(`/group/${localId}`);
      }
    } finally { setLoading(false); }
  };

  return (
    <>
      <div className="overlay" onClick={close} role="presentation" />
      <div className="bottom-sheet max-w-lg mx-auto" role="dialog" aria-modal aria-label="Create new group">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Create New Group</h2>
          <button onClick={close} className="btn-ghost px-2 py-1 text-xl text-slate-500" aria-label="Close">×</button>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-1">
          {/* Name */}
          <div>
            <label className="label" htmlFor="modal-group-name">Group Name *</label>
            <input id="modal-group-name" className="input" placeholder="e.g., Goa Trip 2024" value={name}
              onChange={e => setName(e.target.value)} maxLength={100} autoFocus />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    category === c.value
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                      : 'bg-surface-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                  aria-pressed={category === c.value}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="label">Members *</label>
            <div className="space-y-2">
              {members.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-8 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: `${MEMBER_COLORS[i % MEMBER_COLORS.length]}20`, color: MEMBER_COLORS[i % MEMBER_COLORS.length] }}>
                    {m.trim() ? m.trim()[0].toUpperCase() : (i + 1)}
                  </div>
                  <input className="input flex-1" placeholder={`Member ${i + 1}`} value={m}
                    onChange={e => updateMember(i, e.target.value)} maxLength={50} />
                  {members.length > 2 && (
                    <button onClick={() => removeMember(i)} className="btn-ghost px-2 text-slate-600 hover:text-red-400" aria-label="Remove">×</button>
                  )}
                </div>
              ))}
            </div>
            {members.length < 20 && (
              <button onClick={addMember} className="mt-2 text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">+ Add member</button>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={close} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleCreate} disabled={loading}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
            {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</span> : '🚀 Create Group'}
          </button>
        </div>
      </div>
    </>
  );
}
