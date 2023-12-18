export type Base64DataUrl = string;

export type ArrayBufferString = string;

export type ImageMetadata = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath?: string;
};

export type EncodeImageInput = {
  imageSource: Base64DataUrl;
  hiddenImageSource?: Base64DataUrl;
  message: string;
  metadata: ImageMetadata;
};

export type EncodeImageOutput = ArrayBufferString;

export type DecodeImageInput = {
  imageSource: Base64DataUrl;
  metadata: ImageMetadata;
};

export type DecodeImageOutput = {
  message: ArrayBufferString;
  downloadUrl: string;
};

export type FirestoreInput = {
  message: string;
  imageSha: string;
  hiddenImageSha?: string;
} & ImageMetadata;
