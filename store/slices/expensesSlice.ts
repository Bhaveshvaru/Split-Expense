import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types';
import { apiClient } from '../../lib/api';
import { offlineQueue, isNetworkError } from '../../lib/offlineQueue';

export type CreateExpenseInput = Omit<Expense, 'expenseId' | 'createdAt'> & { _localId?: string };

interface ExpensesState {
  expenses: Record<string, Expense[]>;
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: {},
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchByGroup',
  async (groupId: string, { rejectWithValue }) => {
    try {
      const data = await apiClient.getExpenses(groupId);
      return { groupId, expenses: data };
    } catch {
      return rejectWithValue('Failed to fetch expenses');
    }
  }
);

export const createExpenseAsync = createAsyncThunk(
  'expenses/create',
  async ({ _localId, ...data }: CreateExpenseInput, { getState, rejectWithValue }) => {
    const state = getState() as { user: { guestSessionId: string } };
    const { guestSessionId } = state.user;
    try {
      return await apiClient.createExpense(data, guestSessionId);
    } catch (err) {
      if (isNetworkError(err) && _localId) {
        offlineQueue.enqueue({ type: 'createExpense', data, localExpenseId: _localId, guestSessionId });
      }
      return rejectWithValue('Failed to create expense');
    }
  }
);

export const updateExpenseAsync = createAsyncThunk(
  'expenses/update',
  async ({ expenseId, data }: { expenseId: string; data: Partial<Expense> }, { rejectWithValue }) => {
    try {
      return await apiClient.updateExpense(expenseId, data);
    } catch (err) {
      if (isNetworkError(err)) {
        offlineQueue.enqueue({ type: 'updateExpense', expenseId, data });
      }
      return rejectWithValue('Failed to update expense');
    }
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/delete',
  async ({ expenseId, groupId }: { expenseId: string; groupId: string }, { rejectWithValue }) => {
    try {
      await apiClient.deleteExpense(expenseId);
      return { expenseId, groupId };
    } catch (err) {
      if (isNetworkError(err)) {
        offlineQueue.enqueue({ type: 'deleteExpense', expenseId, groupId });
      }
      return rejectWithValue('Failed to delete expense');
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenseLocal: (state, action: PayloadAction<Expense>) => {
      const { groupId } = action.payload;
      if (!state.expenses[groupId]) state.expenses[groupId] = [];
      const exists = state.expenses[groupId].find(e => e.expenseId === action.payload.expenseId);
      if (!exists) state.expenses[groupId].unshift(action.payload);
    },
    updateExpenseLocal: (state, action: PayloadAction<Expense>) => {
      const { groupId } = action.payload;
      if (!state.expenses[groupId]) return;
      const idx = state.expenses[groupId].findIndex(e => e.expenseId === action.payload.expenseId);
      if (idx >= 0) state.expenses[groupId][idx] = action.payload;
    },
    removeExpenseLocal: (state, action: PayloadAction<{ expenseId: string; groupId: string }>) => {
      const { expenseId, groupId } = action.payload;
      if (!state.expenses[groupId]) return;
      state.expenses[groupId] = state.expenses[groupId].filter(e => e.expenseId !== expenseId);
    },
    clearGroupExpenses: (state, action: PayloadAction<string>) => {
      delete state.expenses[action.payload];
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.loading = true; })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses[action.payload.groupId] = action.payload.expenses;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createExpenseAsync.fulfilled, (state, action) => {
        const expense = action.payload;
        if (!state.expenses[expense.groupId]) state.expenses[expense.groupId] = [];
        const exists = state.expenses[expense.groupId].find(e => e.expenseId === expense.expenseId);
        if (!exists) state.expenses[expense.groupId].unshift(expense);
      })
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const expense = action.payload;
        const list = state.expenses[expense.groupId];
        if (list) {
          const idx = list.findIndex(e => e.expenseId === expense.expenseId);
          if (idx >= 0) list[idx] = expense;
        }
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        const { expenseId, groupId } = action.payload;
        if (state.expenses[groupId]) {
          state.expenses[groupId] = state.expenses[groupId].filter(e => e.expenseId !== expenseId);
        }
      });
  },
});

export const { addExpenseLocal, updateExpenseLocal, removeExpenseLocal, clearGroupExpenses, clearError } = expensesSlice.actions;
export default expensesSlice.reducer;
