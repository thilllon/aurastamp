import Head from 'next/head';

export type HeadMetaTagsProps = {
  title?: string;
  appName?: string;
  generator?: string;
  keywords?: string;
  copyrightOwner?: string;
  author?: string;
  description?: string;
  image?: string;
  creator?: string;
  twitterCard?: string;
  twitterSite?: string;
  locale?: string;
  url?: string;
  ogType?: string;
  siteName?: string;
};

export const HeadMetaTags = ({
  title = 'Proved',
  appName = 'Proved',
  generator,
  keywords = 'proved,proved.work',
  copyrightOwner = 'Carillon',
  author = 'Proved',
  description = '코딩 테스트, 프로그래머 채용, 개발자 채용',
  image = 'https://www.proved.work/static/proved.png',
  creator = 'Carillon',
  twitterCard,
  twitterSite,
  siteName = 'Proved',
  locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  url = 'https://www.proved.work',
  ogType = 'website',
}: HeadMetaTagsProps) => {
  return (
    <Head>
      {/* -------------------------------- */}
      {/* standard open graph tags*/}
      {/* https://ogp.me/ */}
      {/* https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta/name */}
      {/* -------------------------------- */}
      {appName && <meta name='application-name' content={appName} />}
      {author && <meta name='author' content={author} />}
      {description && <meta name='description' content={description} />}
      {generator && <meta name='generator' content={generator} />}
      {keywords && <meta name='keywords' content={keywords} />}
      {copyrightOwner && <meta name='copyright' content={copyrightOwner} />}
      {/* -------------------------------- */}
      {/* Twitter */}
      {/* -------------------------------- */}
      {title && <meta property='twitter:title' content={title} />}
      {description && <meta property='twitter:description' content={description} />}
      {image && <meta property='twitter:image' content={image} />}
      {creator && <meta property='twitter:creator' content={creator} />}
      {twitterCard && <meta property='twitter:card' content={twitterCard} />}
      {twitterSite && <meta property='twitter:site' content={twitterSite} />}
      {/* -------------------------------- */}
      {/* Kakao, Facebook */}
      {/* -------------------------------- */}
      {siteName && <meta property='og:site_name' content={siteName} />}
      {description && <meta property='og:description' content={description} />}
      {ogType && <meta property='og:type' content={ogType} />}
      {title && <meta property='og:title' content={title} />}
      {locale && <meta property='og:locale' content={locale} />}
      {image && <meta property='og:image' content={image} />}
      {url && <meta property='og:url' content={url} />}
      {/* -------------------------------- */}
      {title && <title>{title}</title>}
      <link rel='image_src' href={image} />
    </Head>
  );
};
