import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const {inject: {service}} = Ember;

export default Route.extend(UnauthenticatedRouteMixin,{
    routeIfAlreadyAuthenticated: 'authors',
    okta: service(),
    setupController(controller, model){
        this._super(controller, model);
    },
    model() {
        //return LoginData.create({ okta: this.get('okta'), session: this.get('session') });
      },
    
      async afterModel() {
        this._super();
        if (!this.get('session.isAuthenticated')) {
            console.log("authenticated");
          const {sdk} = this.get('okta');
          const sessionExists = await sdk.session.exists();
    
          if (sessionExists) {
            // User has an active Okta session, redirect them to Okta to receive an access token.
            // They will be returned to /callback and have a valid application session.
            sdk.token.getWithRedirect({
              responseType: 'token',
              scopes: ['openid', 'address', 'email', 'phone', 'profile'],
            });
          }
        }
      },
});
