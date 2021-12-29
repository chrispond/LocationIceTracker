const { calcFreeze, calcThaw, calcThickness, isFreezing } = require('../calcFreezeThaw/calcFreezeThaw');
const getNumberOrdinal = require('./getNumberOrdinal/getNumberOrdinal');
const getStringDay = require('./getStringDay/getStringDay');
const getStringMonth = require('./getStringMonth/getStringMonth');

module.exports = {
  currentYear: new Date().getFullYear().toString(10),
  environment: process.env.NODE_ENV,
  iceFreeze: (temp) => calcFreeze(temp).toFixed(1),
  iceThaw: (temp) => calcThaw(temp).toFixed(1),
  iceThickness: (tempData, freezeOffset = 0) => {
    const thickness = (calcThickness([...tempData])).toFixed(1);
    return thickness > 0 ? thickness : 0;
  },
  isFreezing: (temp) => isFreezing(temp),
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
