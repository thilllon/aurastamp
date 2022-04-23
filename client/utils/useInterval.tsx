import { useEffect } from 'react';

export const useInterval = (callback: () => void, interval: number) => {
  useEffect(() => {
    const timer = setInterval(() => {
      callback();
    }, interval);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [callback, interval]);
};
