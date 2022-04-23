// NOTE: This file must be separate from the next.config.js file.
// https://github.com/isaachinman/next-i18next
// https://nextjs.org/docs/advanced-features/i18n-routing

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports.i18n = {
  locales: ['ko', 'en'],
  defaultLocale: 'en',
  // localePath: path.resolve('./my/custom/path'),
  localeDetection: false,
};
