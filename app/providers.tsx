'use client';
import { useRef, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';
import type { RootState } from '../store';
import { initGuest } from '../store/slices/userSlice';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const darkMode = useSelector((s: RootState) => s.user.darkMode);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      store.dispatch(initGuest());
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
