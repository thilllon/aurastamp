import { app } from '@/utils/githubbot';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createNodeMiddleware, createProbot } from 'probot';

type Output = void;

const middleware = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: '/api/webhooks/github',
});

const handler = (req: NextApiRequest, res: NextApiResponse<Output>) => {
  console.info('## dirname', __dirname, req.url);
  return middleware(req, res);
};

export default withSentry(handler);
