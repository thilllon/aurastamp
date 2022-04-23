/* eslint-disable @typescript-eslint/no-var-requires */

// Requires `https` server to test cookies with `secure` option enabled on localhost
// https://dev-jelly.netlify.app/posts/Apply%20Https%20on%20next.js%20when%20development
// https://nextjs.org/docs/advanced-features/custom-server

const { createServer: createServerHttps } = require('https');
const { createServer: createServerHttp } = require('http');
const url = require('url');
const next = require('next');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const app = next({ dev: !isProduction });
const handle = app.getRequestHandler();

const ports = {
  http: 3333,
  https: 3334,
};

const httpsOptions = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt'),
};

app.prepare().then(() => {
  createServerHttp((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(ports.http, (err) => {
    if (err) throw err;
    console.log(`>> HTTP: Ready on http://localhost:${ports.http}`);
  });

  createServerHttps(httpsOptions, (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(ports.https, (err) => {
    if (err) throw err;
    console.log(`>> HTTPS: Ready on https://localhost:${ports.https}`);
  });
});
