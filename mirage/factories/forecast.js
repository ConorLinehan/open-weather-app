import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  cityName: '',
  date() {
    let dateString = faker.date.future();
    return Math.floor(new Date(dateString).getTime() / 1000);
  },
  minTemp: 10,
  maxTemp: 20,
  description: 'Hot',
  windSpeed: 30,
  pressure: 1000,
  precipitation: 2
});
