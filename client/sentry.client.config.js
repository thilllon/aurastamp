import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Set user information, as well as tags and further extras
Sentry.configureScope((scope) => {
  // scope.setExtra('battery', 0.7);
  // scope.setTag('user_mode', 'admin');
  // scope.setUser({ id: '4711' });
  // scope.clear();
});

// Add a breadcrumb for future events
// Sentry.addBreadcrumb({
//   message: 'My Breadcrumb',
//   // ...
// });

// Capture exceptions, messages or manual events
// Sentry.captureMessage('Hello, world!');
// Sentry.captureException(new Error('Good bye'));
// Sentry.captureEvent({
//   message: 'Manual',
//   stacktrace: [
//     // ...
//   ],
// });
