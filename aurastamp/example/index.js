const FormData = require('form-data');
const { Aurastamp } = require('aurastamp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const mime = require('mime-types');

const aurastamp = new Aurastamp({});

const imageFilePath = './img1.png';
const formData = new FormData();
const imageData = fs.readFileSync(imageFilePath);
const contentType = mime.contentType(path.extname(imageFilePath)) || undefined;
formData.append('file', imageData, { filename: path.basename(imageFilePath), contentType });
formData.append('model_name', 'the');
formData.append('text', 'Hello world!');
// formData.append('return_type', 'base64');

axios
  .post('https://api.aurastamp.com/encode', formData, {
    headers: {
      ...formData.getHeaders(),
      // responseType: 'arraybuffer',
      responseType: 'text',
      responseEncoding: 'base64',
    },
  })
  .then((res) => {
    console.log(res.status);
    fs.writeFileSync('./encoded.png', res.data, { encoding: 'base64' });
  });
