import { NextWebVitalsMetric } from 'next/app';

const sendMetric = (metric: Record<any, any>) => {
  const url = ''; // google analytics end point

  const body = JSON.stringify(metric);

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }

  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  window.gtag('event', metric.name, {
    event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
    event_label: metric.id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

export const createReportWebVitals = (isProduction: boolean) => (metric: NextWebVitalsMetric) => {
  // id, name, startTime, value, label(`web-vital` or `custom`)
  // https://nextjs.org/docs/advanced-features/measuring-performance

  if (isProduction) {
    return;
  }

  switch (metric.name) {
    case 'FCP':
      // handle FCP results
      break;
    case 'LCP':
      // handle LCP results
      break;
    case 'CLS':
      // handle CLS results
      break;
    case 'FID':
      // handle FID results
      break;
    case 'TTFB':
      // handle TTFB results
      break;
    case 'Next.js-hydration':
      // handle hydration results
      break;
    case 'Next.js-route-change-to-render':
      // handle route-change to render results
      break;
    case 'Next.js-render':
      // handle render results
      break;
    default:
      break;
  }

  // sendMetric(metric);
};
