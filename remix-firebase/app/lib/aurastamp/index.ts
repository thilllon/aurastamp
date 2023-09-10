import axios from 'axios';

export type AurastampModel = 'bts' | 'blackpink' | 'the';

export type EncodeImageInput = {
  file: File | Blob;
  modelName: AurastampModel;
  hiddenMessage: string;
  hiddenImage: File | undefined;
  returnType: 'base64' | string;
};

export type EncodeImageOutput = string;

const baseUrl = process.env.AURASTAMP_API_URL ?? 'https://api.aurastamp.com';

export const encodeImage = async (data: EncodeImageInput) => {
  const { file, modelName, hiddenMessage, hiddenImage, returnType } = data;
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('model_name', data.modelName);
  formData.append('message', data.hiddenMessage);
  formData.append('return_type', data.returnType);
  if (hiddenImage) {
    formData.append('media', hiddenImage);
  }
  return axios.post<EncodeImageOutput>('/encode', formData, {
    baseURL: baseUrl,
  });
};

/**
 * Download as image
 * @param {string} base64Encoded base64 encoded image
 * @param {string} filename filename
 */
export const downloadBase64ToPng = (base64Encoded: string, filename: string) => {
  const downloadLink = document.createElement('a');
  filename = filename.endsWith('.png') ? filename : filename + '.png';
  downloadLink.download = filename;
  downloadLink.innerHTML = 'download';
  downloadLink.href = 'data:image/png;base64,' + base64Encoded;
  downloadLink.click();
};


// --------------------------------
// --------------------------------

