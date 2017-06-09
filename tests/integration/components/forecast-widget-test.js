import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import Ember from 'ember';

const { text } = PageObject;

const page = PageObject.create({
  scope: '.forecast-widget',
  date: text('.date')
});

moduleForComponent('forecast-widget', 'Integration | Component | forecast widget', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {

  let forecast = Ember.Object.create({
    dateString: 'Sat Jun 10 2017 13:00:00 GMT+0100 (IST)'
  });

  this.set('forecast', forecast);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  page.render(hbs`{{forecast-widget forecast=forecast}}`);

  assert.equal(page.date, 'Saturday 10th');
});
