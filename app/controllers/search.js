import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIME = 350;
const NUM_DAYS = 16;

const {
  computed,
  isBlank
} = Ember;

export default Ember.Controller.extend({
  cityQuery: '',
  results: [],

  searchTask: task(function *() {
    let query = this.get('cityQuery');

    if (isBlank(query)) {
      return;
    }

    yield timeout(DEBOUNCE_TIME);

    try {
      let results = yield this.get('store').query('forecast', { q: query, cnt: NUM_DAYS});
      this.set('results', results);
    } catch (e) {
      console.error(e);
      this.set('results', []);
    }
  }).restartable(),

  // CPS
  cityName: computed('results.[]', 'cityQuery', {
    get() {
      let results = this.get('results');
      if (results.get('firstObject')) {
        return results.get('firstObject.cityName');
      } else {
        return '';
      }
    }
  })
});
