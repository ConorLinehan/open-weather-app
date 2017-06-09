import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import Ember from 'ember';

const {
  run,
  RSVP
} = Ember;

moduleFor('controller:search', 'Unit | Controller | search', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('searchTask - success', function(assert) {
  assert.expect(2);
  let done = assert.async();

  let store = {query(){}};
  let fakeResult = [{}, {}, {}];
  let queryStub = this.stub(store, 'query').returns(RSVP.Promise.resolve(fakeResult));

  let controller = this.subject({ cityQuery: 'myQuery', store: store });

  run(() =>{
    controller.get('searchTask').perform()
    .then(() =>{
      assert.deepEqual(controller.get('results'), fakeResult, 'set results');
      assert.ok(queryStub.firstCall.calledWithExactly('forecast', {
        q: 'myQuery', cnt: 16
      }), 'passed in correct queries');
      done();
    })
    .catch(() =>{
      done();
    });
  });
});

test('searchTask - fail', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let store = {query(){}};
  this.stub(store, 'query').returns(RSVP.Promise.reject());

  let controller = this.subject({ results: [{}], cityQuery: 'myQuery', store: store});

  run(() =>{
    controller.get('searchTask').perform()
    .then(() =>{
      assert.deepEqual(controller.get('results'), [], 'resets results');
      done();
    })
    .catch(() =>{
      done();
    });
  });
});

test('searchTask - blank query', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let store = {query(){}};
  let queryStub = this.stub(store, 'query');

  let controller = this.subject({cityQuery: '', store: store});

  run(() =>{
    controller.get('searchTask').perform()
    .then(() =>{
      assert.equal(queryStub.callCount, 0, 'doesn\'t call query');
      done();
    })
    .catch(() =>{
      done();
    });
  });
});

test('cp cityName', function(assert) {
  let controller = this.subject({ cityQuery: '', results: []});

  assert.equal(controller.get('cityName'), '');

  controller.set('results', [{
    cityName: 'testName'
  }]);

  assert.equal(controller.get('cityName'), 'testName');
});
