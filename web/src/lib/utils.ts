import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

import { ref, uploadString } from 'firebase/storage';
import { db, storage } from '../app/firebase';

export type Base64 = string;

type ArrayBufferString = string;

type EncodeImageInput = {
  imageSource: string;
  message: string;
  hiddenImageSource?: Base64;
  metadata: ImageMetadata;
};

type EncodeImageOutput = ArrayBufferString;

const IMAGE_COLLECTION = 'images';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
process.env.MODEL_API_URL = 'https://aurastamp.up.railway.app';

const client = axios.create({
  baseURL: process.env.MODEL_API_URL ?? 'http://localhost:8000',
});

export const useEncodeImage = () => {
  return useMutation<EncodeImageOutput, AxiosError, EncodeImageInput>({
    mutationFn: async (data) => {
      const { file, message } = await hideSecretMessage(data);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('message', message);
      formData.append('model_name', 'the');
      // formData.append('return_type', 'base64');
      return client
        .post<EncodeImageOutput>('/encode', formData, {
          responseType: 'arraybuffer',
        })
        .then(({ data }) => data);
    },
  });
};

export async function sha1(str: string) {
  const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(hash))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * @example data:image/png;base64,[base64-encoded-image]
 */
export function dataUrlToBlob(dataURL: string) {
  const [typePart, dataPart] = dataURL.split(',');
  const contentType = typePart.split(':')[1];
  const byteString = atob(dataPart);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: contentType });
}

export function downloadByteArray(byteArrayString: string, filename: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([byteArrayString]));
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

// https://firebase.google.com/docs/storage/web/upload-files?hl=ko#web-modular-api

type FirestoreInput = {
  message: string;
  imageSha: string;
  hiddenImageSha?: string;
  filename: string;
  type: string;
  size: number;
  fileLastModified: number;
};

export type ImageMetadata = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;
};

export async function hideSecretMessage({
  message,
  imageSource,
  hiddenImageSource,
  metadata,
}: EncodeImageInput) {
  const promises = [
    addDoc(collection(db, IMAGE_COLLECTION), {
      message,
      imageSha: await sha1(imageSource),
      hiddenImageSha: hiddenImageSource ? await sha1(hiddenImageSource) : null,
      filename: metadata.name,
      fileLastModified: metadata.lastModified,
      type: metadata.type,
      size: metadata.size,
      createdAt: serverTimestamp(),
    } as FirestoreInput),
    uploadString(ref(storage, metadata.name), imageSource, 'data_url'),
  ];
  if (hiddenImageSource) {
    promises.push(uploadString(ref(storage, metadata.name), hiddenImageSource, 'data_url'));
  }
  const result = await Promise.allSettled(promises);

  // TODO: 하나라도 실패시 롤백처리 해야함
  if (result[0].status === 'rejected') {
    throw new Error();
  }

  const length7Message = (result[0].value as any)?.id?.slice(0, 7);
  if (length7Message.length > 7) {
    throw new Error(`Failed to hide message. ${length7Message}`);
  }
  const blob = await dataUrlToBlob(imageSource);
  return { file: blob, message: length7Message };
}
