'use client';

import { DarkModeProvider } from '@/context/DarkModeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
