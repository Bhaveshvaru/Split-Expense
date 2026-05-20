import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showAddExpense: boolean;
  showAddGroup: boolean;
  showSettlement: boolean;
  activeModal: string | null;
  editingExpenseId: string | null;
}

const initialState: UIState = {
  showAddExpense: false,
  showAddGroup: false,
  showSettlement: false,
  activeModal: null,
  editingExpenseId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddExpense: (state) => { state.showAddExpense = true; },
    closeAddExpense: (state) => { state.showAddExpense = false; state.editingExpenseId = null; },
    openAddGroup: (state) => { state.showAddGroup = true; },
    closeAddGroup: (state) => { state.showAddGroup = false; },
    openSettlement: (state) => { state.showSettlement = true; },
    closeSettlement: (state) => { state.showSettlement = false; },
    setActiveModal: (state, action: PayloadAction<string | null>) => { state.activeModal = action.payload; },
    setEditingExpense: (state, action: PayloadAction<string | null>) => {
      state.editingExpenseId = action.payload;
      if (action.payload) state.showAddExpense = true;
    },
    closeAll: (state) => {
      state.showAddExpense = false;
      state.showAddGroup = false;
      state.showSettlement = false;
      state.activeModal = null;
      state.editingExpenseId = null;
    },
  },
});

export const {
  openAddExpense, closeAddExpense,
  openAddGroup, closeAddGroup,
  openSettlement, closeSettlement,
  setActiveModal, setEditingExpense, closeAll,
} = uiSlice.actions;
export default uiSlice.reducer;
