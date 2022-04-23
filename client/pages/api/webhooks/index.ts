import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// ******************************
// withSentry를 간략화 하면 다음과 비슷한 구조
// ******************************
// const withSentry = (routeHandler: NextApiHandler) => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       return await routeHandler(req, res);
//     } catch (error) {
//       Sentry.captureException(error);
//       await Sentry.flush(2000);
//       return error;
//     }
//   };
// };

type Output = {
  time: string;
  method: string;
} & any;

const handler = (req: NextApiRequest, res: NextApiResponse<Output>) => {
  if (req.method === 'POST') {
    res.status(200).json({
      method: 'POST',
      time: new Date().toLocaleString(),
    });
  } else if (req.method === 'GET') {
    res.status(200).json({
      method: 'GET',
      time: new Date().toLocaleString(),
    });
  }
};

export default withSentry(handler);
