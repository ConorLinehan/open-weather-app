import Response from 'ember-cli-mirage/response';

export default function() {


 this.urlPrefix = 'api.openweathermap.org/data/';
 this.namespace = '/2.5';

 this.get('/forecast/daily', ({ db }) =>{
   // Grab forecasts
   let forecasts = db.forecasts;
   if (forecasts.length === 0) {
     return new Response(401);
   }
   let list = forecasts.map(forecast =>{
     return {
       dt: forecast.date,
       temp: {
         min: forecast.minTemp,
         max: forecast.maxTemp
       },
       weather: [{ main: forecast.description }],
       pressure: forecast.pressure,
       rain: forecast.rain
     };
   });

   return {
     city: {
       name: forecasts[0].cityName
     },
     list: list
   };
 });
}
