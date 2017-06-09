import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeResponse(store, primaryClass, payload, id, requestType) {
    //
    let forecasts = payload.list.map(forecast =>{
      return {
        id: `${payload.city.name}_${forecast.dt}`,
        cityName: payload.city.name,
        date: forecast.dt,
        minTemp: forecast.temp.min,
        maxTemp: forecast.temp.max,
        description: forecast.weather[0].main,
        weatherIcon: forecast.weather[0].icon,
        windSpeed: forecast.speed,
        windDirection: forecast.deg,
        pressure: forecast.pressure,
        rain: forecast.rain
      };
    });

    let newPayload = {
      forecasts: forecasts
    };

    return this._super(store, primaryClass, newPayload, id, requestType);
  },

});
