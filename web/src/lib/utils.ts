import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../app/firebase';

export type Base64DataUrl = string;
type ArrayBufferString = string;
type 
 = ArrayBufferString;
type EncodeImageInput = {
  imageSource: Base64DataUrl;
  hiddenImageSource?: Base64DataUrl;
  message: string;
  metadata: ImageMetadata;
};

const IMAGE_COLLECTION = 'images';
const HIDDEN_IMAGE_DIR = 'hidden';
const MODEL_API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL ?? 'https://aurastamp.up.railway.app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client = axios.create({ baseURL: MODEL_API_URL });

export const useEncodeImage = () => {
  return useMutation<
  , AxiosError, EncodeImageInput>({
    mutationFn: async (data) => {
      const { message } = await preprocessOnFirebase(data);
      const formData = new FormData();
      formData.append('file', await dataUrlToBlob(data.imageSource), data.metadata.name);
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

type DecodeImageOutput = {
  message: ArrayBufferString;
  downloadUrl: string;
};
type DecodeImageInput = {
  imageSource: Base64DataUrl;
  metadata: ImageMetadata;
};

export const useDecodeImage = () => {
  return useMutation({
    mutationFn: async (data: DecodeImageInput): Promise<DecodeImageOutput> => {
      // FIXME: decode counter, decoded at, decoded by 기록.
      // 그냥 유저 액션기록. ip, action, timestamp

      const formData = new FormData();
      formData.append('file', dataUrlToBlob(data.imageSource));
      formData.append('model_name', 'the');
      // formData.append('return_type', 'base64');
      const id = await client.post<EncodeImageOutput>('/decode', formData).then(({ data }) => data);
      console.debug(id);
      console.debug(id);
      const docSnap = await getDoc(doc(db, IMAGE_COLLECTION, id));
      if (!docSnap.exists()) {
        throw new Error('No such document!');
      }
      const docData = docSnap.data() as FirestoreInput;
      if (!docData) {
        throw new Error('No data!');
      }

      await updateDoc(doc(db, IMAGE_COLLECTION, id), {
        view: increment(1),
      });
      const downloadUrl = await getDownloadURL(ref(storage, getBucketPath(data.metadata.name)));

      return {
        message: docData.message,
        downloadUrl,
      };
    },
  });
};

export const useReactToItem = () => {
  return useMutation({
    mutationFn: async (data: { id: string; reaction: 'LIKE' }) => {
      await updateDoc(doc(db, IMAGE_COLLECTION, data.id), {
        like: data.reaction === 'LIKE' ? increment(1) : increment(0),
      });
    },
  });
};

export async function sha1(str: string) {
  const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(hash))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
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

export async function preprocessOnFirebase({
  message,
  imageSource,
  hiddenImageSource,
  metadata,
}: Pick<EncodeImageInput, 'message' | 'hiddenImageSource' | 'imageSource' | 'metadata'>) {
  const hiddenImageSha = hiddenImageSource ? await sha1(hiddenImageSource) : null;
  const storagePath = uuid();
  const promises = [
    addDoc(collection(db, IMAGE_COLLECTION), {
      ...metadata,
      message,
      storagePath,
      imageSha: await sha1(imageSource),
      hiddenImageSha,
      createdAt: serverTimestamp(),
    } as FirestoreInput),
    uploadString(ref(storage, getBucketPath(storagePath, metadata.name)), imageSource, 'data_url'),
  ];
  if (hiddenImageSource && hiddenImageSha) {
    promises.push(
      uploadString(
        ref(storage, getBucketPath(storagePath, HIDDEN_IMAGE_DIR, hiddenImageSha)),
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
  return { message: length7Message };
}

/**
 * @description data:[mime-type];base64,[base64-encoded-image]
 * @example data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA...
 */
function dataUrlToBlob(dataURL: string): Blob {
  const [typePart, dataPart] = dataURL.split(',');
  const contentType = typePart.split(':')[1]; // MIME type
  const byteString = atob(dataPart); // base64 to binary
  const uint8Array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: contentType });
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

export function downloadByteArrayBuffer(arrayBufferString: ArrayBufferString, filename: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([arrayBufferString]));
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}
