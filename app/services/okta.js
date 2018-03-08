import Service from '@ember/service';
import Ember from "ember";
import OktaAuth from 'npm:@okta/okta-auth-js';
import ENV from "../config/environment";
const { RSVP: { Promise }, run } = Ember;

export default Service.extend({
    init() {
        this._super(...arguments);
        const rootUrl = `${location.protocol}//${location.host}`;
        const { authnEndpoint, clientId, serverTokenEndpoint } =
          ENV["token-auth"] || {};
        const oktaClient = new OktaAuth({
          // Org URL
          url: authnEndpoint,
          // OpenID Connect APP Client ID
          clientId: clientId,
          // Custom Auth Server Issuer
          issuer: serverTokenEndpoint,
          // Trusted Origin Redirect URI
          redirectUri: `${rootUrl}/callback`
        });
        this.set("sdk", oktaClient);
        this.set("authenticate", this.authenticate)
      },
      authenticate(credentials) {
        const authClient = this.get("sdk");
    
        return new Promise((resolve, reject) => {
          // Call okta signIn method to authenticate usernamd and password, and get session token.
          authClient
            .signIn({
              username: credentials.identification,
              password: credentials.password
            })
            .then(transaction => {
              run(() => {
                if (transaction.status === "SUCCESS") {
                  this.getTokens(transaction.sessionToken);
                } else {
                  return reject(transaction);
                }
              });
            })
            .catch(function(err) {
              const error = {
                errors: [
                  {
                    meta: {
                      message: err.errorSummary,
                      key: "password"
                    }
                  }
                ]
              };
              return reject(error);
            });
        }, "Okta Authenticator | authenticate");
      },
      getTokens(sessionToken) {
        const authClient = this.get("sdk");
        const parameters = {
          responseType: 'token',
          scopes: ["openid", "email", "profile"],
          sessionToken: sessionToken
        };
        // redirect the user to Okta to receive a session cookie
        // user is returned to /callback where the implicit authenticator takes over
        return authClient.token.getWithRedirect(parameters);
      },
});
