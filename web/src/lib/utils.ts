import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

type EncodeImageInput = {
  file: File | Blob;
  modelName: 'the' | string;
  hiddenMessage: string;
  hiddenImage: File | undefined;
  returnType: 'base64' | string;
};

type EncodeImageOutput = string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client = axios.create({ baseURL: process.env.MODEL_API_URL });

export const useEncodeImage = (options?: MutationOptions<EncodeImageOutput, EncodeImageInput>) => {
  return useMutation<EncodeImageOutput, AxiosError, EncodeImageInput>({
    mutationFn: async ({ file, modelName, hiddenMessage, hiddenImage, returnType }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model_name', modelName);
      formData.append('message', hiddenMessage);
      formData.append('return_type', returnType);
      if (hiddenImage) {
        formData.append('media', hiddenImage);
      }
      return client.post<EncodeImageOutput>('/encode', formData).then(({ data }) => data);
    },
  });
};
