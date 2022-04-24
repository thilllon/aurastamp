import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { withSentry } from '@sentry/nextjs';
import formidable from 'formidable';
import util from 'util';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // ******************************

  // const data = await new Promise((resolve, reject) => {
  //   const form = new formidable();

  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject({ err });
  //     resolve({ err, fields, files });
  //   });
  // });
  // ******************************

  // const form = new formidable.IncomingForm();
  // // form.uploadDir = 'upload';
  // // form.keepExtensions = true;
  // // const parse = util.promisify(form.parse);
  // const fields = await parse(req);
  // console.log(fields);
  // // this.body = uploaded;
  // debugger;

  // ******************************

  const form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  return form.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      throw new Error();
    }
    console.info(fields);
    const file: formidable.File = files[0] as formidable.File;

    const formData = new FormData();
    // formData.append('file', file);
    formData.append('model_name', 'BTS');
    formData.append('text', '안녕하세요');
    const baseUrl = 'http://20.41.116.194:8000';
    const url = baseUrl + '/encode_stamp';

    return axios
      .post(url, formData)
      .then((response) => {
        console.info(response);
        debugger;
        return res.json({ status: 'ok' });
      })
      .catch((err) => {
        console.error(err);
        throw new Error('403');
      });
  });

  // const form = new formidable();
  // const results = await form.parse(req);
  // const { fields, files } = results;
  // ******************************

  // const baseUrl = 'http://20.41.116.194:8000';
  // // model_name *
  // // text *
  // // file *
  // debugger;
  // const url = baseUrl + '/encode_stamp';
  // const response = await axios.post(url, {});

  // //return the data back or just do whatever you want with it
  // res.status(200).json({
  //   status: 'ok',
  //   // data,
  // });
};

export default withSentry(handler);

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
