import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export const useHotjar = () => {
  // local: {hjid:3098148,hjsv:6};
  // dev: {hjid:3098132,hjsv:6}
  // prod: {hjid:3098069,hjsv:6};

  useEffect(() => {
    // hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID ?? '0') ?? 3098069, 6);
    hotjar.initialize(3098132, 6);
  }, []);
};
