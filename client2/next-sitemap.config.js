// https://www.npmjs.com/package/next-sitemap#configuration-options

const siteUrl = 'https://www.proved.work';

// 제출
// https://www.google.com/ping?sitemap=https://www.proved.work/sitemap.xml

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true, // create robot.txt
  exclude: ['/zzz/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/zzz' },
      { userAgent: '*', disallow: '/admin' },
      // { userAgent: 'test-bot', allow: ['/path', '/path-2'] },
      // { userAgent: 'black-listed-bot', disallow: ['/sub-path-1', '/path-2'] },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
  },
  // additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
  // alternateRefs: [
  //   {
  //     href: 'https://es.example.com',
  //     hreflang: 'es',
  //   },
  //   {
  //     href: 'https://fr.example.com',
  //     hreflang: 'fr',
  //   },
  // ],
  // // Default transformation function
  // transform: async (config, path) => {
  //   return {
  //     loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
  //     changefreq: config.changefreq,
  //     priority: config.priority,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //     alternateRefs: config.alternateRefs ?? [],
  //   };
  // },
  // additionalPaths: async (config) => {
  //   return [await config.transform(config, '/additional-page')];
  // },
  // https://www.robotstxt.org/robotstxt.html

  // additionalSitemaps: [
  //   'https://example.com/my-custom-sitemap-1.xml',
  //   'https://example.com/my-custom-sitemap-2.xml',
  //   'https://example.com/my-custom-sitemap-3.xml',
  // ],
};

module.exports = config;
