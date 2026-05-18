'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!publishableKey) {
    return <>{children}</>;
  }
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}
