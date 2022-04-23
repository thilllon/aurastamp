/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Role } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type SigninOutput = {
  user: { id: string; username: string; roles: Role[] };
  accessToken: { token: string; expiry: number };
  refreshToken: { token: string; expiry: number };
};

type SigninInput = {
  username: string;
  password: string;
};

const isProduction = process.env.NODE_ENV === 'production';

// Takes a token, and returns a new token with updated `accessToken` and `accessTokenExpiry`. If an error occurs, returns the old token and an error property
// https://next-auth.js.org/tutorials/refresh-token-rotation

type Tokens = {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
};

export const refreshTheAccessToken = async (currentRefreshToken: string) => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URI + `/account/refreshToken`, {
    token: currentRefreshToken,
  });

  const results: Tokens = {
    accessToken: response.data.accessToken.token,
    accessTokenExpiry: response.data.accessToken.expiry,
    refreshToken: response.data.refreshToken.token,
    refreshTokenExpiry: response.data.refreshToken.expiry,
  };

  return results;
};

const nextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password', placeholder: 'password...' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { username: usernameRequest, password } = credentials;
        try {
          const response = await axios.post<
            SigninOutput,
            AxiosResponse<SigninOutput, SigninInput>,
            SigninInput
          >(`${process.env.NEXT_PUBLIC_API_URI}/account/signin`, {
            username: usernameRequest,
            password,
          });

          const { user, accessToken, refreshToken } = response.data;
          //          console.info('authorize user role', user.roles);
          //          console.info('authorize user role', user.roles);
          //          console.info('authorize user role', user.roles);
          //          console.info('authorize user role', user.roles);
          const results = {
            id: user.id,
            name: user.username,
            // email: 'email@example.com', // TODO: api required
            // picture: 'https://picture.picture', // TODO: api required
            // image: 'https://image.iamge',
            roles: user.roles,
            // ******************************
            accessToken: accessToken.token,
            accessTokenExpiry: accessToken.expiry,
            refreshToken: refreshToken.token,
            refreshTokenExpiry: refreshToken.expiry,
          };
          return results;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            //            console.error(err.message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, profile, isNewUser, account }) => {
      // jwt 에 들어갈 데이터를 수정해야할때 사용
      // jwt는 세션에 들어가게됨

      //  This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). The returned value will be signed and optionally encrypted, and it is stored in a cookie.

      //      console.group('jwt');

      if (account && user) {
        //        console.log(token, user, account);
        // 초기 로그인 시에만 account 객체 정보가 있음
        //        console.groupEnd();
        //        console.info('jwt login user role', user.roles);
        //        console.info('jwt login user role', user.roles);
        //        console.info('jwt login user role', user.roles);
        //        console.info('jwt login user role', user.roles);
        return {
          ...token,
          roles: user.roles,
          accessToken: user.accessToken,
          accessTokenExpiry: user.accessTokenExpiry,
          refreshToken: user.refreshToken,
          refreshTokenExpiry: user.refreshTokenExpiry,
        };
      }

      if (typeof token?.accessTokenExpiry === 'number') {
        //        console.info('token expires in', (token?.accessTokenExpiry ?? 0) - Date.now());
      }

      const timeLimitUntilRefreshing = 3 * 60 * 1000;

      if (
        typeof token?.accessTokenExpiry === 'number' &&
        token.accessTokenExpiry - Date.now() < timeLimitUntilRefreshing &&
        typeof token?.refreshToken === 'string'
      ) {
        const results = await refreshTheAccessToken(token.refreshToken);
        //        console.info('Token refreshed successfully');

        // try {
        //   const telebotId = '2082506185:AAGsbnrPKbaDKTa4CwzmbMo1Tewtj7R-rQA';
        //   const chatId = '534875654';
        //   await axios.get(`https://api.telegram.org/bot${telebotId}/sendMessage`, {
        //     params: { chat_id: chatId, text: `Token refreshed successfully` },
        //   });
        // } catch (err) {
        //        //   console.error(err);
        // }

        token = { ...token, ...results };
      }

      //      console.info('jwt token role', token.roles);
      //      console.info('jwt token role', token.roles);
      //      console.info('jwt token role', token.roles);
      //      console.info('jwt token role', token.roles);
      //      console.groupEnd();
      return token;
    },
    session: async ({ session, token, user }) => {
      // useSession, getSession으로 가져오는 값을 여기서 결정함. jwt callback은 단지 여기서의 `token`에 어떤 값을 추가할지 결정하는 단계임.
      // {
      //   user: {
      //     name: '',
      //     email: '',
      //     image: '',
      //   },
      //   expires: Date, // This is the expiry of the session, not any of the tokens within the session
      // };
      session.user = { ...session.user, ...token };
      return session;
    },
  },
  debug: !isProduction,
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  // console.dir(req);
  // console.dir(res);

  return nextAuth(req, res);
};
