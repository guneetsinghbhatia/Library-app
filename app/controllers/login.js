import Controller from '@ember/controller';
const {inject: {service}} = Ember;

export default Controller.extend({
    okta: service(),
    actions: {
        submit() {
    const okta = this.get('okta');
console.log("test");
    return okta.authenticate({

      identification: this.get('identification'),
      password: this.get('password')
    });
}
    }
});
