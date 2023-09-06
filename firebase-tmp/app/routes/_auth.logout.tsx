import type { LoaderFunction } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { cookie } from '../cookies';

export const loader: LoaderFunction = async () => {
  return redirect('/', {
    headers: {
      'Set-Cookie': await cookie.serialize('', { maxAge: 0 }),
    },
  });
};
