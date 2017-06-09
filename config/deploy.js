module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'open-weather-app',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
