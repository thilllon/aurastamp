import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export const useHotjar = () => {
  useEffect(() => {
    hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID ?? '0') ?? 3098069, 6);
  }, []);
};
