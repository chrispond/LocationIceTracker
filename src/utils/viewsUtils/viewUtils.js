const { calcFreeze, calcThaw, calcThickness } = require('../calcFreezeThaw');
const getNumberOrdinal = require('./getNumberOrdinal/getNumberOrdinal');
const getStringDay = require('./getStringDay/getStringDay');
const getStringMonth = require('./getStringMonth/getStringMonth');

module.exports = {
  iceFreeze: (temp) => calcFreeze(temp).toFixed(1),
  iceThaw: (temp) => calcThaw(temp).toFixed(1),
  iceThickness: (tempData, freezeOffset = 0) =>
    (calcThickness([...tempData]) - freezeOffset).toFixed(1),
  currentYear: new Date().getFullYear().toString(10),
  prettyDate: (date) => {
    const dateObject = new Date(date);

    return {
      date: getNumberOrdinal(dateObject.getDate()),
      day: getStringDay(dateObject.getDay()),
      month: getStringMonth(dateObject.getMonth()),
      year: dateObject.getFullYear().toString(10),
    };
  },
};
