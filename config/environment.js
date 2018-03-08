'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'library-app',
    environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: 'AIzaSyDnNOAKJRtJZg6X_IeGv3ppVYKGMnfCEU8',
      authDomain: 'library-app-e94c4.firebaseapp.com',
      databaseURL: 'https://library-app-e94c4.firebaseio.com',
      projectId: 'library-app-e94c4',
      storageBucket: 'library-app-e94c4.appspot.com',
      messagingSenderId: '45771328891'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      routeAfterAuthentication: 'authors'
    },
    'token-auth': {
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'accessToken',
      refreshTokenPropertyName: 'refreshToken',
      refreshLeeway: 300, // Refresh the token 5 minutes (300s) before it expires.
      authnEndpoint: process.env.OKTA_URL || 'https://ps-siemens.oktapreview.com',
      serverTokenEndpoint: process.env.OKTA_ISSUER_URL || 'https://ps-siemens.oktapreview.com/oauth2/auscq6xi1voHgyGAI0h7',
      clientId: process.env.OKTA_APPLICATION_ID || '0oadrw76rv2DOzVsS0h7'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['ember-faker'] = {
      enabled: true
    };
  }

  return ENV;
};
