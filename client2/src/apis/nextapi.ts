import { nextApiClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useMutation, useQuery } from 'react-query';

// FIXME: API types 에서 제공하는 타입으로 변경할 것
export type ChallengeStatus = 'UPCOMING' | 'IN_PROGRESS' | 'PAUSED' | 'FINISHED';

// --------------------------------
// GetRepos
// --------------------------------

export type GetReposInput = { org: string } | { username: string };

export type GetReposOutput = any;

export const useGetRepos = <
  OutType extends GetReposOutput = GetReposOutput,
  InType extends GetReposInput = GetReposInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetRepos', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/api/github/repos`;
      const response = await nextApiClient.get<OutType>(url, {
        params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

export const fetchGetRepos = async (
  input: GetReposInput,
  ctx: GetServerSidePropsContext
): Promise<GetReposOutput> => {
  const authorization = '';
  const { ...params } = input;
  const url = `/api/github/repos`;
  const response = await nextApiClient.get<GetReposOutput>(url, {
    params,
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// CreateRepo
// --------------------------------

export type CreateRepoInput = {
  repoName: string;
  org?: string;
};

export type CreateRepoOutput = any;

export const useCreateRepo = <
  OutType extends CreateRepoOutput = CreateRepoOutput,
  InType extends CreateRepoInput = CreateRepoInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/api/github/repos`;
      const response = await nextApiClient.post<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

export const fetchCreateRepo = async (
  input: CreateRepoInput,
  ctx: GetServerSidePropsContext
): Promise<CreateRepoOutput> => {
  const authorization = '';
  const { ...params } = input;
  const url = `/api/github/repos`;
  const response = await nextApiClient.post<CreateRepoOutput>(url, params, {
    headers: { authorization },
  });
  return response.data;
};

// --------------------------------
// DeleteRepo
// --------------------------------

export type DeleteRepoInput = {
  repoName: string;
};

export type DeleteRepoOutput = {};

export const useDeleteRepo = <
  OutType extends DeleteRepoOutput = DeleteRepoOutput,
  InType extends DeleteRepoInput = DeleteRepoInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/api/github/repos`;
      const response = await nextApiClient.delete<OutType>(url, {
        data: params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

export const fetchDeleteRepo = async (
  input: DeleteRepoInput,
  ctx: GetServerSidePropsContext
): Promise<DeleteRepoOutput> => {
  const authorization = '';
  const { ...params } = input;
  const url = `/api/github/repos`;
  const response = await nextApiClient.delete<DeleteRepoOutput>(url, {
    data: params,
    headers: { authorization },
  });
  return response.data;
};
