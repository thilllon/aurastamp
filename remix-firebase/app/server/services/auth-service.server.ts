import type { Session } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getAuth, type UserRecord } from 'firebase-admin/auth';

import { destroySession, getSession } from '~/sessions';

import { auth } from '../firebase.server';

export const authService = {
  checkSessionCookie: async (session: Session) => {
    try {
      const decodedIdToken = await getAuth().verifySessionCookie(session.get('session') || '');
      return decodedIdToken;
    } catch {
      return { uid: undefined };
    }
  },
  requireAuth: async (request: Request): Promise<UserRecord> => {
    const session = await getSession(request.headers.get('cookie'));
    const { uid } = await authService.checkSessionCookie(session);
    if (!uid) {
      throw redirect('/login', { headers: { 'Set-Cookie': await destroySession(session) } });
    }
    return getAuth().getUser(uid);
  },
  signIn: async (email: string, password: string) => {
    const { idToken } = await auth.signInWithPassword(email, password);
    return authService.signInWithToken(idToken);
  },
  signInWithToken: async (idToken: string) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 7;
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
  },
  signUp: async (name: string, email: string, password: string) => {
    await getAuth().createUser({ email, password, displayName: name });
    return authService.signIn(email, password);
  },
};
