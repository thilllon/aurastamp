import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';

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
  constructor() {}
}

export class AurastampImage {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: 'https://api.aurastamp.com' });
  }

  async encode({
    model = 'the',
    image,
    message,
    hiddenImage,
    returnType = 'base64',
    contentType,
    filename,
  }: {
    model: string;
    image: Buffer;
    message: string;
    hiddenImage?: Buffer;
    returnType?: 'base64' | 'buffer';
    contentType?: string;
    filename: string;
  }) {
    const formData = new FormData();
    // const contentType = mime.contentType(path.extname(imageFilePath)) || undefined;
    formData.append('file', image, { filename, contentType });
    formData.append('model_name', model);
    formData.append('text', message);
    formData.append('return_type', returnType);
    if (hiddenImage) {
      formData.append('media', hiddenImage);
    }
    return this.client.post('/encode', formData, {
      headers: { ...formData.getHeaders() },
    });
  }

  async decode({ image }: { image: File }) {
    const formData = new FormData();
    formData.append('file', image);
    return this.client.post('/decode', formData);
  }
}
