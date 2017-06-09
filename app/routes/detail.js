import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('forecast', params.id);
  },

  afterModel(model) {
    if (model == null) {
      this.transitionTo('search');
    }
  }
});
