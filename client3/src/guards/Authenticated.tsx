import { useAuth } from '@/hooks/useAuth';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { ReactNode, useEffect, useState } from 'react';

// https://next-auth.js.org/tutorials/securing-pages-and-api-routes

interface AuthenticatedProps {
  children: ReactNode;
  session?: Session;
}

export const Authenticated = ({ children, session }: AuthenticatedProps) => {
  return <>{children}</>;
};

export const AuthenticatedOriginal: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false); // does not mean the user is authenticated. It means authentication process has been verified.
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({ pathname: '/auth/login', query: { backTo: router.asPath } });
    } else {
      setVerified(true);
      enqueueSnackbar('You are successfully authenticated!', { variant: 'success' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]); // auth.isAuthenticated, enqueueSnackbar, router, router.isReady

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
