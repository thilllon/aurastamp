import { createCookieSessionStorage, redirect } from '@remix-run/node';

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: ['fancy-secret-key'],
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

export const sessionService = {
  getSessionFromCookie: async (request: Request) => {
    const cookie = request.headers.get('cookie');
    return getSession(cookie);
  },
  setSessionToCookie: async (session: any, redirectTo: string): Promise<void> => {
    //
  },
  destroySessionCookie: async (request: Request, redirectTo: string): Promise<Response> => {
    const session = await sessionService.getSessionFromCookie(request);
    return redirect(redirectTo, { headers: { 'Set-Cookie': await destroySession(session) } });
  },
  // getUserId: async (request: Request) => {
  //   const USER_SESSION_KEY = 'userId';
  //   const session = await sessionService.getSessionFromCookie(request);
  //   return session.get(USER_SESSION_KEY);
  // },
  // requireUserId: async (request: Request, redirectTo: string = new URL(request.url).pathname) => {
  //   const userId = await sessionService.getUserId(request);
  //   if (!userId) {
  //     const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
  //     throw redirect(`/login?${searchParams}`);
  //   }
  //   return userId;
  // },
};
