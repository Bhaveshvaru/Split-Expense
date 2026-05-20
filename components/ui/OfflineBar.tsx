'use client';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export function OfflineBar() {
  const { isOnline, pendingCount, isSyncing } = useSelector((s: RootState) => s.sync);

  const showOffline = !isOnline;
  const showSyncing = isOnline && isSyncing && pendingCount > 0;

  if (!showOffline && !showSyncing) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`sticky top-14 z-20 flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm ${
        showOffline ? 'bg-amber-500/95' : 'bg-brand-600/95'
      }`}
    >
      {showOffline && (
        <>
          <span aria-hidden>📶</span>
          <span>Offline — changes saved locally</span>
          {pendingCount > 0 && (
            <span className="ml-1 bg-white/25 px-2 py-0.5 rounded-full tabular-nums">
              {pendingCount} pending
            </span>
          )}
        </>
      )}
      {showSyncing && (
        <>
          <span
            className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin"
            aria-hidden
          />
          <span>
            Syncing {pendingCount} change{pendingCount !== 1 ? 's' : ''}…
          </span>
        </>
      )}
    </div>
  );
}
