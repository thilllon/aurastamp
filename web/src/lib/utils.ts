import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { DocumentData, DocumentReference, runTransaction } from 'firebase/firestore';

import { doc, getDoc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { db, storage } from '../app/firebase';
import {
  ArrayBufferString,
  DecodeImageInput,
  DecodeImageOutput,
  EncodeImageInput,
  EncodeImageOutput,
  FirestoreInput,
} from './types';
import { z } from 'zod';
import { Regex } from 'lucide-react';

// const imageCollection = 'images';
const hiddenImageSegment = 'hidden';
const MODEL_API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL ?? 'https://aurastamp.up.railway.app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client = axios.create({ baseURL: MODEL_API_URL });

export const useEncodeImage = () => {
  return useMutation<EncodeImageOutput, AxiosError, EncodeImageInput>({
    mutationFn: async (data) => {
      const { hiddenMessage: message } = await saveImageAndGetId(data);
      const formData = new FormData();
      formData.append('file', await dataUrlToBlob(data.imageSource), data.metadata.name);
      formData.append('message', message);
      formData.append('model_name', 'the');
      return client
        .post<EncodeImageOutput>('/encode', formData, {
          responseType: 'arraybuffer',
        })
        .then(({ data }) => data);
    },
  });
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
      const { data: hash } = await client.post<EncodeImageOutput>('/decode', formData);
      const imageId = parseInt(hash.trim()).toString();
      const imageRef = doc(db, 'aurastamp_images', imageId);
      const imageDoc = await getDoc(imageRef);
      if (!imageDoc.exists()) {
        throw new Error(`image not found. hash: ${hash}`);
      }
      const docData = imageDoc.data() as FirestoreInput | undefined;
      if (!docData) {
        throw new Error(`not found. id: ${imageId}`);
      }

      await updateDoc(imageRef, {
        view: increment(1),
      });
      const downloadUrl = await getDownloadURL(
        ref(storage, `aurastamp/${imageDoc.id}/${docData.name}`),
      );

      console.warn(docData);

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
      await updateDoc(doc(db, 'aurastamp_images', data.id), {
        like: data.reaction === 'LIKE' ? increment(1) : increment(0),
      });
    },
  });
};

async function getSha1(str: string) {
  const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(hash))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
}

// https://firebase.google.com/docs/storage/web/upload-files?hl=ko#web-modular-api

// const getPath = (...path: string[]) => {
//   return ['aurastamp', ...path].join('/');
// };

async function saveImageAndGetId({
  message,
  imageSource,
  hiddenImageSource,
  metadata,
}: Pick<EncodeImageInput, 'message' | 'hiddenImageSource' | 'imageSource' | 'metadata'>): Promise<{
  hiddenMessage: string;
}> {
  console.warn('호출 ', new Date().toISOString());
  const metadataRef = doc(db, 'aurastamp', 'metadata');
  return runTransaction(db, async (transaction) => {
    let newImageRef: DocumentReference<DocumentData, DocumentData>;
    let newImageId: number;
    const metadataDoc = await transaction.get(metadataRef);

    while (true) {
      const lastImageId = metadataDoc.data()?.lastId;
      if (lastImageId == null) {
        throw new Error('last image ID is undefined');
      }

      newImageId = Number(lastImageId) + 1;
      if (isNaN(newImageId)) {
        throw new Error(`failed to generate new image ID. lastImageId: ${lastImageId}`);
      }
      newImageRef = doc(db, 'aurastamp_images', String(newImageId));
      if ((await transaction.get(newImageRef)).exists()) {
        console.warn(`duplicated ID. id: ${newImageId}`);
        continue;
      }
      break;
    }

    const hiddenImageSha = hiddenImageSource ? await getSha1(hiddenImageSource) : null;
    const storagePath = `aurastamp/${newImageRef.id}/${metadata.name}`;
    await transaction.set(newImageRef, {
      ...metadata,
      message,
      storagePath,
      imageSha: await getSha1(imageSource),
      hiddenImageSha,
      createdAt: serverTimestamp(),
    } as FirestoreInput);
    await uploadString(ref(storage, storagePath), imageSource, 'data_url');
    if (hiddenImageSource && hiddenImageSha) {
      await uploadString(
        ref(storage, `aurastamp/${newImageRef.id}/${hiddenImageSegment}/${hiddenImageSha}`),
        hiddenImageSource,
        'data_url',
      );
    }
    if (!newImageId) {
      throw new Error(`failed to hide message. image id: ${newImageId}`);
    }
    await transaction.update(metadataRef, { lastId: String(newImageId) });
    return { hiddenMessage: String(newImageId) };
  });
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

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
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

export const hyperlinkify = (text: string) => {
  // FIXME: https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return `<a style="text-decoration-line: underline; font-weight: bold;" href="${url}">${url}</a>`;
  });
};
