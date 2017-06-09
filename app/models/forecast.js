import DS from 'ember-data';
import Ember from 'ember';

const {
  attr
} = DS;

const {
  computed
} = Ember;

const IMAGE_URL = 'http://openweathermap.org/img/w';

export default DS.Model.extend({
  cityName: attr('string'),
  date: attr('number'),
  minTemp: attr('number'),
  maxTemp: attr('number'),
  description: attr('string'),
  weatherIcon: attr('string'),
  windSpeed: attr('number'),
  windDirection: attr('number'),
  pressure: attr('number'),
  rain: attr('number'),

  // CPS
  dateString: computed('date', {
    get() {
      let timestamp = this.get('date');
      return new Date(timestamp * 1000);
    }
  }).readOnly(),

  imagePath: computed('weatherIcon', {
    get() {
      let icon = this.get('weatherIcon');
      return `${IMAGE_URL}/${icon}.png`;
    }
  }).readOnly()
});
