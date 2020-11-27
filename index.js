const dataFile = "data.json";
const fs = require("fs");
const updateLocationData = require("./src/utils/updateLocationsData");
const weatherApi = require("./src/utils/getWeatherData");
const { calcThickness } = require("./src/utils/calcFreezeThaw");

const cliArgs = process.argv.slice(2);
const cmdUpdateData = cliArgs.includes("--update");
const cmdReportData = cliArgs.includes("--report");

// const reportIceThickness = (locationWeatherdata) => {
//   locationWeatherdata.forEach((location) => {
//     const { history, name } = location;
//     console.log(
//       `-- ${name}: ~${calcThickness(
//         history.map((date) => date.temp.average)
//       ).toFixed(1)}"`
//     );
//   });
// };

// const updateLocationData = async (location) => {
//   return new Promise((resolve, reject) => {
//     const { history, lat, long, name } = location;
//     const date = Date.now();
//     const stringDate = new Date(1606431600000);
//     const prettyDate = `${stringDate.getFullYear()}-${stringDate.getMonth()}-${stringDate.getDate()}`;
//     const epochDate = Math.round(stringDate.getTime() / 1000);
//     const dateFound = location.history.filter((day) => day.date === prettyDate)
//       .length;

//     if (dateFound) {
//       resolve(location);
//     }

//     weatherApi
//       .getData({ date: epochDate, lat, long })
//       .then((data) => {
//         const weatherData = data.data;
//         const currentTemp = weatherData.current.temp;
//         const hourlyTemp = weatherData.hourly.map((hour) => hour.temp);
//         const hourlTempLength = hourlyTemp.length;
//         const high = Math.max.apply(null, [...hourlyTemp]);
//         const low = Math.min.apply(null, [...hourlyTemp]);
//         const average =
//           hourlyTemp.reduce(
//             (accumulator, currentValue) => accumulator + currentValue,
//             currentTemp
//           ) / hourlTempLength;
//         const newTempData = { date: prettyDate, temp: { average, high, low } };
//         const newHistory = [...history, newTempData];

//         resolve({ history: newHistory, lat, long, name });
//       })
//       .catch((error) => {
//         // Log an error
//         reject(error);
//       });
//   });
// };

// const updateData = (locationWeatherdata) => {
//   const newlocationWeatherdata = locationWeatherdata.map((location) => {
//     return updateLocationData(location).then((a) => {
//       return a;
//       // Log an error
//     });
//   });

//   Promise.all(newlocationWeatherdata).then((newData) => {
//     fs.writeFileSync(dataFile, JSON.stringify(newData));
//   });
// };

if (cmdUpdateData) {
  updateLocationData()
    .then((data) => {
      console.log("Success: updateLocationData()");
    })
    .catch((error) => {
      console.log("Error: updateLocationData():", error);
    });
}

// fs.readFile(dataFile, (error, data) => {
//   const locationWeatherdata = JSON.parse(data);

//   if (cmdUpdateData) {
//     updateData(locationWeatherdata);
//   } else if (cmdReportData) {
//     reportIceThickness(locationWeatherdata);
//   }
// });
