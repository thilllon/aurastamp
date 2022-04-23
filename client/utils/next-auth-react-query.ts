import { Role, Session } from 'next-auth';
import { useRouter } from 'next/router';
import { QueryConfig, QueryObserverOptions, useQuery, QueryKey } from 'react-query';

async function fetchSession(): Promise<Session | null> {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  // console.info('fetch session', session);
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

// QueryObserverOptions<unknown, unknown, unknown, unknown, QueryKey>
const defaultQueryConfig = {
  // ******************************
  // refetchInterval은 항상 액세스 토큰 만료시간보다 짧아야 함
  refetchInterval: 1000 * 60 * 1, // 1분
  // ******************************
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  retry: false,
  refetchIntervalInBackground: true,
  staleTime: 10 * 1000,
  // staleTime: 10 * 1000, // 10 seconds
  // cacheTime: 24 * 60 * 60 * 1000, // 24 hours
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
export default function _default<R extends boolean = false>({
  required,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig,
  roles,
}: {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required?: R;
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string;
  queryConfig?: Omit<QueryConfig<Session | null, unknown, unknown>, 'onSettled'>;
  roles?: Role[];
} = {}) {
  const router = useRouter();
  const query = useQuery(['session'], fetchSession, {
    onSettled(data) {
      // console.info('next-auth hook onSettle', data);
      if (data || !required) {
        return;
      }
      router.push(redirectTo);
    },
    ...defaultQueryConfig,
    ...queryConfig,
  });

  // console.info('## use custom session:', query.status, query.data?.user.roles);

  if (
    query.status === 'success' &&
    roles &&
    roles.length &&
    !roles.every((role) => query.data?.user?.roles?.includes(role))
  ) {
    router.replace('/');
  }

  return [
    query.data as R extends true ? Session : Session | null,
    query.status === 'loading',
  ] as const;
}

export const useCustomSession = _default;
