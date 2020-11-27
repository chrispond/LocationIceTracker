require("dotenv").config();
const axios = require("axios");
const requestUrl =
  "https://api.openweathermap.org/data/2.5/onecall/timemachine";

module.exports = {
  getData: async (location) => {
    const { date, lat, long } = location;
    console.log("--- WeatheApi:", date, lat, long);
    try {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${requestUrl}?units=imperial&lat=${lat}&lon=${long}&dt=${date}&appid=${process.env.WEATHER_KEY}`
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }).then((locationData) => locationData);
    } catch (error_1) {
      // Log An Error
      process.exit(1);
    }
  },
};
