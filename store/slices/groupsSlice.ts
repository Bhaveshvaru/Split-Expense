import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../types';
import { apiClient } from '../../lib/api';
import { offlineQueue, isNetworkError } from '../../lib/offlineQueue';

export type CreateGroupInput = Omit<Group, 'groupId' | 'totalExpenses' | 'createdAt' | 'updatedAt'> & { _localId?: string };

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

// Async thunks
export const fetchGroups = createAsyncThunk('groups/fetchAll', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { user: { guestSessionId: string; userId?: string } };
    return await apiClient.getGroups(state.user.guestSessionId);
  } catch (err: unknown) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch groups');
  }
});

export const createGroupAsync = createAsyncThunk(
  'groups/create',
  async ({ _localId, ...data }: CreateGroupInput, { getState, rejectWithValue }) => {
    const state = getState() as { user: { guestSessionId: string; userId?: string } };
    const { guestSessionId } = state.user;
    try {
      return await apiClient.createGroup(data, guestSessionId);
    } catch (err) {
      if (isNetworkError(err) && _localId) {
        offlineQueue.enqueue({ type: 'createGroup', data, localGroupId: _localId, guestSessionId });
      }
      return rejectWithValue('Failed to create group');
    }
  }
);

export const updateGroupAsync = createAsyncThunk(
  'groups/update',
  async ({ groupId, data }: { groupId: string; data: Partial<Group> }, { rejectWithValue }) => {
    try {
      return await apiClient.updateGroup(groupId, data);
    } catch (err) {
      if (isNetworkError(err)) {
        offlineQueue.enqueue({ type: 'updateGroup', groupId, data });
      }
      return rejectWithValue('Failed to update group');
    }
  }
);

export const deleteGroupAsync = createAsyncThunk(
  'groups/delete',
  async (groupId: string, { rejectWithValue }) => {
    try {
      await apiClient.deleteGroup(groupId);
      return groupId;
    } catch (err) {
      if (isNetworkError(err)) {
        offlineQueue.enqueue({ type: 'deleteGroup', groupId });
      }
      return rejectWithValue('Failed to delete group');
    }
  }
);

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
    },
    updateGroupTotal: (state, action: PayloadAction<{ groupId: string; delta: number }>) => {
      const group = state.groups.find(g => g.groupId === action.payload.groupId);
      if (group) group.totalExpenses += action.payload.delta;
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        // Merge: keep local-only groups, update synced ones
        const remoteIds = new Set(action.payload.map((g: Group) => g.groupId));
        const localOnly = state.groups.filter(g => !remoteIds.has(g.groupId));
        state.groups = [...action.payload, ...localOnly];
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGroupAsync.pending, (state) => { state.loading = true; })
      .addCase(createGroupAsync.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.groups.find(g => g.groupId === action.payload.groupId);
        if (!exists) state.groups.unshift(action.payload);
      })
      .addCase(createGroupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateGroupAsync.fulfilled, (state, action) => {
        const idx = state.groups.findIndex(g => g.groupId === action.payload.groupId);
        if (idx >= 0) state.groups[idx] = action.payload;
      })
      .addCase(deleteGroupAsync.fulfilled, (state, action) => {
        state.groups = state.groups.filter(g => g.groupId !== action.payload);
        if (state.currentGroupId === action.payload) state.currentGroupId = null;
      });
  },
});

export const { setCurrentGroup, addGroupLocal, updateGroupLocal, removeGroupLocal, updateGroupTotal, clearError } = groupsSlice.actions;
export default groupsSlice.reducer;
