'use client';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import type { AppDispatch, RootState } from '../store';
import { setOnline, setPendingCount, setSyncing, markSyncComplete } from '../store/slices/syncSlice';
import { addGroupLocal, removeGroupLocal, updateGroupLocal } from '../store/slices/groupsSlice';
import { addExpenseLocal, removeExpenseLocal, updateExpenseLocal } from '../store/slices/expensesSlice';
import { offlineQueue, type QueuedOp } from '../lib/offlineQueue';
import { apiClient } from '../lib/api';

export function useNetworkSync() {
  const dispatch = useDispatch<AppDispatch>();
  const guestSessionId = useSelector((s: RootState) => s.user.guestSessionId);

  const flushQueue = useCallback(async () => {
    const ops = offlineQueue.getAll();
    if (ops.length === 0) return;

    dispatch(setSyncing(true));
    dispatch(setPendingCount(ops.length));

    let synced = 0;

    for (const op of ops) {
      try {
        await replayOp(op, guestSessionId, dispatch);
        offlineQueue.dequeue(op.id);
        synced++;
        dispatch(setPendingCount(offlineQueue.count()));
      } catch {
        // Keep in queue; will retry on next online event
      }
    }

    dispatch(markSyncComplete());

    if (synced > 0) {
      toast.success(`Synced ${synced} pending change${synced > 1 ? 's' : ''} ☁️`, { duration: 3000 });
    }
  }, [dispatch, guestSessionId]);

  useEffect(() => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    dispatch(setOnline(online));
    dispatch(setPendingCount(offlineQueue.count()));

    if (online && offlineQueue.count() > 0) {
      flushQueue();
    }

    const handleOnline = () => {
      dispatch(setOnline(true));
      toast('Back online! Syncing changes…', { id: 'net', icon: '☁️', duration: 2500 });
      flushQueue();
    };

    const handleOffline = () => {
      dispatch(setOnline(false));
      dispatch(setPendingCount(offlineQueue.count()));
      toast("You're offline. Changes saved locally.", { id: 'net', icon: '📶', duration: 4000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch, flushQueue]);
}

async function replayOp(op: QueuedOp, guestSessionId: string, dispatch: AppDispatch): Promise<void> {
  switch (op.type) {
    case 'createGroup': {
      const gs = op.guestSessionId || guestSessionId;
      const created = await apiClient.createGroup(op.data, gs);
      // Swap the local placeholder out for the server entity
      dispatch(removeGroupLocal(op.localGroupId));
      dispatch(addGroupLocal(created));
      break;
    }
    case 'updateGroup': {
      const updated = await apiClient.updateGroup(op.groupId, op.data);
      dispatch(updateGroupLocal(updated));
      break;
    }
    case 'deleteGroup': {
      await apiClient.deleteGroup(op.groupId);
      break;
    }
    case 'createExpense': {
      const gs = op.guestSessionId || guestSessionId;
      const created = await apiClient.createExpense(op.data, gs);
      dispatch(removeExpenseLocal({ expenseId: op.localExpenseId, groupId: op.data.groupId }));
      dispatch(addExpenseLocal(created));
      break;
    }
    case 'updateExpense': {
      const updated = await apiClient.updateExpense(op.expenseId, op.data);
      dispatch(updateExpenseLocal(updated));
      break;
    }
    case 'deleteExpense': {
      await apiClient.deleteExpense(op.expenseId);
      break;
    }
  }
}
