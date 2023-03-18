import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import { Aurastamp } from '../src/aurastamp';

jest.setTimeout(300_000);

describe('aurastamp', () => {
  let imageFilePath: string;

  beforeAll(() => {
    imageFilePath = path.join(process.cwd(), './tests/fixtures/img1.png');
  });

  // test('encode image with return type `base64`', async () => {
  //   const formData = new FormData();
  //   const imageData = fs.readFileSync(imageFilePath);
  //   const contentType = mime.contentType(path.extname(imageFilePath)) || undefined;
  //   formData.append('file', imageData, { filename: path.basename(imageFilePath), contentType });
  //   formData.append('model_name', 'the');
  //   formData.append('text', 'Hello world!');
  //   formData.append('return_type', 'base64');

  //   const req = await axios.post('https://api.aurastamp.com/encode', formData, {
  //     headers: { ...formData.getHeaders() },
  //   });
  //   expect(req.status).toBe(200);
  //   expect(req.data.length).toBeGreaterThan(1);
  //   console.log(req.data.slice(0, 100));
  // });

  test('encode image with return type `base64`', async () => {
    const aurastamp = new Aurastamp();
    const image = fs.readFileSync(imageFilePath);
    const filename = path.basename(imageFilePath);
    const contentType = mime.contentType(path.extname(imageFilePath)) || undefined;

    const encoded = await aurastamp.image.encode({
      model: 'the',
      message: 'Hello world!',
      image,
      filename,
      contentType,
    });
    expect(encoded.status).toBe(200);

    // TODO: download the image and compare it with the original image
  });

  test('encode image with return type `XXXX`', async () => {
    // TODO:
    expect(true).toBeTruthy();
  });

  test('throw if an image is empty', async () => {
    // TODO:
    expect(true).toBeTruthy();
  });

  test('image should be a valid image', async () => {
    // TODO:
    expect(true).toBeTruthy();
  });

  test('messsage should be shorter than 100 characters', async () => {
    // TODO:
    expect(true).toBeTruthy();
  });
});
