// import { getTimestamp } from '@/utils/common';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Output = {
  builtAt?: Date;
  gitSha?: string;
};

const gitCommitSha = process.env.VERCEL_GITHUB_COMMIT_SHA ?? '';

const handler = (req: NextApiRequest, res: NextApiResponse<Output>) => {
  // const { date } = getTimestamp();
  if (req.method === 'GET') {
    res.status(200).json({
      // builtAt: date,
      gitSha: gitCommitSha,
    });
  }
  throw new Error('Method not allowed');
};

export default withSentry(handler);
