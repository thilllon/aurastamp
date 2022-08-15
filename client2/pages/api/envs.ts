import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';
import getConfig from 'next/config';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isRemote = !!process.env.VERCEL_ENV;

const handler: NextApiHandler = async (req, res) => {
  if (isRemote && req.query.secret !== 'legalengine') {
    return res.status(401).end();
  }

  const list = [
    'NODE_ENV',
    'NEXTAUTH_URL',
    'VERCEL_ENV',
    'VERCEL_URL',
    // 'VERCEL_GIT_PROVIDER',
    // 'VERCEL_GIT_REPO_SLUG',
    // 'VERCEL_GIT_REPO_OWNER',
    // 'VERCEL_GIT_REPO_ID',
    'VERCEL_GIT_COMMIT_REF',
    'VERCEL_GIT_COMMIT_SHA',
    // 'VERCEL_GIT_COMMIT_MESSAGE',
    // 'VERCEL_GIT_COMMIT_AUTHOR_LOGIN',
    // 'VERCEL_GIT_COMMIT_AUTHOR_NAME',
    'NEXT_PUBLIC_BUILT_AT',
    'NEXT_PUBLIC_API_URL',
    'GITHUB_CLIENT_ID',
    'GITHUB_PROFILE_CLIENT_ID',
    'GITHUB_PROFILE_REDIRECT_URI',
    'KAKAO_CLIENT_ID',
    'KAKAO_JS_KEY',
    'SENTRY_DSN',
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
    'NEXT_PUBLIC_APP_TITLE',
    'NEXT_PUBLIC_ORGANIZATION_NAME',
    'NEXT_PUBLIC_ORGANIZATION_URL',
    'COMMIT_SHA',
  ];

  const envs = list.reduce<{ [envName: string]: string }>((envs, name) => {
    envs[name] = process.env[name];
    return envs;
  }, {});

  return res.status(200).json({ ...envs });
};

export default withSentry(handler);
