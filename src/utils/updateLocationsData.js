// Dependancies
require('dotenv').config();
const fauna = require('faunadb');
const getLocationsData = require('./getLocationsData');
const getWeatherData = require('./getWeatherData');
const parseWeatherData = require('./parseWeatherData');
const parseDateData = require('./parseDateData');
const Rollbar = require('rollbar');
const { rollbarOptions } = require('./index');
const rollbar = new Rollbar(rollbarOptions());

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
            const parsedLocationData = parseWeatherData(weatherData);
            const successMessage = `--- SUCCESS: getWeatherData()\n------ name: ${name}\n------ dateStamp.epoch: ${dateStamp.epoch}\n\n`;
            rollbar.info(successMessage);

            fClient
              .query(
                fQuery.Update(fQuery.Ref(fQuery.Collection('locations'), id), {
                  data: {
                    history: [
                      ...history.filter(
                        (day) => day.date !== dateStamp.formatted
                      ),
                      {
                        date: dateStamp.formatted,
                        pressure: parsedLocationData.pressure,
                        temp: parsedLocationData.temp,
                        wind: parsedLocationData.wind
                      },
                    ],
                  },
                })
              )
              .catch((error) => {
                rollbar.configure({payload: {dataTableId: id, LocationnName: name}})
                rollbar.error(`updateLocationsData: Attempt to query faunadb: ${error}`);
              });
          })
          .catch((error) => {
            rollbar.configure({payload: {LocationnName: name}})
            rollbar.error(`updateLocationsData: Attempt to getWeatherData ${error}`);
          });
      });
    });
};
