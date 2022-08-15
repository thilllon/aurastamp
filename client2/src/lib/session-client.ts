import { useSession } from 'next-auth/react';

export const useAuthorization = () => {
  const { data: session } = useSession();
  return session?.user?.accessToken ? `Bearer ${session?.user?.accessToken}` : null;
};
