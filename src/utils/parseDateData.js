module.exports = (date = new Date()) => {
  const timeZoneOffset = -(420 * 60); // Mountain Standard Time offset from UTC
  const localTime = new Date(date.getTime() + timeZoneOffset);
  const epoch = Math.floor(localTime / 1000);
  const pretty = `${localTime.getFullYear()}/${
    localTime.getMonth() + 1
  }/${localTime.getDate()}`;
  console.log("--- Date:", date, timeZoneOffset, localTime, epoch);
  return { epoch, pretty, string: localTime };
};
