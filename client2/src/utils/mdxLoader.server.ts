import path from 'path';
import fs from 'fs';

export const loadMdx = (fileName: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const postFilePath = path.join(process.cwd(), 'public', fileName);
    fs.readFile(postFilePath, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
