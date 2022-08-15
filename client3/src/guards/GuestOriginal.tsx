import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface GuestOriginalProps {
  children: ReactNode;
}

export const GuestOriginal: FC<GuestOriginalProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false); // does not mean the user is authenticated. It means authentication process has been verified.
  const demo = router.query.demo as string;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.isAuthenticated && demo !== 'true') {
      router.push('/dashboards/reports');
    } else {
      setVerified(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
