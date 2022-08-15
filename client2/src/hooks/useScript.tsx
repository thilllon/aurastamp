import { useEffect, useState } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';
type Src = `//${string}` | `https://${string}` | `http://${string}`;

export const useScript = (
  src: string,
  id = Date.now().toString(),
  {
    async = true,
    defer = true,
    onLoad,
  }: {
    async?: boolean;
    defer?: boolean;
    onLoad?: (event: Event) => void;
  }
) => {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }
    let script: HTMLScriptElement = document.querySelector(`script[src="${src}"]`);
    if (script) {
      setStatus(script.getAttribute('data-status') as ScriptStatus);
    } else {
      script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = async;
      script.defer = defer;
      script.setAttribute('data-status', 'loading');
      script.onload = onLoad;
      document.body.appendChild(script);
      const setAttributeFromEvent = (event) => {
        script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
      };
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    const setStatusFromEvent = (event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };
    script.addEventListener('load', setStatusFromEvent);
    script.addEventListener('error', setStatusFromEvent);
    return () => {
      if (script) {
        script.removeEventListener('load', setStatusFromEvent);
        script.removeEventListener('error', setStatusFromEvent);
      }
    };
  }, [async, defer, id, onLoad, src]);

  return { status };
};
