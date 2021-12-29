const getLocationsData = require('../utils/getLocationsData');
const Rollbar = require('rollbar');
const { rollbarOptions } = require('../utils');
const rollbar = new Rollbar(rollbarOptions());

module.exports = (request, response, next) => {
  getLocationsData()
    .then((data) => {
      request.locationData = data;
      next();
    })
    .catch((error) => {
      rollbar.critical(`locationsDataMiddleware: ${error}`, request);
    });
};
