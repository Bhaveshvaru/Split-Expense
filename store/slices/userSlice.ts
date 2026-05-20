import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
  type: 'guest' | 'user';
  guestSessionId: string;
  userId?: string;
  name?: string;
  email?: string;
  darkMode: boolean;
}

const initialState: UserState = {
  type: 'guest',
  guestSessionId: uuidv4(),
  darkMode: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initGuest: (state) => {
      if (!state.guestSessionId) {
        state.guestSessionId = uuidv4();
      }
    },
    login: (state, action: PayloadAction<{ userId: string; name: string; email: string }>) => {
      state.type = 'user';
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.type = 'guest';
      state.userId = undefined;
      state.name = undefined;
      state.email = undefined;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { initGuest, login, logout, toggleDarkMode, setDarkMode } = userSlice.actions;
export default userSlice.reducer;
