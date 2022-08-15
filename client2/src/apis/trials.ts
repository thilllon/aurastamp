import { useAuthorization } from '@/lib/session-client';
import { TrialCreateInput, TrialOutput } from '@/types/apiTypes';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { _MutationOptions, axiosClient } from './base';

// --------------------------------
// RequestTrial
// --------------------------------

export const useRequestTrial = <OutType extends TrialOutput, InType extends TrialCreateInput>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;

      const url = `/v1/trials`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};
