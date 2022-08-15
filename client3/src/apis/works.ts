import { axiosClient, _MutationOptions, _QueryOptions } from '@/apis/base';
import { useAuthorization } from '@/lib/session-client';
import { HttpStatusOutput, WorkConfigOutput, WorkOutput, WorkUpdateInput } from '@/types/apiTypes';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

// --------------------------------
// GetWorks
// --------------------------------

export type GetWorksInput = {
  problemId?: string;
  challengeId?: string;
  takeCount?: number;
};

export type GetWorksOutput = WorkConfigOutput[];

export const useGetWorks = <OutType extends GetWorksOutput, InType extends GetWorksInput>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetWorks', input],
    async ({ queryKey }) => {
      const { ...params } = queryKey[1];
      const url = `/v1/works`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetWork
// --------------------------------

export type GetWorkInput = {
  workId: string;
};

export type GetWorkOutput = WorkOutput;

export const useGetWork = <OutType extends GetWorkOutput, InType extends GetWorkInput>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetWork', input],
    async ({ queryKey }) => {
      const { workId, ...params } = queryKey[1];
      const url = `/v1/works/${workId}`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// UpdateWork
// --------------------------------

export type UpdateWorkInput = {
  workId: string;
  work: WorkUpdateInput;
};

export type UpdateWorkOutput = WorkOutput;

export const useUpdateWork = <OutType extends UpdateWorkOutput, InType extends UpdateWorkInput>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}`;
      const response = await axiosClient.patch<OutType>(url, params.work, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// ExecuteWork
// --------------------------------

export type ExecuteWorkInput = {
  workId: string;
};

export type ExecuteWorkOutput = {
  stdout: string;
  currentLineNumber: number;
  lineCount: number;
  createdAt: Date;
};

export const useExecuteWork = <OutType extends ExecuteWorkOutput, InType extends ExecuteWorkInput>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}/execution/request`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetExecutionResult
// --------------------------------

export type GetExecutionResultInput = {
  workId: string;
};

export type GetExecutionResultOutput = ExecuteWorkOutput;

export const useGetExecutionResult = <
  OutType extends GetExecutionResultOutput,
  InType extends GetExecutionResultInput
>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetExecutionResult', input],
    async ({ queryKey }) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}/execution/result`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// SubmitWork
// --------------------------------

export type SubmitWorkInput = {
  workId: string;
};

export type SubmitWorkOutput = HttpStatusOutput;

export const useSubmitWork = <OutType extends SubmitWorkOutput, InType extends SubmitWorkInput>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}/submission/request`;
      const response = await axiosClient.post<OutType>(url, params, { headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// GetWorkUrl
// --------------------------------

export type GetWorkUrlInput = {
  workId: string;
};

export type GetWorkUrlOutput = {
  url: string;
};

export const useGetWorkUrl = <OutType extends GetWorkUrlOutput, InType extends GetWorkUrlInput>(
  input: InType,
  options: _QueryOptions<OutType, InType> = {}
) => {
  const authorization = useAuthorization();
  return useQuery<OutType, AxiosError<OutType, InType>, OutType, [string, InType]>(
    ['GetWorkUrl', input],
    async ({ queryKey }) => {
      const { workId, ...params } = queryKey[1];
      const url = `/v1/works/${workId}/url`;
      const response = await axiosClient.get<OutType>(url, { params, headers: { authorization } });
      return response.data;
    },
    { ...options }
  );
};

// --------------------------------
// CancelExecution
// --------------------------------

export type CancelExecutionInput = {
  workId: string;
};

export type CancelExecutionOutput = HttpStatusOutput;

export const useCancelExecution = <
  OutType extends CancelExecutionOutput = CancelExecutionOutput,
  InType extends CancelExecutionInput = CancelExecutionInput
>(
  options?: _MutationOptions<OutType, InType>
) => {
  const authorization = useAuthorization();
  return useMutation<OutType, AxiosError<OutType, InType>, InType>(
    async (input) => {
      const { workId, ...params } = input;
      const url = `/v1/works/${workId}/execution/cancel`;
      const response = await axiosClient.put<OutType>(url, params, {
        headers: { authorization },
      });
      return response.data;
    },
    { ...options }
  );
};
