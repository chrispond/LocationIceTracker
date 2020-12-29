const freezing = 32;
const freezeRatePerInch = 15;
const thawRatePerInch = 12;

const calcFreeze = (temp) => (freezing - temp) / freezeRatePerInch;
const calcThaw = (temp) => (temp - freezing) / thawRatePerInch;
const calcThickness = (temps) => {
  return temps.reduce((accumulator, currentValue) => {
    const isFreezing = currentValue <= freezing;
    const amountOfFreeze = isFreezing
      ? calcFreeze(currentValue)
      : -calcThaw(currentValue);
    return amountOfFreeze + accumulator;
  }, 0);
};

module.exports = { calcFreeze, calcThaw, calcThickness };
