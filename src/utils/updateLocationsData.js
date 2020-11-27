// Dependancies
const fauna = require("faunadb");
const getLocationsData = require("./getLocationsData");
const parseWeatherData = require("./parseWeatherData");
const parseDateData = require("./parseDateData");
const getWeatherData = require("./getWeatherData");

const fQuery = fauna.query;
const fClient = new fauna.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

module.exports = async () => {
  getLocationsData()
    .then((locations) => {
      locations.forEach((location) => {
        const { history, id, name, lat, long } = location;
        const dateStamp = parseDateData();

        getWeatherData
          .getData({ date: dateStamp.epoch, lat, long })
          .then((weatherData) => {
            const temp = parseWeatherData(weatherData);

            fClient
              .query(
                fQuery.Update(fQuery.Ref(fQuery.Collection("locations"), id), {
                  data: {
                    history: [
                      ...history,
                      {
                        date: dateStamp.pretty,
                        temp,
                      },
                    ],
                  },
                })
              )
              .catch((error) => {
                // TODO: Need to track if this fails
                console.error(
                  `Error:updateLocationsData()getLocationsData(): FaunaDB udpate ${name}):`,
                  error
                );
              });
          })
          .catch((error) => {
            // TODO: Need to track if this fails
            console.error(
              `Error:updateLocationsData()getLocationsData(): getWeatherData:`,
              error
            );
          });
      });
    })
    .catch((error) => {
      console.error(`Error:updateLocationsData()getLocationsData():`, error);
    });
};
