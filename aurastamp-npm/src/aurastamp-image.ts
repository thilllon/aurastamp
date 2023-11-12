import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';
import { readFileSync, writeFileSync } from 'fs';
import mime from 'mime-types';
import path from 'path';

type ReturnType = 'base64' | 'buffer';

type ModelKind = 'the';

type EncodeResponse = {
  data: string;
};

type DecodeResponse = {
  dislike_cnt: number;
  hash_string: string;
  like_cnt: number;
  secret: string;
  secret_image: null | string;
  view_cnt: number;
};

const aurastampApiUrl = (process.env.AURASTAMP_API_URL = 'https://api.aurastamp.com');

export class AurastampImage {
  private readonly client: AxiosInstance;

  constructor({ serverUrl }: { serverUrl?: string }) {
    this.client = axios.create({
      baseURL: serverUrl ?? aurastampApiUrl,
    });
  }

  async encode({
    model = 'the',
    image,
    message,
    hiddenImage,
    returnType = 'base64',
    contentType,
    filename,
    headers = {},
  }: {
    model: ModelKind;
    image: Buffer;
    message: string;
    hiddenImage?: Buffer;
    returnType?: ReturnType;
    contentType?: string;
    filename: string;
    headers?: Record<string, any>;
  }) {
    const formData = new FormData();
    formData.append('file', image, { filename, contentType });
    formData.append('model_name', model);
    formData.append('text', message);
    formData.append('return_type', returnType);
    if (hiddenImage) {
      formData.append('media', hiddenImage);
    }

    const response = await this.client.post('/encode', formData, {
      headers: {
        ...formData.getHeaders(),
        ...headers,
      },
    });

    return response;
  }

  async encodeLocalFile({
    model = 'the',
    message,
    returnType = 'base64',
    imageFilePath,
    hiddenImageFilePath,
    outputPath,
    headers = {},
  }: {
    model: ModelKind;
    message: string;
    returnType?: ReturnType;
    imageFilePath: string;
    hiddenImageFilePath?: string;
    outputPath?: string;
    headers?: Record<string, any>;
  }) {
    const formData = new FormData();

    if (!imageFilePath.startsWith('/')) {
      // if relative path, convert it to absolute path
      imageFilePath = path.join(process.cwd(), imageFilePath);
    }

    const image = readFileSync(imageFilePath);
    const contentType = mime.contentType(path.extname(imageFilePath)) || undefined;
    formData.append('file', image, {
      filename: path.basename(imageFilePath),
      contentType,
    });
    formData.append('model_name', model);
    formData.append('text', message);
    formData.append('return_type', returnType);
    if (hiddenImageFilePath) {
      const hiddenImage = readFileSync(hiddenImageFilePath);
      formData.append('media', hiddenImage);
    }

    const response = await this.client.post<never, EncodeResponse>('/encode', formData, {
      headers: {
        ...formData.getHeaders(),
        responseType: 'text',
        // responseType: 'arraybuffer',
        responseEncoding: 'base64',
        ...headers,
      },
    });

    if (outputPath) {
      writeFileSync(outputPath, response.data, { encoding: 'base64' });
    }

    return response;
  }

  async decode({
    model,
    image,
    filename,
    contentType,
    headers = {},
  }: {
    model: ModelKind;
    image: Buffer;
    filename: string;
    contentType?: string;
    headers?: Record<string, any>;
  }) {
    const formData = new FormData();
    formData.append('file', image, { filename, contentType });
    formData.append('model_name', model);
    return this.client.post<DecodeResponse>('/decode', formData, {
      headers: { ...formData.getHeaders(), ...headers },
    });
  }

  async decodeLocalFile({
    model,
    imageFilePath,
    outputPath,
    headers = {},
  }: {
    model: ModelKind;
    imageFilePath: string;
    outputPath?: string;
    headers?: Record<string, any>;
  }) {
    // read file and decode it
    throw new Error('not implemented');
  }
}
