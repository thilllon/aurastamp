import { useSessionQuery } from '@/lib/next-auth-react-query';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

export const LoadingGuard = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  // prevent to render when session is fetching
  return status === 'loading' ? null : <>{children}</>;
};

export const LoadingGuard2 = ({ children }: { children: ReactNode }) => {
  const { status } = useSessionQuery();
  return status === 'loading' ? null : <>{children}</>;
};
