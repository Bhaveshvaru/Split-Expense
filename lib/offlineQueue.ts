import type { Group, Expense } from '../types';

export type QueuedOp =
  | {
      id: string;
      type: 'createGroup';
      data: Omit<Group, 'groupId' | 'totalExpenses' | 'createdAt' | 'updatedAt'>;
      localGroupId: string;
      guestSessionId: string;
      timestamp: string;
    }
  | {
      id: string;
      type: 'updateGroup';
      groupId: string;
      data: Partial<Group>;
      timestamp: string;
    }
  | {
      id: string;
      type: 'deleteGroup';
      groupId: string;
      timestamp: string;
    }
  | {
      id: string;
      type: 'createExpense';
      data: Omit<Expense, 'expenseId' | 'createdAt'>;
      localExpenseId: string;
      guestSessionId: string;
      timestamp: string;
    }
  | {
      id: string;
      type: 'updateExpense';
      expenseId: string;
      data: Partial<Expense>;
      timestamp: string;
    }
  | {
      id: string;
      type: 'deleteExpense';
      expenseId: string;
      groupId: string;
      timestamp: string;
    };

const QUEUE_KEY = 'splitease_sync_queue';

function load(): QueuedOp[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as QueuedOp[]) : [];
  } catch {
    return [];
  }
}

function save(ops: QueuedOp[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(ops));
  } catch {}
}

type EnqueueInput = Omit<QueuedOp, 'id' | 'timestamp'>;

function genId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const offlineQueue = {
  enqueue(op: EnqueueInput): void {
    const ops = load();
    const full = { ...op, id: genId(), timestamp: new Date().toISOString() } as QueuedOp;
    ops.push(full);
    save(ops);
  },

  dequeue(id: string): void {
    save(load().filter((op) => op.id !== id));
  },

  getAll(): QueuedOp[] {
    return load();
  },

  count(): number {
    return load().length;
  },

  clear(): void {
    save([]);
  },
};

export function isNetworkError(err: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  if (!(err instanceof TypeError)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('network request failed') ||
    msg.includes('load failed') ||
    msg.includes('networkerror')
  );
}
