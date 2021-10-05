const getLocationsData = require('../utils/getLocationsData');

module.exports = (request, response, next) => {
  getLocationsData()
    .then((data) => {
      request.locationData = data;
      next();
    })
    .catch((error) => {
      next(`locationsDataMiddleware: ${error}`);
    });
};
