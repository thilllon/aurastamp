import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  console.info('authHeader', authHeader);

  const adminUser = process.env.ADMIN_USER || 'asdf';
  const adminPassword = process.env.ADMIN_PASSWORD || 'asdf';

  if (authHeader) {
    const auth = authHeader.split(' ')[1];

    console.info(Buffer.from(auth, 'base64').toString());
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === adminUser && password === adminPassword) {
      return NextResponse.next();
    }
  }

  // https://developer.mozilla.org/ko/docs/Web/HTTP/Authentication#%EC%9D%B8%EC%A6%9D_%EC%8A%A4%ED%82%B4

  const nonce = uuid();
  const realm = 'dev only realm'; // 영역

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}"`,
    },
  });
}
