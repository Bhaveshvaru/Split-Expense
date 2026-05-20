import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncState {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAt: string | null;
}

const initialState: SyncState = {
  isOnline: true,
  pendingCount: 0,
  isSyncing: false,
  lastSyncAt: null,
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setOnline(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    setPendingCount(state, action: PayloadAction<number>) {
      state.pendingCount = action.payload;
    },
    setSyncing(state, action: PayloadAction<boolean>) {
      state.isSyncing = action.payload;
    },
    markSyncComplete(state) {
      state.isSyncing = false;
      state.pendingCount = 0;
      state.lastSyncAt = new Date().toISOString();
    },
  },
});

export const { setOnline, setPendingCount, setSyncing, markSyncComplete } = syncSlice.actions;
export default syncSlice.reducer;
