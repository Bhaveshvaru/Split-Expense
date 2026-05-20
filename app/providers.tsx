'use client';
import { useRef, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';
import type { RootState } from '../store';
import { initGuest } from '../store/slices/userSlice';
import { useNetworkSync } from '../hooks/useNetworkSync';
import { OfflineBar } from '../components/ui/OfflineBar';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const darkMode = useSelector((s: RootState) => s.user.darkMode);

  // One-time app init
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      store.dispatch(initGuest());
    }
  }, []);

  // Sync darkMode → <html class="dark"> on every change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useNetworkSync();

  return (
    <>
      <OfflineBar />
      {children}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
