import React from 'react';
import Head from 'next/head';

export interface HtmlPageHeadProps {
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
}

export const HtmlPageHead = ({
  title = process.env.NEXT_PUBLIC_APP_TITLE,
  appName = 'Aura Stamp',
  generator = '',
  keywords = 'Aura Stamp',
  copyrightOwner = 'Aura Stamp',
  author = 'Aura Stamp',
  description = 'Aura Stamp',
  image = 'images/AuraStamp.png',
  creator = 'Aura Stamp',
  twitterCard = '',
  twitterSite = '@Aura Stamp',
  siteName = 'Aura Stamp',
  locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  url = 'https://carillon.ai',
  ogType = 'website',
}: HtmlPageHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel='image_src' href={image} />
      {/* ****************************** */}
      {/* standard open graph tags*/}
      {/* https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta/name */}
      {/* ****************************** */}
      {appName && <meta name='application-name' content={appName} />}
      {author && <meta name='author' content={author} />}
      {description && <meta name='description' content={description} />}
      {generator && <meta name='generator' content={generator} />}
      {keywords && <meta name='keywords' content={keywords} />}
      {copyrightOwner && <meta name='copyright' content={copyrightOwner} />}
      {/* ****************************** */}
      {/* Google */}
      {/* https://developers.google.com/search/docs/advanced/crawling/special-tags?hl=ko */}
      {/* ****************************** */}
      <meta name='google' content='notranslate' />
      {/* ****************************** */}
      {/* Twitter */}
      {/* ****************************** */}
      {title && <meta property='twitter:title' content={title} />}
      {description && <meta property='twitter:description' content={description} />}
      {image && <meta property='twitter:image' content={image} />}
      {creator && <meta property='twitter:creator' content={creator} />}
      {twitterCard && <meta property='twitter:card' content={twitterCard} />}
      {twitterSite && <meta property='twitter:site' content={twitterSite} />}
      {/* ****************************** */}
      {/* Kakao, Facebook */}
      {/* ****************************** */}
      {siteName && <meta property='og:site_name' content={siteName} />}
      {description && <meta property='og:description' content={description} />}
      {ogType && <meta property='og:type' content={ogType} />}
      {title && <meta property='og:title' content={title} />}
      {locale && <meta property='og:locale' content={locale} />}
      {image && <meta property='og:image' content={image} />}
      {url && <meta property='og:url' content={url} />}
    </Head>
  );
};
