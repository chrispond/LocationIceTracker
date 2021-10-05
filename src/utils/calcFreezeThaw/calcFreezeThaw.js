const freezing = 32;
const freezeRatePerInch = 15;
const thawRatePerInch = 12;

const isFreezing = (temp) => temp <= freezing;
const calcFreeze = (temp) =>
  parseFloat(((freezing - temp) / freezeRatePerInch).toFixed(2));
const calcThaw = (temp) =>
  parseFloat(((temp - freezing) / thawRatePerInch).toFixed(2));
const calcThickness = (temps) => {
  return temps.reduce((accumulator, currentValue) => {
    const amountOfFreeze = isFreezing(currentValue)
      ? calcFreeze(currentValue)
      : -calcThaw(currentValue);
    return parseFloat((amountOfFreeze + accumulator).toFixed(2));
  }, 0);
};

module.exports = { calcFreeze, calcThaw, calcThickness, isFreezing };
