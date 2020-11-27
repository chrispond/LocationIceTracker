// Dependancies
require("dotenv").config();
const fauna = require("faunadb");

const fQuery = fauna.query;
const fClient = new fauna.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

module.exports = async () => {
  const locations = await fClient
    .query(
      fQuery.Map(
        fQuery.Paginate(fQuery.Documents(fQuery.Collection("locations"))),
        fQuery.Lambda((x) => fQuery.Get(x))
      )
    )
    .catch((error) => {
      // TODO: Need to track if this fails
      console.error(`Error:getLocationsData():`, error);
    });

  return locations.data.map((location) => {
    return { ...location.data, id: location.ref.id };
  });
};
