const { calcFreeze, calcThaw, calcThickness } = require("./calcFreezeThaw");

const getNumberOrdinal = (day) => {
  return (
    day +
    (day > 0
      ? ["th", "st", "nd", "rd"][
          (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10
        ]
      : "")
  );
};

const getStringDay = (month) => {
  const monthLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return monthLabel[month];
};

const getStringMonth = (month) => {
  const monthLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthLabel[month];
};

module.exports = {
  iceFreeze: (temp) => calcFreeze(temp).toFixed(1),
  iceThaw: (temp) => calcThaw(temp).toFixed(1),
  iceThickness: (tempData) => calcThickness([...tempData]).toFixed(1),
  currentYear: new Date().getFullYear(),
  prettyDay: (date) => "Mon 21st",
};
