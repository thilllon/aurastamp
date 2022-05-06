import { PixelCrop } from 'react-image-crop';
import { canvasPreview } from './CanvasPreview';

let previewUrl = '';

export const canvasToBlob = async (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((res: any) => canvas.toBlob(res));
};

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export const imgPreview = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) => {
  const canvas = document.createElement('canvas');
  canvasPreview(image, canvas, crop, scale, rotate);
  const blob = await canvasToBlob(canvas);
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrl = URL.createObjectURL(blob);
  return { previewUrl, blob };
};
