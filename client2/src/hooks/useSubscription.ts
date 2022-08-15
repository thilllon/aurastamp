import { useEffect, useRef } from 'react';

// ws://localhost:4444/api/events

export const useSubscription = <ReceiveData = {}, SendData = {}>(
  websocketUrl: string,
  onMessage?: (event: MessageEvent<ReceiveData>) => void
) => {
  const websocket = useRef<WebSocket>();

  useEffect(() => {
    websocket.current = new WebSocket(websocketUrl);
    websocket.current.onmessage = (event: MessageEvent<ReceiveData>) => {
      console.debug('[websocket] received', event);
      onMessage?.(event);
    };

    websocket.current.onopen = () => {
      console.debug('[websocket] connected');
    };

    return () => {
      websocket.current?.close();
      console.debug('[websocket] closed');
    };
  }, [onMessage, websocketUrl]);

  return {
    send: (event: string, data: SendData) => {
      websocket.current?.send(JSON.stringify({ event, data }));
    },
  };
};
