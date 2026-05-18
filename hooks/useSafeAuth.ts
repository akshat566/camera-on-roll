'use client';

import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function useSafeAuth() {
  if (!CLERK_KEY) {
    return useMemo(() => ({ isSignedIn: false, userId: null, isLoaded: true }), []);
  }
  return useAuth();
}
