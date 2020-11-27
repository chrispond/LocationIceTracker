module.exports = (weatherData) => {
  const {
    hourly,
    current: { temp },
  } = weatherData.data;

  const hourlyTemp = hourly.map((hour) => hour.temp);
  const hourlTempLength = hourlyTemp.length;
  const high = Math.max.apply(null, [...hourlyTemp]);
  const low = Math.min.apply(null, [...hourlyTemp]);
  const average =
    hourlyTemp.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      temp
    ) / hourlTempLength;
  return { average, high, low };
};
