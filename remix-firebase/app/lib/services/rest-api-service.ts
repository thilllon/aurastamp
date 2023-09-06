import axios from 'axios';
import type { RestConfigType } from '../firebase.server';

interface RestError {
  error: {
    code: number;
    message: string;
    errors: any[];
  };
}

export const isRestError = (input: unknown): input is RestError =>
  !!input && typeof input === 'object' && 'error' in input;

type RestSuccess = {
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

export const restApiService = {
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
  signInWithPassword: async (
    body: SignInWithPasswordBody,
    restConfig: RestConfigType
  ): Promise<RestError | RestSuccess> => {
    const { data } = await axios.post<RestSuccess, any>('/v1/accounts:signInWithPassword', body, {
      baseURL: restConfig.domain,
      params: { key: restConfig.apiKey },
    });
    return data;
  },
};
