import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const isProduction = process.env.NODE_ENV === 'production';

const nextAuth = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  debug: !isProduction,
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return nextAuth(req, res);
};

export default withSentry(handler);
