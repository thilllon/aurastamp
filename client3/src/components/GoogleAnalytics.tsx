import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

/** 
| ----------------------------------------------------------- |
|                 Default Google Analytics events             |
| ----------------------------------------------------------- |
| Event name          | Default category | Default label type |
| ------------------- | ---------------- | ------------------ |
| add_payment_info    | ecommerce        | (not set)          |
| add_to_cart         | ecommerce        | (not set)          |
| add_to_wishlist     | ecommerce        | (not set)          |
| begin_checkout      | ecommerce        | (not set)          |
| checkout_progress   | ecommerce        | (not set)          |
| purchase            | ecommerce        | (not set)          |
| refund              | ecommerce        | (not set)          |
| remove_from_cart    | ecommerce        | (not set)          |
| set_checkout_option | ecommerce        | (not set)          |
| generate_lead       | engagement       | (not set)          |
| view_item           | engagement       | (not set)          |
| view_item_list      | engagement       | (not set)          |
| view_promotion      | engagement       | (not set)          |
| search              | engagement       | search_term        |
| select_content      | engagement       | content_type       |
| login               | engagement       | method             |
| share               | engagement       | method             |
| sign_up             | engagement       | method             |
| view_search_results | engagement       | search_term        |
| ----------------------------------------------------------- |
 */

type PageviewOptions = {
  pagePath?: string;
  pageTitle?: string;
  pageLocation?: string;
  sendPageView?: boolean;
  userId?: string;
};

type PageviewOptionsGA = {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  user_id?: string;
};

type EventOptions = {
  eventCategory?: 'ecommerce' | 'engagement' | 'challenge'; // 'string' originally
  eventLabel?: string;
  value?: number;
  nonInteraction?: boolean;
  userId?: string;
};

type EventOptionsGA = {
  event_category?: string;
  event_label?: string;
  value?: number;
  non_interaction?: boolean;
  user_id?: string;
};

export const GoogleAnalyticsScript = ({
  gaMeasurementId,
  strategy = 'lazyOnload',
}: {
  gaMeasurementId?: string;
  strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive' | 'worker'; // or ScriptProps['strategy']
}) => {
  const _gaMeasurementId = gaMeasurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!_gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${_gaMeasurementId}`}
        strategy={strategy}
      />
      <Script id='google-analytics' strategy={strategy}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);};gtag("js",new Date());gtag("config","${_gaMeasurementId}",{page_path:window.location.pathname});`}
      </Script>
    </>
  );
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (
  { pagePath, pageTitle, pageLocation, sendPageView = true, userId }: PageviewOptions = {},
  gaMeasurementId?: string
) => {
  const _gaMeasurementId = gaMeasurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!_gaMeasurementId || !window.gtag) {
    return;
  }

  const _options: PageviewOptionsGA = {};
  _options.page_path = pagePath ?? window.location.pathname;
  _options.page_title = pageTitle ?? window.document.title;
  _options.page_location = pageLocation ?? window.location.href;
  _options.send_page_view = sendPageView ?? true;
  if (userId) {
    _options.user_id = userId;
  }
  window.gtag('config', _gaMeasurementId, _options);
};

/**
 * @type EventNames action
 * @param {number} value must be a positive integer
 * @param {boolean} nonInteraction `true` if non interactive event (not triggered by a human)
 * @param {string} [gaMeasurementId]
 * @returns
 */
export const gaEvent = (
  action: EventNames, // NOTE: add custom types for custom events
  { eventCategory, eventLabel, value, nonInteraction = false, userId }: EventOptions = {},
  gaMeasurementId?: string
) => {
  const _gaMeasurementId = gaMeasurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!_gaMeasurementId || !window.gtag) {
    return;
  }

  const _options: EventOptionsGA = {};
  _options.event_category = eventCategory ?? 'engagement';
  if (eventLabel) {
    _options.event_label = eventLabel;
  }
  if (typeof value === 'number') {
    if (value >= 0) {
      _options.value = value;
    } else {
      throw new Error('GA: value must be a positive integer');
    }
  }
  if (userId) {
    _options.user_id = userId;
  }
  _options.non_interaction = nonInteraction ?? false;
  window.gtag('event', action, _options);
};

export const useGoogleAnalytics = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview({ pagePath: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

// --------------------------------
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gtag.js/index.d.ts
// --------------------------------

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    }
  }

  interface Window {
    gtag: Gtag;
  }
}

interface Gtag {
  (
    command: 'config',
    targetId: string,
    config?: ControlParams | EventParams | ConfigParams | CustomParams
  ): void;
  (command: 'set', targetId: string, config: CustomParams | boolean | string): void;
  (command: 'set', config: CustomParams): void;
  (command: 'js', config: Date): void;
  (
    command: 'event',
    eventName: EventNames | string,
    eventParams?: ControlParams | EventParams | CustomParams
  ): void;
  (
    command: 'get',
    targetId: string,
    fieldName: FieldNames | string,
    callback?: (field: string | CustomParams | undefined) => any
  ): void;
  (command: 'consent', consentArg: ConsentArg | string, consentParams: ConsentParams): void;
}

interface ConfigParams {
  page_title?: string | undefined;
  page_location?: string | undefined;
  page_path?: string | undefined;
  send_page_view?: boolean | undefined;
}

interface CustomParams {
  [key: string]: any;
}

interface ControlParams {
  groups?: string | string[] | undefined;
  send_to?: string | string[] | undefined;
  event_callback?: (() => void) | undefined;
  event_timeout?: number | undefined;
}

type EventNames =
  | 'add_payment_info'
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'begin_checkout'
  | 'checkout_progress'
  | 'exception'
  | 'generate_lead'
  | 'login'
  | 'page_view'
  | 'purchase'
  | 'refund'
  | 'remove_from_cart'
  | 'screen_view'
  | 'search'
  | 'select_content'
  | 'set_checkout_option'
  | 'share'
  | 'sign_up'
  | 'timing_complete'
  | 'view_item'
  | 'view_item_list'
  | 'view_promotion'
  | 'view_search_results'
  // --------------------------------
  // Custom events
  // --------------------------------
  | 'logout'
  | 'submit_challenge';

interface EventParams {
  checkout_option?: string | undefined;
  checkout_step?: number | undefined;
  content_id?: string | undefined;
  content_type?: string | undefined;
  coupon?: string | undefined;
  currency?: string | undefined;
  description?: string | undefined;
  fatal?: boolean | undefined;
  items?: Item[] | undefined;
  method?: string | undefined;
  number?: string | undefined;
  promotions?: Promotion[] | undefined;
  screen_name?: string | undefined;
  search_term?: string | undefined;
  shipping?: Currency | undefined;
  tax?: Currency | undefined;
  transaction_id?: string | undefined;
  value?: number | undefined;
  event_label?: string | undefined;
  event_category?: string | undefined;
}

type Currency = string | number;

interface Item {
  brand?: string | undefined;
  category?: string | undefined;
  creative_name?: string | undefined;
  creative_slot?: string | undefined;
  id?: string | undefined;
  location_id?: string | undefined;
  name?: string | undefined;
  price?: Currency | undefined;
  quantity?: number | undefined;
}

interface Promotion {
  creative_name?: string | undefined;
  creative_slot?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
}

type FieldNames = 'client_id' | 'session_id' | 'gclid';

type ConsentArg = 'default' | 'update';
interface ConsentParams {
  ad_storage?: 'granted' | 'denied' | undefined;
  analytics_storage?: 'granted' | 'denied' | undefined;
  wait_for_update?: number | undefined;
  region?: string[] | undefined;
}
