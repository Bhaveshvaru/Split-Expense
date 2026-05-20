'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { RootState, AppDispatch } from '../../store';
import type { Group } from '../../types';
import { openAddGroup } from '../../store/slices/uiSlice';
import { formatCurrency } from '../../lib/settlement';

const CreateGroupModal = dynamic(
  () => import('./CreateGroupModal').then(m => ({ default: m.CreateGroupModal })),
  { ssr: false },
);

function getCategoryEmoji(cat: string) {
  const map: Record<string, string> = { trip: '✈️', roommates: '🏠', wedding: '💍', food: '🍽️', other: '📋' };
  return map[cat] || '📋';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function MyGroupsView() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const groups = useSelector((s: RootState) => s.groups.groups);
  const showAddGroup = useSelector((s: RootState) => s.ui.showAddGroup);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Groups</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {groups.length === 0 ? 'No groups yet' : `${groups.length} group${groups.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <button
          onClick={() => dispatch(openAddGroup())}
          className="btn-primary text-sm px-4 py-2"
        >
          + New Group
        </button>
      </div>

      {/* Groups List */}
      {groups.length === 0 ? (
        <EmptyState onNew={() => dispatch(openAddGroup())} />
      ) : (
        <div className="space-y-3">
          {groups.map(group => (
            <GroupCard key={group.groupId} group={group} />
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      {showAddGroup && <CreateGroupModal />}
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/group/${group.groupId}`}
      className="block card p-4 hover:border-brand-500/30 hover:shadow-glow-sm transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center text-2xl shrink-0">
          {getCategoryEmoji(group.category)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-white truncate group-hover:text-brand-300 transition-colors">
              {group.name}
            </h2>
            <span className="text-xs text-slate-500 shrink-0">{formatDate(group.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-400">
              {group.members.length} member{group.members.length === 1 ? '' : 's'}
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-xs font-medium text-brand-400">
              {formatCurrency(group.totalExpenses, group.currency)} total
            </span>
          </div>
          {/* Member avatars */}
          <div className="flex items-center gap-1 mt-2">
            {group.members.slice(0, 6).map(m => (
              <div
                key={m.id}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-surface-900"
                style={{ background: m.color }}
                title={m.name}
              >
                {m.name[0].toUpperCase()}
              </div>
            ))}
            {group.members.length > 6 && (
              <div className="w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-xs text-slate-400 border-2 border-surface-900">
                +{group.members.length - 6}
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors">→</div>
      </div>
    </Link>
  );
}

function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="card p-12 text-center">
      <div className="text-5xl mb-4">👥</div>
      <h2 className="text-lg font-semibold text-white mb-2">No groups yet</h2>
      <p className="text-sm text-slate-400 mb-6">Create your first group to start splitting expenses with friends.</p>
      <button onClick={onNew} className="btn-primary px-6 py-2.5">
        + Create Your First Group
      </button>
    </div>
  );
}
