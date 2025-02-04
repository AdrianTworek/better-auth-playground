import { createAuthClient } from 'better-auth/react';

export const { useSession, signUp, signIn, signOut } = createAuthClient({
  baseURL: 'http://localhost:4000',
});
