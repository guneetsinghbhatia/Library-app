import Ember from 'ember';
import OAuth2ImplicitGrant from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
const { inject: { service } } = Ember
export default OAuth2ImplicitGrant.extend({
    okta: service(),
    async invalidate(data) {
        console.log(data);
      // Perform logout by removing tokens from the token manager and call signOut method to end the okta session.
      const {sdk} = this.get('okta');
      try {
        await sdk.signOut();
      } catch(error) {
        // Okta session has already ended
      }
  
      return new resolve(data);
    },
})