/* eslint-disable @typescript-eslint/no-var-requires */

// https://www.npmjs.com/package/next-sitemap#configuration-options

// submit manually to Google Search Console
// https://www.google.com/ping?sitemap=https://www.proved.work/sitemap.xml

const fg = require('fast-glob');
const siteUrl = 'https://www.proved.work';
const excludedPages = fg
  .sync(['pages/**/zzz/**/*.tsx', 'pages/admin/**/*.tsx'])
  .map((page) =>
    page
      .replace(/^pages/, '')
      .replace(/\.tsx$/, '')
      .replace(/\/index$/, '')
  )
  .reduce((acc, page) => {
    const locale = ['jp', 'en', 'ko'];
    return acc.concat(page, ...locale.map((loc) => '/' + loc + page));
  }, []);

console.log(excludedPages);

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true, // create robot.txt
  exclude: ['/server-sitemap.xml', ...excludedPages],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ], 
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
  },
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
};

module.exports = config;
