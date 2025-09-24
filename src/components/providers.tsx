"use client";

import React, { useRef } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import CustomCursor from '@/components/shared/custom-cursor';

export const HeroBoundaryContext = React.createContext<React.RefObject<HTMLElement> | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <HeroBoundaryContext.Provider value={heroRef}>
        {children}
        <CustomCursor boundsRef={heroRef} />
      </HeroBoundaryContext.Provider>
    </NextThemesProvider>
  );
}
