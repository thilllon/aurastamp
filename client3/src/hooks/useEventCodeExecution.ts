import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

let eventSource: EventSource;

export const useEventCodeExecution = (
  { workId, demo = false }: { workId: string; demo?: boolean },
  options?: any
) => {
  const router = useRouter();
  const [data, setData] = useState<string[]>([]);
  const [status, setStatus] = useState<'closed' | 'running' | 'done'>('closed');
  const [source, setSource] = useState<EventSource>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (router.isReady && typeof window !== 'undefined') {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = demo ? `/v1/works/${workId}/execution-demo` : `/v1/works/${workId}/execution`;
      eventSource = new EventSource(baseUrl + url, {
        withCredentials: true,
      });

      eventSource.addEventListener('data', (ev) => {
        console.debug('data', ev);
        const stdout: string = JSON.parse(ev.data ?? {}).stdout;
        setData((prev) => prev.concat(stdout));
      });

      eventSource.addEventListener('close', () => {
        setStatus('done');
      });

      // eventSource.addEventListener('message', (ev) => {
      //   console.debug('message', ev);
      // });

      eventSource.onmessage = (ev) => {
        console.debug('message', ev);
      };

      eventSource.onerror = (ev) => {
        console.debug('error', ev);
        setError(ev);
        setStatus('closed');
      };

      eventSource.onopen = (ev) => {
        console.debug('open', ev);
        setStatus('running');
        setData([]);
        setError(null);
      };

      setSource(eventSource);
    }

    return () => {
      // eventSource.removeEventListener('data', (ev) => {
      //   console.log('removed', ev);
      // });
      eventSource.close();
      setStatus('closed');
      setData([]);
    };
  }, [demo, router.isReady, workId]);

  return { data, status, eventSource: source, error };
};
