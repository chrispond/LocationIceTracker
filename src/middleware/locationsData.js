const getLocationsData = require("../utils/getLocationsData");

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

// const locationMiddleware = (request, response, next) => {
//   const locationData = async () => {
//     const locations = await fClient.query(
//       fQuery.Map(
//         fQuery.Paginate(fQuery.Documents(fQuery.Collection("locations"))),
//         fQuery.Lambda((x) => fQuery.Get(x))
//       )
//     );

//     return locations.data.map((location) => {
//       return { ...location.data, id: location.ref.id };
//     });
//   };

//   locationData()
//     .then((data) => {
//       request.locationData = data;
//       next();
//     })
//     .catch((error) => {
//       next(error.message);
//     });
// };
