import { axiosClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import { ProblemCreateInput, ProblemOutput, ProblemUpdateInput } from '@/types/apiTypes';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

// --------------------------------
// CreateProblem
// --------------------------------

export type CreateProblemInput = ProblemCreateInput;
export type CreateProblemOutput = ProblemOutput;

export const useCreateProblem = <
  OutType extends CreateProblemOutput = CreateProblemOutput,
  InType extends CreateProblemInput = CreateProblemInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { ...params } = input;
      const url = `/v2/problems`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetProblem
// --------------------------------

export type GetProblemInput = {
  problemId: string;
  challengeId?: string;
  takeCount?: number;
};

export type GetProblemOutput = ProblemOutput;

export const useGetProblem = <
  OutType extends GetProblemOutput = GetProblemOutput,
  InType extends GetProblemInput = GetProblemInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetProblem', input],
    async ({ queryKey }) => {
      const { problemId, ...params } = queryKey[1];
      const url = `/v2/problems/${problemId}`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchGetProblem = async (
//   input: GetProblemInput,
//   ctx: GetServerSidePropsContext
// ): Promise<ProblemOutput> => {
//   const authorization = null;
//   const { problemId, ...params } = input;
//   const url = `/v2/problems/${problemId}`;
//   const response = await axiosClient.get<ProblemOutput>(url, {
//     params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// GetProblems
// --------------------------------

export type GetProblemsInput = {
  challengeId: string;
  skip?: number;
  take?: number;
};

export type GetProblemsOutput = ProblemOutput;

export const useGetProblems = <
  OutType extends GetProblemsOutput = GetProblemsOutput,
  InType extends GetProblemsInput = GetProblemsInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetProblems', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v2/problems`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// DeleteProblem
// --------------------------------

export type DeleteProblemInput = {
  problemId: string;
};

export type DeleteProblemOutput = ProblemOutput;

export const useDeleteProblem = <
  OutType extends DeleteProblemOutput = DeleteProblemOutput,
  InType extends DeleteProblemInput = DeleteProblemInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { problemId, ...params } = input;
      const url = `/v1/problems/${problemId}`;
      const response = await axiosClient.delete<OutType>(url, {
        data: params,
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchDeleteProblem = async (
//   input: DeleteProblemInput,
//   ctx: GetServerSidePropsContext
// ): Promise<DeleteProblemOutput> => {
//   const authorization = null;
//   const { ...params } = input;
//   const url = `/v1/DeleteProblem`;
//   const response = await axiosClient.delete<DeleteProblemOutput>(url, {
//     data: params,
//     headers: { authorization },
//   });
//   return response.data;
// };

// --------------------------------
// UpdateProblem
// --------------------------------

export type UpdateProblemInput = {
  problemId: string;
  problem: ProblemUpdateInput;
};

export type UpdateProblemOutput = ProblemOutput;

export const useUpdateProblem = <
  OutType extends UpdateProblemOutput = UpdateProblemOutput,
  InType extends UpdateProblemInput = UpdateProblemInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { problemId, ...params } = input;
      const url = `/v1/problems/${problemId}`;
      const response = await axiosClient.patch<OutType>(url, params.problem, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// export const fetchUpdateProblem = async (
//   input: UpdateProblemInput,
//   ctx: GetServerSidePropsContext
// ): Promise<UpdateProblemOutput> => {
//   const authorization = null;
//   const { ...params } = input;
//   const url = `/v1/UpdateProblem`;
//   const response = await axiosClient.patch<UpdateProblemOutput>(url, params, {
//     headers: { authorization },
//   });
//   return response.data;
// };
