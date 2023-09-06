import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { commitSession, getSession } from '~/sessions';
import { isRestError, restApiService } from '../firebase-rest-service';
import { authService, getRestConfig } from '../server';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await authService.checkSessionCookie(session);
  const headers = { 'Set-Cookie': await commitSession(session) };
  if (uid) {
    return redirect('/', { headers });
  }
  const { apiKey, domain } = getRestConfig();
  return json({ apiKey, domain }, { headers });
};

type ActionData = {
  error?: string;
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const idToken = form.get('idToken');
  let sessionCookie;
  try {
    if (typeof idToken === 'string') {
      sessionCookie = await authService.signInWithToken(idToken);
    } else {
      const email = form.get('email');
      const password = form.get('password');
      const formError = json({ error: 'Please fill all fields!' }, { status: 400 });
      if (typeof email !== 'string') return formError;
      if (typeof password !== 'string') return formError;
      sessionCookie = await authService.signIn(email, password);
    }
    const session = await getSession(request.headers.get('cookie'));
    session.set('session', sessionCookie);
    return redirect('/', { headers: { 'Set-Cookie': await commitSession(session) } });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

export default function Login() {
  const [clientAction, setClientAction] = useState<ActionData>();
  const actionData = useActionData<typeof action>();
  const restConfig = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // To avoid rate limiting, we sign in client side if we can.
      const login = await restApiService.signInWithPassword(
        {
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
          returnSecureToken: true,
        },
        restConfig
      );
      if (isRestError(login)) {
        setClientAction({ error: login.error.message });
        return;
      }
      submit({ idToken: login.idToken }, { method: 'post' });
    },
    [submit, restConfig]
  );

  const onClickGoogle = async () => {
    // await signInWithPopup(firebaseAuth, new GoogleAuthProvider()).then(onProviderSignIn).catch(console.error);
  };

  return (
    <div>
      <h1>Login</h1>
      {clientAction?.error || actionData?.error ? (
        <p>{clientAction?.error || actionData?.error}</p>
      ) : null}
      <form method="post" onSubmit={handleSubmit}>
        <input
          style={{ display: 'block' }}
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <input
          style={{ display: 'block' }}
          name="password"
          placeholder="password"
          type="password"
        />
        <button style={{ display: 'block' }} type="submit">
          Login
        </button>
      </form>
      <p>
        Do you want to <Link to="/join">join</Link>?
      </p>

      <button onClick={onClickGoogle}>google</button>
    </div>
  );
}
