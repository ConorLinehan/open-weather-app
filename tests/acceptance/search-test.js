import { test } from 'qunit';
import moduleForAcceptance from 'open-weather-app/tests/helpers/module-for-acceptance';
import page from 'open-weather-app/tests/pages/search';

moduleForAcceptance('Acceptance | search');

test('it can search city and display results', function(assert) {
  server.createList('forecast', 16, { cityName: 'London'});

  page.visit();
  page.search('London');

  andThen(() =>{
    assert.equal(page.resultCity, 'London', 'displays found city name');
    assert.equal(page.results().count, 16, 'lists results');
  });
});

test('it alerts user to no results', function(assert) {
  page.visit();
  page.search('London');

  andThen(() =>{
    assert.ok(page.emptyMessage, 'shows empty message');
  });
});
