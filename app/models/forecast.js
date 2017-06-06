import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  cityName: attr('string'),
  date: attr('number'),
  minTemp: attr('number'),
  maxTemp: attr('number'),
  description: attr('string'),
  windSpeed: attr('number'),
  windDirection: attr('number'),
  pressure: attr('number'),
  rain: attr('number')
});
