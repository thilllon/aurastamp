import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

/**
 * Default Google Analytics Events
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events#default_google_analytics_events
 *
 * | Event name          | Default category | Default label type |
 * | ------------------- | ---------------- | ------------------ |
 * | add_payment_info    |                  | ecommerce          |
 * | add_to_cart         |                  | ecommerce          |
 * | add_to_wishlist     |                  | ecommerce          |
 * | begin_checkout      |                  | ecommerce          |
 * | checkout_progress   |                  | ecommerce          |
 * | generate_lead       |                  | engagement         |
 * | login               | engagement       | method             |
 * | purchase            |                  | ecommerce          |
 * | refund              |                  | ecommerce          |
 * | remove_from_cart    |                  | ecommerce          |
 * | search              | engagement       | search_term        |
 * | select_content      | engagement       | content_type       |
 * | set_checkout_option |                  | ecommerce          |
 * | share               | engagement       | method             |
 * | sign_up             | engagement       | method             |
 * | view_item           |                  | engagement         |
 * | view_item_list      |                  | engagement         |
 * | view_promotion      |                  | engagement         |
 * | view_search_results | engagement       | search_term        |
 */

const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

declare global {
  type EventProps = {
    // action: string;
    category?: string;
    label: string;
    value: number;
  };

  type GtagEvent = {
    event_category?: string;
    event_label?: string;
    value?: number;
    page_path?: string;
    non_interaction?: boolean;
    event_callback?: () => void;
  };

  interface Window {
    gtag: (name: string, action: string, event: GtagEvent) => void;
  }
}

export const sendUrl = (url: string) => {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  window?.gtag?.('config', gaId, { page_path: url });
};
export const sendEvent = (
  action: string,
  { category = 'general', label, value = 0 }: EventProps
) => {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  window?.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
export const sendLoginEvent = (value: number) => {
  sendEvent('login', { category: 'engagement', label: 'method', value });
};
export const eventSearchEvent = (value: number) => {
  sendEvent('search', { category: 'engagement', label: 'search_term', value });
};
export const sendSignupEvent = (value: number) => {
  sendEvent('sign_up', { category: 'engagement', label: 'method', value });
};
export const sendSelectContentEvent = (value: number) => {
  sendEvent('select_content', { category: 'engagement', label: 'content_type', value });
};

type UseGoogleAnalyticsProps = {
  onRouteChangeComplete?: (url: string) => {};
  onRouteChangeError?: (url: string) => {};
  onHashChangeComplete?: (url: string) => {};
};
export const useGoogleAnalytics = ({
  onRouteChangeComplete,
  onRouteChangeError,
  onHashChangeComplete,
}: UseGoogleAnalyticsProps = {}) => {
  const router = useRouter();

  // routeChangeStart / beforeHistoryChange / routeChangeComplete / routeChangeError / hashChangeStart / hashChangeComplete
  const routeChangeComplete = useCallback(
    (url: string) => {
      sendUrl(url);
      onRouteChangeComplete?.(url);
    },
    [onRouteChangeComplete]
  );
  const routeChangeError = useCallback(
    (url: string) => {
      sendUrl(url);
      onRouteChangeError?.(url);
    },
    [onRouteChangeError]
  );
  const hashChangeComplete = useCallback(
    (url: string) => {
      sendUrl(url);
      onHashChangeComplete?.(url);
    },
    [onHashChangeComplete]
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeError);
    router.events.on('hashChangeComplete', hashChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeError);
      router.events.off('hashChangeComplete', hashChangeComplete);
    };
  }, [router.events, routeChangeComplete, routeChangeError, hashChangeComplete]);

  return {
    routeChangeComplete,
    routeChangeError,
    hashChangeComplete,
  };
};

// eslint-disable-next-line react/display-name
export const GoogleAnalysisScript = React.memo(() => {
  if (!gaId) {
    return null;
  }

  const __html = [
    `window.dataLayer = window.dataLayer || [];`,
    `function gtag(){dataLayer.push(arguments);}`,
    `gtag('js', new Date());`,
    `gtag('config', '${gaId}', { page_path: window.location.pathname });`,
  ].join('');

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script dangerouslySetInnerHTML={{ __html }} />
    </>
  );
});
