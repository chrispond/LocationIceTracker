module.exports = (weatherData) => {
  const {
    hourly,
    current: { pressure, temp, wind_gust, wind_speed },
  } = weatherData.data;

  const hourlyData = hourly ? hourly.map((hour) => {
    const { pressure, temp, wind_gust, wind_speed } = hour;
    return ({ pressure, temp, wind_gust, wind_speed });
  }) : [pressure, temp, wind_gust, wind_speed];
  const hourlyTemp = hourlyData.map(hour => hour.temp);
  const hourlyPressure = hourlyData.map(hour => hour.pressure);
  const hourlyWindSpeed = hourlyData.map(hour => hour.wind_speed);
  const calcAverage = (hourData, currentData) => hourData.reduce((accumulator, currentValue) => accumulator + currentValue, currentData) / (hourData.length + 1);
  const calcHigh = (hourData) => Math.max.apply(null, hourData);
  const calcLow = (hourData) =>  Math.min.apply(null, hourData);

  return {
    pressure: {
      average: calcAverage(hourlyData.map(hour => hour.pressure), pressure),
      high: calcHigh([...hourlyPressure, pressure]),
      low: calcLow([...hourlyPressure, pressure])
    },
    temp: {
      average: calcAverage(hourlyTemp, temp),
      high: calcHigh([...hourlyTemp, temp]),
      low: calcLow([...hourlyTemp, temp])
    },
    wind: {
      gust: calcAverage(hourlyData.map(hour => hour.wind_gust), wind_gust),
      average: calcAverage(hourlyWindSpeed, wind_speed),
      high: calcHigh([...hourlyWindSpeed, wind_speed]),
      low: calcLow([...hourlyWindSpeed, wind_speed])
    }
  }
};
