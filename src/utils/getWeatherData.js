require("dotenv").config();
const axios = require("axios");
const Rollbar = require('rollbar');
const { rollbarOptions } = require('./index');
const rollbar = new Rollbar(rollbarOptions());
const requestUrl =
  "https://api.openweathermap.org/data/2.5/onecall/timemachine";

module.exports = {
  getData: async (location) => {
    const { date, lat, long } = location;
    const postRequestUrl = `${requestUrl}?units=imperial&lat=${lat}&lon=${long}&dt=${date}&appid=${process.env.WEATHER_KEY}`;

    return new Promise((resolve, reject) => {
      axios
        .post(postRequestUrl)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          rollbar.configure({payload: {location, postRequestUrl}})
          rollbar.error(`getWeatherData.getData:  ${error}`);
          const errorMessage = `getWeatherData.getData: ${error.response.data.message}`;
          reject(errorMessage);
        });
    }).then((locationData) => locationData);
  },
};
