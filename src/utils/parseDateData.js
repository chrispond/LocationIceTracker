module.exports = (date = new Date()) => {
  const epoch = Math.floor(date.getTime() / 1000);
  const timeZoneOffset = date.getTimezoneOffset();
  const localTime = new Date(date.toISOString());
  const pretty = `${localTime.getFullYear()}/${
    localTime.getMonth() + 1
  }/${localTime.getDate()}`;
  console.log("--- Date:", date, timeZoneOffset, localTime);
  return { epoch, pretty, string: UTCTime };
};
