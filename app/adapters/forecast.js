import DS from 'ember-data';

const API_TOKEN = 'e89c321c46110e61828a630c498b98f0';

export default DS.RESTAdapter.extend({
  host: 'http://api.openweathermap.org/data',
  namespace: '2.5',

  pathForType() {
    return 'forecast/daily';
  },

  buildURL() {
    let url = this._super(...arguments);
    return `${url}?APPID=${API_TOKEN}&units=metric`;
  }
});
