'use strict';

module.exports = {
  app: {
    title: 'Lean MEAN Web App Machine',
  },
  port: process.env.PORT || 3000,
  // SessionSecret should be changed for security measures and concerns
  sessionSecret: process.env.SESSION_SECRET || 'MEAN',
  // SessionKey is the cookie session name
  sessionKey: 'sessionId',
  // Session Cookie settings
  sessionCookie: {
    // Session expiration is set by default to 24 hours
    // expressed as a calculation to convert it milliseconds
    maxAge: 24 * (60 * 60 * 1000),
    // HttpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // Secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false,
  },
  // Value for the collection setting our connect-mongo MongoDB session store
  sessionCollection: 'sessions',
  // Lusca config
  lusca: {
    csrf: false,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    xssProtection: true
  },
};
