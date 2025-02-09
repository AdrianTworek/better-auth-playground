import { createAuthClient } from 'better-auth/client';
import { environment } from '../environments/environment.development';

export const authClient = createAuthClient({
  baseURL: environment.authBaseUrl,
});
