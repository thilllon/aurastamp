import { Form, useFetcher } from '@remix-run/react';
import { redirect, type ActionFunction } from '@remix-run/server-runtime';
import type { UserCredential } from 'firebase/auth';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import type { SyntheticEvent } from 'react';
import { firebaseAuth } from '~/firebase.client';
import { firebaseAdminAuth } from '~/firebase.server';
import { cookie } from '../cookies';
import { Button } from '../components/ui/button';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get('idToken')?.toString();
  await firebaseAdminAuth.verifyIdToken(idToken);
  const jwt = await firebaseAdminAuth.createSessionCookie(idToken, { expiresIn: 5 * 60 * 1000 });
  return redirect('/profile', { headers: { 'Set-Cookie': await cookie.serialize(jwt) } });
};

export default function LoginRoute() {
  const fetcher = useFetcher();
  async function onProviderSignIn(credential: UserCredential) {
    const idToken = await credential.user.getIdToken();
    fetcher.submit({ idToken }, { method: 'post', action: '/login' });
  }
  async function handleSubmit(ev: SyntheticEvent) {
    ev.preventDefault();
    const target = ev.target as typeof ev.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(onProviderSignIn)
      .catch(console.error);
  }
  async function onClickGoogle() {
    await signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then(onProviderSignIn)
      .catch(console.error);
  }

  return (
    <div>
      <Button onClick={onClickGoogle}>Google</Button>
      <Form onSubmit={handleSubmit}>
        <input name="email" />
        <input name="password" />
      </Form>
    </div>
  );
}
