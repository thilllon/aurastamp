import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, UseQueryOptions } from 'react-query';

export type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

export type QueryOptions<Output, Input> = Omit<
  UseQueryOptions<Output, AxiosError, Output, [string, Input]>,
  'queryKey' | 'queryFn'
>;

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});

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
    formData.append('message', hiddenMessage);
    formData.append('return_type', returnType);
    if (hiddenImage) {
      formData.append('media', hiddenImage);
    }

    const response = await axiosClient.post<EncodeImageOutput>('/encode', formData);
    return response.data;
  }, options);
};
