import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { db } from '../app/firebase';

type MutationOptions<Output, Input, Context = unknown> =
  | Omit<UseMutationOptions<Output, AxiosError, Input, Context>, 'mutationFn'>
  | undefined;

type EncodeImageInput = {
  file: File | Blob;
  message: string;
  modelName?: 'the' | string;
  hiddenImage?: File | undefined;
  returnType?: 'base64' | string;
};

type EncodeImageOutput = string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client = axios.create({
  baseURL: 'https://aurastamp.up.railway.app',
  // baseURL: process.env.MODEL_API_URL,
});

export const useEncodeImage = () => {
  return useMutation<EncodeImageOutput, AxiosError, EncodeImageInput>({
    mutationFn: async ({ file, message, modelName, hiddenImage, returnType }) => {
      // TODO: firebase
      // await db.
      const formData = new FormData();
      formData.append('file', file);
      formData.append('message', message);
      if (modelName) {
        formData.append('model_name', modelName);
      }
      if (returnType) {
        formData.append('return_type', returnType);
      }
      if (hiddenImage) {
        formData.append('media', hiddenImage);
      }
      return client.post<EncodeImageOutput>('/encode', formData).then(({ data }) => data);
    },
  });
};
