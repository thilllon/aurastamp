import { client, _QueryOptions } from '@/services/client';
import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

export type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

export type QueryOptions<Output, Input> = Omit<
  UseQueryOptions<Output, AxiosError, Output, [string, Input]>,
  'queryKey' | 'queryFn'
>;

// --------------------------------
// get tasks
// --------------------------------
// type EncodeImageInput = {
//   jobId: string;
//   skip?: number;
//   take?: number;
//   status?: string;
// };

// type Task = {
//   id: string;
//   selected: boolean; // 작업완료했는지
//   order: number;
//   title: string;
// };

// export type GetTaskListOutput = {
//   tasks: Task[];
// };

// export const useGetTaskList = (
//   input: EncodeImageInput,
//   options?: _QueryOptions<EncodeImageInput, GetTaskListOutput>
// ) => {
//   const [session] = useCustomSession();
//   const query = useQuery(
//     ['TASKS', input],
//     async ({ queryKey }) => {
//       client.defaults.headers.common.authorization = session?.user.accessToken as string;
//       const { jobId, ...params } = queryKey[1];
//       const response = await client.get<GetTaskListOutput>(`/jobs/${jobId}/tasks`, { params });
//       return response.data;
//     },
//     options
//   );
//   return query;
// };

// --------------------------------
// encode image
// --------------------------------

export type EncodeImageInput = {
  file: File | Blob;
  modelName: 'the' | string;
  hiddenMessage: string;
  hiddenImage: File | undefined;
  returnType: 'base64' | string;
};

export type EncodeImageOutput = string;

export const useEncodeImage = (options?: MutationOptions<EncodeImageOutput, EncodeImageInput>) => {
  return useMutation<EncodeImageOutput, AxiosError, EncodeImageInput>(async (input) => {
    const { file, modelName, hiddenMessage, hiddenImage, returnType } = input;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_name', modelName);
    formData.append('text', hiddenMessage);
    if (hiddenImage) {
      formData.append('media', hiddenImage);
    }
    formData.append('return_type', returnType);

    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    const url = baseUrl + '/encode_stamp';
    const response = await axios.post<EncodeImageOutput>(url, formData);
    return response.data;
  }, options);
};
