import { createContext } from 'react';

interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

interface ClientStyleContextData {
  reset: () => void;
}

export const ServerStyleContext = createContext<ServerStyleContextData[] | null>(null);

export const ClientStyleContext = createContext<ClientStyleContextData | null>(null);
