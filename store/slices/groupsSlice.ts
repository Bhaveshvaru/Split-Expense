import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../types';

interface GroupsState {
  groups: Group[];
  currentGroupId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  groups: [],
  currentGroupId: null,
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<string | null>) => {
      state.currentGroupId = action.payload;
    },
    addGroupLocal: (state, action: PayloadAction<Group>) => {
      const exists = state.groups.find(g => g.groupId === action.payload.groupId);
      if (!exists) state.groups.unshift(action.payload);
    },
    updateGroupLocal: (state, action: PayloadAction<Group>) => {
      const idx = state.groups.findIndex(g => g.groupId === action.payload.groupId);
      if (idx >= 0) state.groups[idx] = action.payload;
    },
    removeGroupLocal: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(g => g.groupId !== action.payload);
      if (state.currentGroupId === action.payload) state.currentGroupId = null;
    },
    updateGroupTotal: (state, action: PayloadAction<{ groupId: string; delta: number }>) => {
      const group = state.groups.find(g => g.groupId === action.payload.groupId);
      if (group) group.totalExpenses += action.payload.delta;
    },
    clearError: (state) => { state.error = null; },
  },
});

export const {
  setCurrentGroup,
  addGroupLocal,
  updateGroupLocal,
  removeGroupLocal,
  updateGroupTotal,
  clearError,
} = groupsSlice.actions;
export default groupsSlice.reducer;
