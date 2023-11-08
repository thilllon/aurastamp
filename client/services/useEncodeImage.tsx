import { httpClient, MutationOptions } from '@/services/httpClient';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

type EncodeImageInput = {
  file: File | Blob;
  modelName: 'the' | string;
  hiddenMessage: string;
  hiddenImage: File | undefined;
  returnType: 'base64' | string;
};

type EncodeImageOutput = string;

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
    const response = await httpClient.post<EncodeImageOutput>('/encode', formData);
    return response.data;
  }, options);
};
