import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../app/firebase';

export type Base64DataUrl = string;

type ArrayBufferString = string;

type EncodeImageInput = {
  imageSource: string;
  message: string;
  hiddenImageSource?: Base64DataUrl;
  metadata: ImageMetadata;
};

type EncodeImageOutput = ArrayBufferString;

const IMAGE_COLLECTION = 'images';
const MODEL_API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL ?? 'https://aurastamp.up.railway.app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client = axios.create({ baseURL: MODEL_API_URL });

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
} & ImageMetadata;

export type ImageMetadata = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath?: string;
};

const getBucketPath = (...path: string[]) => {
  return ['aurastamp', ...path].join('/');
};

export async function hideSecretMessage({
  message,
  imageSource,
  hiddenImageSource,
  metadata,
}: EncodeImageInput) {
  const hiddenImageSha = hiddenImageSource ? await sha1(hiddenImageSource) : null;

  const storagePath = uuid();
  const promises = [
    addDoc(collection(db, IMAGE_COLLECTION), {
      ...metadata,
      message,
      storagePath: storagePath,
      imageSha: await sha1(imageSource),
      hiddenImageSha,
      createdAt: serverTimestamp(),
    } as FirestoreInput),
    uploadString(ref(storage, getBucketPath(storagePath, metadata.name)), imageSource, 'data_url'),
  ];
  if (hiddenImageSource && hiddenImageSha) {
    promises.push(
      uploadString(
        ref(storage, getBucketPath(storagePath, 'hidden', hiddenImageSha)),
        hiddenImageSource,
        'data_url',
      ),
    );
  }
  const result = await Promise.allSettled(promises);

  // TODO: 하나라도 실패시 롤백처리 해야함
  if (result[0].status === 'rejected') {
    throw new Error();
  }

  const length7Message = (result[0].value as any)?.id?.slice(0, 7);
  if (!length7Message) {
    throw new Error(`Failed to get message id. ${result[0].value}`);
  }
  const blob = await dataUrlToBlob(imageSource);
  return { file: blob, message: length7Message };
}

export function blobToDataUrl(
  blob: Blob,
  callback: (dataUrl: string | ArrayBuffer | null) => void,
) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    const base64data = reader.result;
    callback(base64data);
  };
}
