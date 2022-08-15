import fs from 'fs';
import path from 'path';

const root = process.cwd();

const terms = fs.readFileSync(path.join(root, 'public/legal/terms.md'), 'utf8');
const privacy = fs.readFileSync(path.join(root, 'public/legal/privacy.md'), 'utf8');
const adulthood = fs.readFileSync(path.join(root, 'public/legal/adulthood.md'), 'utf8');
const marketing = fs.readFileSync(path.join(root, 'public/legal/marketing.md'), 'utf8');
const honorcode = fs.readFileSync(path.join(root, 'public/legal/honorcode.md'), 'utf8');

export const legalDataSync = {
  terms,
  privacy,
  adulthood,
  marketing,
  honorcode,
};

const termsMdx = fs.readFileSync(path.join(root, 'public/legal/terms.mdx'), 'utf8');
const privacyMdx = fs.readFileSync(path.join(root, 'public/legal/privacy.mdx'), 'utf8');
const adulthoodMdx = fs.readFileSync(path.join(root, 'public/legal/adulthood.mdx'), 'utf8');
const marketingMdx = fs.readFileSync(path.join(root, 'public/legal/marketing.mdx'), 'utf8');
const honorcodeMdx = fs.readFileSync(path.join(root, 'public/legal/honorcode.mdx'), 'utf8');

export const legalDataMdx = {
  termsMdx,
  privacyMdx,
  adulthoodMdx,
  marketingMdx,
  honorcodeMdx,
};
