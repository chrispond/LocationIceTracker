// Dependancies
require("dotenv").config();
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
      locations.map((location) => {
        const { history, id, name, lat, long } = location;
        const dateStamp = parseDateData();

        getWeatherData
          .getData({ date: dateStamp.epoch, lat, long })
          .then((weatherData) => {
            const temp = parseWeatherData(weatherData);
            const successMessage = `--- SUCCESS: getWeatherData()\n------ name: ${name}\n------ dateStamp.epoch: ${dateStamp.epoch}\n\n`;
            console.log(successMessage);

            fClient
              .query(
                fQuery.Update(fQuery.Ref(fQuery.Collection("locations"), id), {
                  data: {
                    history: [
                      ...history.filter((day) => day.date !== dateStamp.pretty),
                      {
                        date: dateStamp.pretty,
                        temp,
                      },
                    ],
                  },
                })
              )
              .catch((error) => {
                const errorMessage = `--- ERROR: faunaDB.Update(collection: locations, id: ${id}):\n------ locationName: ${name}\n------ Error: ${error.message}\n\n`;
                console.error(errorMessage);
              });
          })
          .catch((error) => {
            const errorMessage = `--- ERROR: getWeatherData:\n------ locationName: ${name}\n\n`;
            console.error(errorMessage);
          });
      });
    })
    .catch((error) => {
      const errorMessage = `--- ERROR: getLocationsData:\n------ ${error}\n\n`;
      console.error(errorMessage);
    });
};
