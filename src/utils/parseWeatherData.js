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
  const tempHigh = Math.max.apply(null, hourlyTemp);
  const tempLow = Math.min.apply(null, hourlyTemp);
  const calcAverage = (hourData, currentData) => hourData.reduce((accumulator, currentValue) => accumulator + currentValue, currentData) / (hourData.length + 1);

  return {
    pressure: calcAverage(hourlyData.map(hour => hour.pressure), pressure),
    temp: {
      average: calcAverage(hourlyTemp, temp),
      high: tempHigh,
      low: tempLow
    },
    wind: {
      gust: calcAverage(hourlyData.map(hour => hour.wind_gust), wind_gust),
      speed: calcAverage(hourlyData.map(hour => hour.wind_speed), wind_speed)
    }
  }
};
