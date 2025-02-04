import { useState } from 'react';
import './App.css';

import { useSession, signUp, signIn, signOut } from './lib/auth-client';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

  const { data } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerMode) {
      await signUp.email(
        { name, email, password },
        {
          redirectTo: '/',
          onRequest: () => {
            // Loading...
          },
          onSuccess: (data) => {
            console.log('success', data);
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else {
      await signIn.email({ email, password });
    }
  };
  return (
    <div>
      {data?.user ? (
        <div>
          <h1>Welcome {data.user.name}</h1>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {registerMode ? (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign up</button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign in</button>
            </>
          )}

          <div>
            <span>
              {registerMode ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={() => setRegisterMode(!registerMode)}>
                {registerMode ? 'Sign in' : 'Sign up'}
              </button>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
