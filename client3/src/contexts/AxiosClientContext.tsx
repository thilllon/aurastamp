import { axiosClient as axiosClientInstance } from '@/apis/base';
import axios, { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AxiocClientContext = {
  axiosClient: any | null;
};

export const AxiosClientContext = createContext<AxiocClientContext>({
  axiosClient: null,
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [axiosClient, setAxiosClient] = useState(null);

  useEffect(() => {
    const authorization = session ? `Bearer ${session?.user?.accessToken}` : null;
    axiosClientInstance.defaults.headers.common['Authorization'] = authorization;
  }, [session]);

  return (
    <AxiosClientContext.Provider value={{ axiosClient }}>{children}</AxiosClientContext.Provider>
  );
}

export const useAxiosClient = () => useContext(AxiosClientContext);
