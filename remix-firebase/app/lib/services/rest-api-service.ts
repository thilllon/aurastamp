import type { AxiosError } from 'axios';
import axios from 'axios';

type SignInResponse = {
  /**
   * A Firebase Auth ID token for the authenticated user.
   */
  idToken: string;
  /**
   * The email for the authenticated user.
   */
  email: string;
  /**
   * A Firebase Auth refresh token for the authenticated user.
   */
  refreshToken: string;
  /**
   * The number of seconds in which the ID token expires.
   */
  expiresIn: string;
  /**
   * The uid of the authenticated user.
   */
  localId: string;
  /**
   * Whether the email is for an existing account.
   */
  registered: boolean;
};

type SignInWithPasswordBody = {
  email: string;
  password: string;
  returnSecureToken: true;
};

/**
 * CAN BE USED IN BOTH SERVER AND BROWSER ENVIRONMENTS
 */
export const restApiService = {
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
  signInWithPassword: async (body: SignInWithPasswordBody, apiKey: string) => {
    try {
      return axios.post<SignInResponse>('/v1/accounts:signInWithPassword', body, {
        baseURL: 'https://identitytoolkit.googleapis.com',
        params: { key: apiKey },
      });
    } catch (err) {
      console.error(err);
      return err as AxiosError;
    }
  },
};
