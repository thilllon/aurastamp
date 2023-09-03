import { createCookie } from '@remix-run/node';
import { COOKIE_NAME } from './constants';

/**
 * runs on server-side
 */
export const cookie = createCookie(COOKIE_NAME, {
  secrets: [process.env.COOKIE_SECRET],
  maxAge: 300, // Ensure this is the same as the expiry date on the JWT
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
});
