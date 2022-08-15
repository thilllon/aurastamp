import { SignInLocalOutput } from '@/apis/auth';
import { fetchSignOut } from '@/apis/auth.server';
import { SignInLocalInput, SignInOauthInput } from '@/types/apiTypes';
import { refreshTimeMS } from '@/utils/constants';
import * as Sentry from '@sentry/nextjs';
import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

// FIXME: serverside type으로 수정할 것
type OutputType = {
  user: any;
  accessToken: string;
};

// FIXME: serverside type으로 수정할 것
type RefreshOutputType = {
  accessToken: string;
};

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * kakao 로그인 관련 사항
 * (중요) 카카오 로그인의 clientId는 발급받은 REST key, clientSecret은 임의의 값을 넣으면 됨.
 * 보안을 위해 secret을 추가하고 싶은 경우 다음 링크로 발급 가능함.
 * https://developers.kakao.com/console/app/757208/product/login/security
 * 혹은 카카오 개발자 센터 > [로그인] 섹션 > 보안 > Client Secret > 발급
 * URL 등록
 * https://www.proved.work
 * https://master.proved.work
 * https://dev.proved.work
 * http://localhost:3333
 * callback URL 등록
 * https://www.proved.work/api/auth/callback/kakao
 * https://master.proved.work/api/auth/callback/kakao
 * https://dev.proved.work/api/auth/callback/kakao
 * http://localhost:3333/api/auth/callback/kakao
 */

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        emailOrUsername: { label: 'Email or Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const params: SignInLocalInput = credentials;
          const result = await axiosClient.post<SignInLocalOutput>('/v1/auth/signin/local', params);
          const { user, accessToken } = result.data;

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              ...user,
              accessToken,
              image: user.avatar,
              name: user.username,
            };
          }
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        } catch (err) {
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          throw new Error();
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, account, profile }) => {
      // console.debug(user, account, profile);
      // all props are null if the callback is NOT called from singing-in

      // console.group('jwt----------------------------------------------------');
      // console.debug('user', user);
      // console.debug('token', token);
      // console.debug('account', account);
      // console.debug('profile', profile);
      // console.groupEnd();

      if (!user || !account) {
        // 로그인이 아닐 시
        console.debug('[JWT] callback called');

        const expiryTime = (jwt.decode(token.accessToken) as any).exp * 1000;
        console.debug('[JWT] time to exp:', (expiryTime - Date.now()) / 1000);

        if (expiryTime - Date.now() < 0) {
          // throw error when token is expired
          throw new Error('[JWT] expired');
        } else if (expiryTime - Date.now() < refreshTimeMS) {
          // refresh the token when it is about to expire
          // https://stackoverflow.com/questions/71042019/next-auth-refresh-token-strategy

          try {
            const url = '/v2/auth/refresh';
            const result = await axiosClient.post<RefreshOutputType>(url, {
              accessToken: token.accessToken,
            });

            const newAccessToken = result.data.accessToken;
            // FIXME: 프로필 정보 수정했을때 예전 정보로 나올 수 있으므로 이거도 새로운 정보를 가져오도록 수정 해야함
            const renewedToken: JWT = {
              sub: token.sub,
              name: token.name,
              email: token.email,
              picture: token.picture,
              jobtitle: token.jobtitle,
              type: token.type,
              role: token.role,
              accessToken: newAccessToken,
              firstName: token.firstName,
              lastName: token.lastName,
            };

            console.debug('[JWT] refreshed:', Date.now() / 1000);
            return renewedToken;
          } catch (err) {
            console.error('token refresh failed');
          }
        }

        return token;
      }

      if (account.provider === 'credentials') {
        // 이메일로 로그인
        console.debug('[JWT] credentials', user?.email);
        const jobtitle = user.type === 'BUSINESS' ? '기업회원' : '개인회원';
        const firstIssuedToken: JWT = {
          email: user.email,
          name: user.name,
          picture: user.image,
          sub: user.id,
          jobtitle,
          accessToken: (user.accessToken as string) ?? '',
          type: (user.type as string) ?? '',
          role: (user.authLevel as string) ?? '',
          firstName: (user.firstName as string) ?? '',
          lastName: (user.lastName as string) ?? '',
        };
        return firstIssuedToken;
      }

      console.debug('[JWT] ' + account.provider, user?.email);

      // oauth로 로그인한 경우 user 정보 새로 받아오기
      if (!user?.email) {
        if (account.provider === 'kakao') {
          try {
            // 카카오 이메일 동의하지 않은 경우 바로 연결 끊기
            const url = `/v1/auth/kakao/disconnect/${account.providerAccountId}`;
            const disconnected = axiosClient.post(url);
            console.debug('[JWT] kakao disconnected:', disconnected);
          } catch (err) {
            console.error(err);
          }
          throw new Error('email_required_kakao');
        } else if (account.provider === 'github') {
          // make `email` visible in the settings page
          // https://github.com/settings/emails

          //   // // https://developer.github.com/v3/users/emails/#list-email-addresses-for-the-authenticated-user
          //   const res = await axios.get('https://api.github.com/user/emails', {
          //     headers: {
          //       Accept: 'application/vnd.github+json',
          //       // Accept: 'application/vnd.github.v3+json',
          //       // -H ": application/vnd.github+json" \
          //       Authorization: `token ${account.access_token}`,
          //     },
          //   });

          throw new Error('email_required_github');
        } else {
          throw new Error('email_required');
        }
      }

      const url = `/v1/auth/signin/oauth`;
      const { data } = await axiosClient.post<
        OutputType,
        AxiosResponse<OutputType>,
        SignInOauthInput
      >(url, {
        username: user.name,
        email: user.email,
        avatar: user.image,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        scope: account.scope,
        tokenType: account.token_type,
        accessToken: account?.accessToken as string,
        expiresAt: account?.expiresAt as string,
        refreshToken: account?.refreshToken as string,
        idToken: account?.idToken as string,
        oauthToken: account?.oauthToken as string,
        oauthTokenSecret: account?.oauthTokenSecret as string,
        sessionState: account?.sessionState as string,
        accountJson: account,
        profileJson: profile,
      });
      const { user: userOauth, accessToken } = data;

      // console.log('[JWT] user', user);

      const jobtitle = userOauth.type === 'BUSINESS' ? '기업회원' : '개인회원';
      const firstIssuedToken: JWT = {
        sub: userOauth.id,
        name: userOauth.username,
        email: userOauth.email,
        picture: userOauth.avatar,
        jobtitle,
        accessToken,
        type: userOauth.type,
        firstName: userOauth.firstName,
        lastName: userOauth.lastName,
        role: userOauth.authLevel,
      };

      return firstIssuedToken;
    },

    session: async ({ session, token, user }) => {
      // NOTE: fired when next things called: getSession(), useSession(), `/api/auth/session`
      // token: sub, name, email, picture | exp, iat, jti | etc...

      console.debug('[SESSION] called');
      session.user = {
        ...session.user, // name, email, image
        id: token.sub,
        jobtitle: token.jobtitle,
        type: token?.type,
        accessToken: token.accessToken,
        firstName: token?.firstName ?? '',
        lastName: token?.lastName ?? '',
        role: token?.role ?? '',
      };
      return session;
    },
    signIn: async ({ user, account, profile, credentials }) => {
      // FIXME: use as callback for changing avatar
      return true;
    },
  },
  pages: {
    signIn: '/auth/login', // default: "/api/auth/signIn"
    error: '/auth/login', // default: "/api/auth/error?error=AccessDenied"
  },
  logger: {
    error(code, ...message) {
      console.error(code, message);
      Sentry.captureException({ error: message, code });
    },
    warn(code, ...message) {
      console.warn(code, message);
      Sentry.captureException({ error: message, code });
    },
    debug(code, ...message) {
      console.debug(code, message);
      Sentry.captureException({ error: message, code });
    },
  },
  // debug: true, // meaningless if logger option is turned on
  jwt: {
    // maxAge: 30 * 24 * 60 * 60, // (default: 30 days)
    // maxAge: 5 * 60,
  },
  session: {
    // maxAge: 30 * 24 * 60 * 60, // (default: 30 days)
    // updatedAge:86400,
    // maxAge: 60, // (default: 30 days)
    // updateAge: 10,
  },
  // events: {
  //   // session: ({ session, token }) => {
  //   //   // console.debug('[EVENT] session');
  //   // },
  //   // signOut: ({ session, token }) => {
  //   //   fetchSignOut({});
  //   // },
  // },
};

export default NextAuth(authOptions);
