import { Button, RadioGroupItem, Text } from '@radix-ui/themes';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { TabsDemo } from '../components/tabs-demo';
import { Label } from '../components/ui/label';
import { RadioGroup } from '../components/ui/radio-group';
import { CONST, authService, isRestError, restApiService } from '../lib';
import { commitSession, sessionService } from '../sessions.server';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionService.getSessionFromCookie(request);
  const { uid } = await authService.firebase_verifySessionCookie(session);
  if (uid) {
    return redirect('/', { headers: { 'Set-Cookie': await commitSession(session) } });
  }
  return json(
    { apiKey: process.env.API_KEY ?? '', domain: 'https://identitytoolkit.googleapis.com' },
    { headers: { 'Set-Cookie': await commitSession(session) } }
  );
};

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get('idToken');
  let sessionCookie;
  try {
    if (typeof idToken === 'string') {
      sessionCookie = await authService.firebase_signInWithToken(idToken);
    } else {
      const email = form.get('email');
      const password = form.get('password');
      const formError = json({ error: 'Please fill all fields!' }, { status: 400 });
      if (typeof email !== 'string') return formError;
      if (typeof password !== 'string') return formError;
      sessionCookie = await authService.firebase_signIn(email, password);
    }
    const session = await sessionService.getSessionFromCookie(request);
    session.set(CONST.SESSION_KEY, sessionCookie);
    return redirect('/', { headers: { 'Set-Cookie': await commitSession(session) } });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

export default function LoginRoute() {
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
      <TabsDemo />
      {/* <Button2>button222</Button2> */}
      <Button variant="outline">button radix</Button>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>

      <h1>Login</h1>
      <Text size={'6'}>sdfsd</Text>

      {(clientAction?.error || actionData?.error) && (
        <p>{clientAction?.error || actionData?.error}</p>
      )}
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
