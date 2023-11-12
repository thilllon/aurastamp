import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import { Aurastamp } from '../src/aurastamp';

jest.setTimeout(300_000);

describe('aurastamp encode', () => {
  let imgFilePath: string;

  beforeAll(() => {
    fs.mkdirSync(path.join(process.cwd(), './tests/output'), {
      recursive: true,
    });
    imgFilePath = path.join(process.cwd(), './tests/fixtures/img1.png');
  });

  afterAll(() => {
    // TODO: remove all output files
  });

  test.only('encode image with return type `base64`', async () => {
    const aurastamp = new Aurastamp({});
    const image = fs.readFileSync(imgFilePath);
    const filename = path.basename(imgFilePath);
    const contentType = mime.contentType(path.extname(imgFilePath)) || undefined;

    const encoded = await aurastamp.image.encode({
      model: 'the',
      message: 'Hello world!',
      image,
      filename,
      contentType,
    });
    expect(encoded.status).toBe(200);
    expect(encoded.data).toBeTruthy();

    const dstFilePath = path.join(process.cwd(), './tests/output/encoded.png');
    fs.writeFileSync(dstFilePath, encoded.data, { encoding: 'base64' });
    expect(fs.existsSync(dstFilePath)).toBeTruthy();
    // fs.rmSync(dstFilePath);
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

  // FIXME:
  // test('encodeLocalFile', async () => {
  //   const aurastamp = new Aurastamp({});
  //   const encoded = await aurastamp.image.encodeLocalFile({
  //     model: 'the',
  //     message: 'winter is coming',
  //     imageFilePath: './tests/fixtures/img1.png',
  //     hiddenImageFilePath: './tests/fixtures/img2.png',
  //     outputPath: './tests/output/encoded.png',
  //   });
  //   expect(encoded.data).toBeTruthy();
  //   expect(fs.existsSync('./tests/output/encoded.png')).toBeTruthy();
  // });
});

describe('aurastamp decode', () => {
  let encodedImageFilePath: string;

  beforeAll(() => {
    encodedImageFilePath = path.join(process.cwd(), './tests/fixtures/encoded.png');
  });

  test('decode image', async () => {
    const aurastamp = new Aurastamp({});
    const encodedImage = fs.readFileSync(encodedImageFilePath);
    const contentType = mime.contentType(path.extname(encodedImageFilePath)) || undefined;
    const decoded = await aurastamp.image.decode({
      model: 'the',
      image: encodedImage,
      filename: path.basename(encodedImageFilePath),
      contentType,
    });
    expect(decoded.status).toBe(200);
    expect(decoded.data.secret).toBe('Hello world!');
  });
});
