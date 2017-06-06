import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/setup-mirage-for-intergration';
import Ember from 'ember';

const {
  getOwner,
  run
} = Ember;

moduleForModel('forecast', 'Unit | Model | forecast', {
  // Specify the other units that are required for this test.
  needs: [
    'adapter:forecast',
    'serializer:forecast',
  ],

  beforeEach() {
    startMirage(getOwner(this));
  },

  afterEach() {
    window.server.shutdown();
  }
});

test('it can query for forecasts', function(assert) {
  server.createList('forecast', 16,{ cityName: 'London' });

  let store = this.store();
  let done = assert.async();

  run(() =>{
    store.query('forecast', {})
    .then(forecasts =>{
      assert.equal(forecasts.get('length'), 16);

      let forecast = forecasts.get('firstObject');

      assert.equal(forecast.get('cityName'), 'London');
      done();
    }).catch(e =>{
      console.log(e);
      done();
    });
  });
});
