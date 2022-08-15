import { AxiosError } from 'axios';
import { MutationOptions } from 'react-query';

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
