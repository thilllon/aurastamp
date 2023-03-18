import axios, { Axios, AxiosInstance } from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

export class Aurastamp {
  private aurastampAuth: AurastampAuth;
  private aurastampImage: AurastampImage;

  constructor() {
    this.aurastampAuth = new AurastampAuth();
    this.aurastampImage = new AurastampImage();
  }

  get auth() {
    return this.aurastampAuth;
  }

  get image() {
    return this.aurastampImage;
  }
}

export class AurastampAuth {
  constructor() {
    //
  }
}

export class AurastampImage {
  private readonly client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.aurastamp.com',
    });
  }

  async encode({
    model = 'the',
    image,
    message,
    hiddenImage,
    returnType,
  }: {
    model: string;
    image: File;
    message: string;
    hiddenImage: File;
    returnType: string;
  }) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('model_name', model);
    formData.append('text', message);
    if (hiddenImage) {
      formData.append('media', hiddenImage);
    }
    formData.append('return_type', returnType);
    return this.client.post('/encode_stamp', formData);
  }

  async decode({ image }: { image: File }) {
    const formData = new FormData();
    formData.append('file', image);
    return this.client.post('/decode_stamp', formData);
  }
}
