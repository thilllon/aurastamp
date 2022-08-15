import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const allCookies = req.cookies;
  console.log(allCookies);
  res.setHeader('Set-Cookie', [
    'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    `access=deleted; Max-Age=0; path=/`,
    `refresh=deleted; Max-Age=0; path=/`,
  ]);
  res.status(200).json(allCookies);
  return res.end();
};

export default withSentry(handler);
