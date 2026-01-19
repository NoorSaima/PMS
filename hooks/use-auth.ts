'use client';

import { useSession } from 'next-auth/react';

/**
 * Custom hook to access user session in client components
 * @returns Session data including user info (tokens are kept server-side only)
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    session,
  };
}
