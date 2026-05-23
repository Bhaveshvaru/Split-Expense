import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types';

export type CreateExpenseInput = Omit<Expense, 'expenseId' | 'createdAt'>;

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
});

export const {
  addExpenseLocal,
  updateExpenseLocal,
  removeExpenseLocal,
  clearGroupExpenses,
  clearError,
} = expensesSlice.actions;
export default expensesSlice.reducer;
