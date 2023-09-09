/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
  future: {
    v2_routeConvention: true,
    v2_meta: true,
  },
  tailwind: true,
  postcss: true,
};
