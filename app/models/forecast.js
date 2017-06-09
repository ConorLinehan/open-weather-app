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
  }).readOnly(),

  windDirectionString: computed('windDirection', {
    get() {
      let degree = this.get('windDirection');

      if (11.25 <= degree && degree < 78.75) {
        return 'North East';
      } else if (78.75 <= degree && degree < 123.75) {
        return 'East';
      } else if (123.75 <= degree && degree < 168.75) {
        return 'South East';
      } else if (168.75 <= degree && degree < 191.25) {
        return 'South';
      } else if (191.25 <= degree && degree < 258.75) {
        return 'South West';
      } else if (258.75 <= degree && degree < 303.75) {
        return  'West';
      } else if (303.75 <= degree && degree < 348.75) {
        return 'North West';
      } else {
        return 'North';
      }
    }
  }).readOnly()
});
