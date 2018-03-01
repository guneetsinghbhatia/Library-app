import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { match, not } from '@ember/object/computed';

export default Controller.extend({
    
    emailAddress: '',
    responseMessage: '',
    isValid: match('emailAddress', /^.+@.+\..+$/),
    isDisabled: not('isValid'),
    actualEmailAddress: computed('emailAddress', function() {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: observer('emailAddress', function() {
    console.log('observer is called', this.get('emailAddress'));
  }),
  actions: {

    saveInvitation() {
        const email = this.get('emailAddress');
        const newInvitation = this.store.createRecord('invitation', { email });
        newInvitation.save().then(response => {
            this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
            this.set('emailAddress', '');
          });
    //   alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
    //   this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
    //   this.set('emailAddress', '');
    }
  }

});
