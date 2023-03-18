import { afterAll, beforeAll, describe } from '@jest/globals';
import { File } from 'node:buffer';
import { createReadStream, readFileSync } from 'node:fs';
import path from 'node:path';
import test, { beforeEach } from 'node:test';
import { Aurastamp } from './aurastamp';

describe('test aurastamp', () => {
  let imageFilePath: string;

  beforeAll(() => {
    // TODO: create an image

    imageFilePath = path.join(process.cwd(), 'assets', 'img1.png');
  });

  afterAll(() => {
    // TODO: remove an image
  });

  test('test', async () => {
    const aurastamp = new Aurastamp();
    const image = createReadStream(imageFilePath);

    const encoded = await aurastamp.image.encode({
      model: 'the',
      image: image,
      hiddenImage: image,
      message: 'adfasdfasdf',
    });
  });
});
