"use client";

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import CustomCursor from '@/components/shared/custom-cursor';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <CustomCursor />
    </NextThemesProvider>
  );
}
