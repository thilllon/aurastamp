import type { DependencyList } from 'react';
import { useCallback, useEffect, useRef } from 'react';

// https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

const useTimeoutFn = (fn: Function, ms = 0): UseTimeoutFnReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();
    return clear;
  }, [clear, ms, set]);

  return [isReady, clear, set];
};

type UseDebounceReturn = [() => boolean | null, () => void];

export const useDebounce = (fn: Function, ms = 0, deps: DependencyList = []): UseDebounceReturn => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect(reset, [reset, ...deps]);
  return [isReady, cancel];
};
