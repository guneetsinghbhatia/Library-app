import Ember from 'ember';
import OAuth2ImplicitGrantCallbackRouteMixin from 'ember-simple-auth/mixins/oauth2-implicit-grant-callback-route-mixin';

const {inject: {service}} = Ember;

/**
 * User is directed here after successful Okta authorization with their access or id token in the URL
 * ember-simple-auth automatically parses the token using the mixing below
 * http://ember-simple-auth.com/api/classes/OAuth2ImplicitGrantAuthenticator.html
 */
export default Ember.Route.extend(OAuth2ImplicitGrantCallbackRouteMixin, {
  okta: service(),
  authenticator: 'authenticator:oauth2-implicit-grant',
  handleError: Ember.observer('error', async function() {
      console.log(this.get('error'));
    // Something went wrong even though the user is authorized (user likely does not have access to application)
    console.log("callback.js");
    const {sdk} = this.get('okta');
    await sdk.signOut();

    this.transitionTo(`/login`);
  }),
});
