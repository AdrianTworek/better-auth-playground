import { Injectable, signal } from '@angular/core';
import type { Session as BetterAuthSession, User } from 'better-auth';
import { authClient } from '../lib/auth-client';
import { from, startWith } from 'rxjs';

type Session = {
  data: {
    user: User | null;
    session: BetterAuthSession | null;
  };
  isPending: boolean;
  error: Error | null;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private initialSession: Session = {
    data: {
      user: null,
      session: null,
    },
    isPending: false,
    error: null,
  };

  private authClient = authClient;
  session = signal<Session>(this.initialSession);

  getSession() {
    from(this.authClient.getSession())
      .pipe(
        startWith({
          data: null,
          error: null,
          isPending: true,
        }),
      )
      .subscribe((session) => {
        this.session.set({
          data: {
            user: session?.data?.user ?? null,
            session: session?.data?.session ?? null,
          },
          isPending: false,
          error: session?.error ? new Error(session.error.message) : null,
        });
      });
  }

  signIn(email: string, password: string) {
    this.authClient.signIn.email(
      { email, password },
      {
        onRequest: () => {
          this.session.set({
            ...this.initialSession,
            isPending: true,
          });
        },
        onSuccess: (data) => {
          console.log('success', data.data.user);
          this.session.set({
            data: {
              user: data.data.user,
              session: data.data.session,
            },
            isPending: false,
            error: null,
          });
        },
        onError: (error) => {
          console.error(error);
          this.session.set({
            ...this.initialSession,
            error: error.error,
          });
        },
      },
    );
  }

  signUp(name: string, email: string, password: string) {
    this.authClient.signUp.email(
      { name, email, password },
      {
        onRequest: () => {
          this.session.set({
            data: {
              user: null,
              session: null,
            },
            isPending: true,
            error: null,
          });
        },
        onSuccess: (data) => {
          console.log('success', data.data.user);
          this.session.set({
            data: {
              user: data.data.user,
              session: data.data.session,
            },
            isPending: false,
            error: null,
          });
        },
        onError: (error) => {
          console.error(error);
          this.session.set({
            ...this.initialSession,
            error: error.error,
          });
        },
      },
    );
  }

  signOut() {
    this.authClient.signOut();
    this.session.set(this.initialSession);
  }
}
