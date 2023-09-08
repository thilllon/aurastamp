import type { Session } from '@remix-run/node';
import type { DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import { sessionService } from '../../sessions.server';
import { CONST, config } from '../constants';
import { signInWithPassword } from '../firebase.server';

export const authService = {
  firebase_verifySessionCookie: async (
    session: Session
  ): Promise<DecodedIdToken | { uid: undefined }> => {
    try {
      const sessionCookie = session.get(CONST.SESSION_KEY);
      return getAuth().verifySessionCookie(sessionCookie);
    } catch {
      return { uid: undefined };
    }
  },
  firebase_requireAuth: async (request: Request): Promise<UserRecord> => {
    const session = await sessionService.getSessionFromCookie(request);
    const { uid } = await authService.firebase_verifySessionCookie(session);
    if (!uid) {
      throw await sessionService.destroySessionCookie(request, '/login');
    }
    return getAuth().getUser(uid);
  },
  firebase_signIn: async (email: string, password: string): Promise<string> => {
    const { idToken } = await signInWithPassword(email, password);
    return authService.firebase_signInWithToken(idToken);
  },
  firebase_signInWithToken: async (idToken: string): Promise<string> => {
    return getAuth().createSessionCookie(idToken, { expiresIn: config.expiresIn });
  },
  firebase_signUp: async (name: string, email: string, password: string): Promise<string> => {
    await getAuth().createUser({ email, password, displayName: name });
    return authService.firebase_signIn(email, password);
  },
};
