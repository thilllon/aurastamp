import createCache from '@emotion/cache';
const isProduction = process.env.NODE_ENV === 'production';
export const createEmotionCache = () =>
  createCache({ key: isProduction ? 'carillon' : 'carillon-dev' });
