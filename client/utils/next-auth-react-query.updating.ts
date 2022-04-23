import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { QueryConfig, useQuery } from 'react-query';

/**
 * 2022.03.12
 * @next-auth/react-query를 수정하였음.
 * - type 적용
 * - arrow function 적용
 * - next-auth의 useSession과 동일한 input, output 적용
 */

async function fetchSession(): Promise<Session | null> {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  console.info('fetch session', session);
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

type UseSessionOutput =
  // | { data: Session | null; status: 'authenticated' }
  // | { data: null; status: 'unauthenticated' | 'loading' };
  { data: Session | null | undefined; status: 'authenticated' | 'unauthenticated' | 'loading' };

/**
 * React Query wrapper to retrieve `Session`.
 * Replaces `useSession` and `Provider` from `next-auth/client` in codebases
 * where you already use `react-query`.
 *
 * [`useSession`](https://next-auth.js.org/getting-started/client#usesession) |
 * [`Provider`](https://next-auth.js.org/getting-started/client#provider) |
 * [React Query](https://react-query.tanstack.com/guides/ssr#using-nextjs)
 */
export const useSessionTmp = <Required extends boolean = false>({
  required,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig,
}: {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required?: Required;
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string;
  queryConfig?: QueryConfig<Session | null, unknown, unknown>;
} = {}): UseSessionOutput => {
  const router = useRouter();
  const query = useQuery(['session'], fetchSession, {
    onSettled(data) {
      console.info('next-auth hook onSettle', data);
      if (data || !required) {
        return;
      }
      router.push(redirectTo);
    },
    // refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 10, // 항상 액세스 토큰 만료시간보다 짧아야함
    staleTime: 10 * 1000,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    ...queryConfig,
  });

  return {
    data: query.data,
    status:
      query.status === 'loading' ? 'loading' : query.data ? 'authenticated' : 'unauthenticated',
  };
};
