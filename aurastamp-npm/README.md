# Aurastamp

## Usage

### Encode an image with a message

```ts
import { Aurastamp } from 'aurastamp';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

const aurastamp = new Aurastamp({});

const filePath = path.join(process.cwd(), './path/to/image/file.png');
const image = fs.readFileSync(filePath);
const filename = path.basename(filePath);
const contentType = mime.contentType(path.extname(filePath)) || undefined;
const encoded = await aurastamp.image.encode({
  model: 'the',
  message: 'This is a secret message!',
  image,
  filename,
  contentType,
});

fs.writeFileSync(path.join(process.cwd(), 'encoded.png'), encoded.data, {
  encoding: 'base64',
});
```

```ts
const encoded = await aurastamp.image.encodeLocalFile({
  model: 'the',
  message: 'winter is coming',
  imageFilePath: './tests/fixtures/img1.png',
  hiddenImageFilePath: './tests/fixtures/img2.png',
  outputPath: './tests/output/encoded.png',
});
```

### Decode an image

```ts
import { Aurastamp } from 'aurastamp';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

const aurastamp = new Aurastamp({});
const encodedImage = fs.readFileSync(encodedImageFilePath);
const contentType = mime.contentType(path.extname(encodedImageFilePath)) || undefined;
const decoded = await aurastamp.image.decode({
  model: 'the',
  image: encodedImage,
  filename: path.basename(encodedImageFilePath),
  contentType,
});

console.log(decoded.data);
```
