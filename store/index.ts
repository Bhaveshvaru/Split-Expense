import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import groupsReducer from './slices/groupsSlice';
import expensesReducer from './slices/expensesSlice';
import uiReducer from './slices/uiSlice';

const STORAGE_KEY = 'splitease_state';

function loadState() {
  if (typeof window === 'undefined') return undefined;
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    const parsed = JSON.parse(serialized);
    if (parsed.groups) {
      parsed.groups.loading = false;
      parsed.groups.error = null;
    }
    if (parsed.expenses) {
      parsed.expenses.loading = false;
      parsed.expenses.error = null;
    }
    return parsed;
  } catch {
    return undefined;
  }
}

function saveState(state: ReturnType<typeof store.getState>) {
  try {
    const toSave = {
      user: state.user,
      groups: {
        groups: state.groups.groups,
        currentGroupId: state.groups.currentGroupId,
        loading: false,
        error: null,
      },
      expenses: {
        expenses: state.expenses.expenses,
        loading: false,
        error: null,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage might be full
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  groups: groupsReducer,
  expenses: expensesReducer,
  ui: uiReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

if (typeof window !== 'undefined') {
  let saveTimeout: NodeJS.Timeout;
  store.subscribe(() => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveState(store.getState()), 300);
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
