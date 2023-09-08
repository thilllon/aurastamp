import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { CONST, authService } from '../lib';
import { commitSession, sessionService } from '../lib/services/session-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionService.getSessionFromCookie(request);
  const { uid } = await authService.verifySessionCookie(session);
  const headers = { 'Set-Cookie': await commitSession(session) };
  if (uid) {
    return redirect('/', { headers });
  }
  return json(null, { headers });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const email = form.get('email');
  const password = form.get('password');
  const formError = json({ error: 'Please fill all fields!' }, { status: 400 });

  if (typeof name !== 'string') return formError;
  if (typeof email !== 'string') return formError;
  if (typeof password !== 'string') return formError;

  try {
    const sessionCookie = await authService.signUp(name, email, password);
    const session = await sessionService.getSessionFromCookie(request);
    session.set(CONST.SESSION_KEY, sessionCookie);
    return redirect('/', { headers: { 'Set-Cookie': await commitSession(session) } });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

export default function JoinRoute() {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <h1>Join</h1>
      {actionData?.error && <p>{actionData.error}</p>}
      <Form method="post">
        <input style={{ display: 'block' }} name="name" placeholder="Peter" type="text" />
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
          Join
        </button>
      </Form>
      <p>
        Do you want to <Link to="/login">login</Link>?
      </p>
    </div>
  );
}
