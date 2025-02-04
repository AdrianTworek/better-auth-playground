import { createAuthClient } from 'better-auth/react';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';

export const { useSession, signUp, signIn, signOut } = createAuthClient({
  baseURL: 'http://localhost:4000',
  plugins: [
    expoClient({
      scheme: 'mobile',
      storagePrefix: 'mobile',
      storage: SecureStore,
    }),
  ],
});
