import { vercelClient, _QueryOptions } from '@/services/client';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { useQuery } from 'react-query';

// ******************************
// get vercel deployment url
// ******************************

type State = 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';

type GetDeploymentsInput = {
  teamId?: string;
  projectId?: string;
  state?: State;
} & {
  vercelToken: string;
};

type GetDeploymentsOutput = {
  deployments: any[];
  pagination: any;
};

export const useGetDeployments = (
  input: GetDeploymentsInput,
  options?: _QueryOptions<GetDeploymentsInput, GetDeploymentsOutput>
) => {
  // https://vercel.com/docs/rest-api#endpoints/deployments/list-deployments

  const [session] = useCustomSession();
  const query = useQuery(
    ['VERCEL_DEPLOYMENTS', input],
    async ({ queryKey }) => {
      const token = `Bearer ${input.vercelToken}`;
      vercelClient.defaults.headers.common.authorization = token;
      const response = await vercelClient.get<GetDeploymentsOutput>(`/v6/deployments`, {
        params: queryKey[1],
      });
      return response.data;
    },
    options
  );
  return query;
};
