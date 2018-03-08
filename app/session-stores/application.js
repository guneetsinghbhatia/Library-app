import CookieStore from 'ember-simple-auth/session-stores/cookie';

// Store ESA information in a cookie to match Okta session cookie behavior
export default CookieStore.extend();