require("dotenv").config();
const axios = require("axios");
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
          const errorMessage = `--- getWeatherData: Error\n------ postRequestUrl: ${postRequestUrl}\n------ Error: ${error.response.data.message}\n\n`;
          reject(errorMessage);
        });
    }).then((locationData) => locationData);
  },
};
