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
    const thickness = parseFloat((amountOfFreeze + accumulator).toFixed(2));
    console.log('*****', amountOfFreeze, thickness)
    return thickness < 0 ? 0 : thickness;
  }, 0);
};

module.exports = { calcFreeze, calcThaw, calcThickness, isFreezing };
