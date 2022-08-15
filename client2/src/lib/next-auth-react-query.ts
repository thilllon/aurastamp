import { Session, SessionUser } from 'next-auth';
import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';

// https://next-auth.js.org/tutorials/securing-pages-and-api-routes

/**
 * Fetches session from `/api/auth/session`,
 * parses its JSON response, and returns it.
 * If there is no session, it returns `null`
 */
export async function fetchSession(): Promise<Session | null> {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  return Object.keys(session).length ? session : null;
}

interface UseSessionOptions<R extends boolean> {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required: R;
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string;
  /** Configuration for `useQuery` */
  queryConfig?: UseQueryOptions<Session | null>;
}

type SessionContextValue<R extends boolean = false> = R extends true
  ? { session: Session; status: 'authenticated' } | { session: null; status: 'loading' }
  :
      | { session: null; status: 'unauthenticated' }
      | { session: Session; status: 'authenticated' }
      | { session: null; status: 'loading' };

const defaultOptions: UseSessionOptions<boolean> = {
  required: false,
  redirectTo: '/api/auth/signin?error=SessionExpired',
  queryConfig: {},
};

/**
 * React Query wrapper to retrieve `Session`.
 * Replaces `useSession` and `Provider` from `next-auth/client` in codebases
 * where you already use `react-query`.
 *
 * [`useSession`](https://next-auth.js.org/getting-started/client#usesession) |
 * [`Provider`](https://next-auth.js.org/getting-started/client#provider) |
 * [React Query](https://react-query.tanstack.com/guides/ssr#using-nextjs)
 */
export function useSessionQuery<R extends boolean>(
  options?: UseSessionOptions<R>
): SessionContextValue<R> {
  const router = useRouter();

  const {
    required = defaultOptions.required,
    redirectTo = defaultOptions.redirectTo,
    queryConfig = defaultOptions.queryConfig,
  } = options ?? defaultOptions;

  const { data, status } = useQuery(['session'], fetchSession, {
    onSettled(data, error) {
      queryConfig?.onSettled?.(data, error);
      console.log('next-auth-react-query', data);
      if (data || !required) {
        return;
      }
      router.push(redirectTo);
    },
    refetchInterval: 5 * 60 * 1000,
    // refetchInterval: 5 * 1000,
    ...queryConfig,
  });

  if (status === 'loading') {
    return { session: data, status: 'loading' };
  } else if (data) {
    return { session: data, status: 'authenticated' };
  } else {
    return { session: null, status: 'unauthenticated' } as any;
  }
}

export type SessionProps = { session: Session };

export const defaultSessionUser: SessionUser = {
  name: '',
  email: '',
  image: '',
  id: '',
  jobtitle: '',
  accessToken: '',
  role: '',
  firstName: '',
  lastName: '',
  type: '',
};
