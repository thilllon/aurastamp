import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

export const useProgress = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
};

// const useProgress = () => {
//   Router.events.on('routeChangeStart', nProgress.start);
//   Router.events.on('routeChangeError', nProgress.done);
//   Router.events.on('routeChangeComplete', nProgress.done);
//   // Router.events.on('beforeHistoryChange', () => {});
//   // Router.events.on('hashChangeStart', () => {});
//   // Router.events.on('hashChangeComplete', () => {});
// };
