import { client, _QueryOptions } from '@/services/client';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { useQuery } from 'react-query';

// ******************************
// get users
// ******************************

export type User = {
  id: string;
  username: string;
};

type GetUsersInput = {
  //
};

type GetUsersOutput = {
  users: User[];
};

export const useGetUsers = (
  input: GetUsersInput,
  options?: _QueryOptions<GetUsersInput, GetUsersOutput>
) => {
  const [session] = useCustomSession();
  const query = useQuery(
    ['USERS', input],
    async ({ queryKey }) => {
      client.defaults.headers.common.authorization = session?.user.accessToken as string;
      const params = queryKey[1];
      const response = await client.get<GetUsersOutput>('/users', {
        params,
      });
      return response.data;
    },
    options
  );
  return query;
};
