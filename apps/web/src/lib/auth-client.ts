import { createAuthClient } from 'better-auth/react';

export const { useSession, signUp, signIn, signOut } = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:4000',
});
